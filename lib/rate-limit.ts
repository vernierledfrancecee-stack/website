import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

// Upstash Redis client — only created when env vars are present
let redis: Redis | null = null;
if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
}

// Cache Ratelimit instances keyed by "limit:windowMs" to avoid re-creating them
const limiterCache = new Map<string, Ratelimit>();
function getUpstashLimiter(limit: number, windowMs: number): Ratelimit {
  const key = `${limit}:${windowMs}`;
  if (!limiterCache.has(key)) {
    const windowSec = Math.round(windowMs / 1000);
    limiterCache.set(
      key,
      new Ratelimit({
        redis: redis!,
        limiter: Ratelimit.slidingWindow(limit, `${windowSec} s`),
        prefix: "rl",
      })
    );
  }
  return limiterCache.get(key)!;
}

// In-memory fallback for local dev (single-instance only)
interface RateLimitEntry { count: number; resetAt: number }
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

export async function rateLimit(
  identifier: string,
  limit: number = 10,
  windowMs: number = 60_000
): Promise<{ success: boolean; remaining: number; resetAt: number }> {
  if (redis) {
    const { success, remaining, reset } = await getUpstashLimiter(limit, windowMs).limit(identifier);
    return { success, remaining, resetAt: Number(reset) };
  }

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

export function getClientIp(req: Request): string {
  const forwarded = (req.headers as Headers).get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return "unknown";
}
