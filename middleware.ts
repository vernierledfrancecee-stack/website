import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const getSecret = () =>
  new TextEncoder().encode(
    process.env.ADMIN_JWT_SECRET ?? "dev-secret-replace-in-production"
  );

// Strict CSP — no external frames allowed
const STRICT_CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://images.unsplash.com",
  "font-src 'self'",
  "connect-src 'self'",
  "media-src 'none'",
  "object-src 'none'",
  "frame-src 'none'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

// Relaxed CSP for /simulateur-interne — allows Monday.com iframes (CRM embed)
const SIMULATEUR_INTERNE_CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://images.unsplash.com",
  "font-src 'self'",
  "connect-src 'self'",
  "media-src 'none'",
  "object-src 'none'",
  "frame-src https://monday.com https://*.monday.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ── Admin authentication ──────────────────────────────────────────
  if (pathname.startsWith("/admin")) {
    const isLoginPage = pathname === "/admin/login";
    const token = req.cookies.get("admin_session")?.value;
    let isValid = false;

    if (token) {
      try {
        await jwtVerify(token, getSecret());
        isValid = true;
      } catch {
        isValid = false;
      }
    }

    if (isLoginPage && isValid) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }

    if (!isLoginPage && !isValid) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  // ── CSP injection (per-route) ────────────────────────────────────
  // Managed here (not in next.config.ts) so /simulateur-interne can receive
  // a different frame-src that allows Monday.com embeds.
  const response = NextResponse.next();
  const csp = pathname.startsWith("/simulateur-interne")
    ? SIMULATEUR_INTERNE_CSP
    : STRICT_CSP;
  response.headers.set("Content-Security-Policy", csp);

  return response;
}

export const config = {
  matcher: [
    // Run on all routes except Next.js internals and static assets
    "/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp)).*)",
  ],
};
