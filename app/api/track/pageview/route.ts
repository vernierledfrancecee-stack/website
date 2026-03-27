import { NextRequest, NextResponse } from "next/server";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

// Simple path validation — only allow relative paths starting with /
function isValidPath(path: unknown): path is string {
  return typeof path === "string" && /^\/[a-zA-Z0-9\-_/?=&%#.]*$/.test(path) && path.length <= 200;
}

// Basic bot detection by User-Agent
function isBot(ua: string): boolean {
  return /bot|crawler|spider|crawling|Googlebot|bingbot|facebookexternalhit|Twitterbot|slurp|DuckDuckBot|YandexBot|Baiduspider|Sogou|Exabot|ia_archiver/i.test(ua);
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  // Allow 30 tracked page views per minute per IP (generous for real users)
  const rl = rateLimit(`pageview:${ip}`, 30, 60_000);
  if (!rl.success) return NextResponse.json({ ok: false }, { status: 429 });

  const ua = req.headers.get("user-agent") ?? "";
  if (isBot(ua)) return NextResponse.json({ ok: false });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const { path, referrer } = body as Record<string, unknown>;
  if (!isValidPath(path)) return NextResponse.json({ ok: false }, { status: 400 });

  // Don't track admin pages
  if (path.startsWith("/admin")) return NextResponse.json({ ok: false });

  try {
    const { prisma } = await import("@/lib/prisma");
    await prisma.auditLog.create({
      data: {
        action: "PAGE_VIEW",
        ipAddress: ip,
        userAgent: ua.slice(0, 300),
        details: {
          path,
          referrer: typeof referrer === "string" ? referrer.slice(0, 300) : null,
        },
      },
    });
  } catch (err) {
    console.error("[PageView] DB error:", err);
  }

  return NextResponse.json({ ok: true });
}
