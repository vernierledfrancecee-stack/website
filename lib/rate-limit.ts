import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// ── In-memory fallback (per-instance; not effective across serverless instances) ──

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();
let lastCleanup = Date.now();

function cleanupIfNeeded() {
  const now = Date.now();
  if (now - lastCleanup < 60_000) return;
  lastCleanup = now;
  for (const [key, entry] of store.entries()) {
    if (entry.resetAt < now) store.delete(key);
  }
}

function inMemoryRateLimit(
  identifier: string,
  limit: number,
  windowMs: number
): { success: boolean; remaining: number; resetAt: number } {
  cleanupIfNeeded();
  const now = Date.now();
  const entry = store.get(identifier);

  if (!entry || entry.resetAt < now) {
    const resetAt = now + windowMs;
    store.set(identifier, { count: 1, resetAt });
    return { success: true, remaining: limit - 1, resetAt };
  }

  if (entry.count >= limit) {
    return { success: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count++;
  return { success: true, remaining: limit - entry.count, resetAt: entry.resetAt };
}

// ── Upstash Redis rate limiter (distributed, serverless-safe) ─────────────────

let redisClient: Redis | null = null;
const limiterCache = new Map<string, Ratelimit>();

function getRedis(): Redis | null {
  if (redisClient) return redisClient;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  redisClient = new Redis({ url, token });
  return redisClient;
}

function getLimiter(limit: number, windowMs: number): Ratelimit | null {
  const redis = getRedis();
  if (!redis) return null;

  const key = `${limit}:${windowMs}`;
  if (limiterCache.has(key)) return limiterCache.get(key)!;

  const windowSec = Math.max(1, Math.floor(windowMs / 1000));
  const limiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(limit, `${windowSec} s`),
  });
  limiterCache.set(key, limiter);
  return limiter;
}

// ── Public API ────────────────────────────────────────────────────────────────

export async function rateLimit(
  identifier: string,
  limit: number = 10,
  windowMs: number = 60_000
): Promise<{ success: boolean; remaining: number; resetAt: number }> {
  const limiter = getLimiter(limit, windowMs);

  if (limiter) {
    try {
      const result = await limiter.limit(identifier);
      return { success: result.success, remaining: result.remaining, resetAt: result.reset };
    } catch (err) {
      console.error("[rate-limit] Upstash error, falling back to in-memory:", err);
    }
  } else if (process.env.NODE_ENV === "production") {
    console.warn(
      "[rate-limit] UPSTASH_REDIS_REST_URL not set — using in-memory fallback (not effective across distributed serverless instances)"
    );
  }

  return inMemoryRateLimit(identifier, limit, windowMs);
}

// Returns the real client IP.
// Prefers x-real-ip (set by Vercel to the actual client address).
// Falls back to the LAST entry of x-forwarded-for (platform-appended, not
// client-controlled) rather than the first (which a client can spoof).
export function getClientIp(req: Request): string {
  const realIp = (req.headers as Headers).get("x-real-ip");
  if (realIp) return realIp.trim();

  const forwarded = (req.headers as Headers).get("x-forwarded-for");
  if (forwarded) {
    const parts = forwarded.split(",");
    return parts[parts.length - 1].trim();
  }

  return "unknown";
}
