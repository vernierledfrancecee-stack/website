import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const getSecret = () =>
  new TextEncoder().encode(
    process.env.ADMIN_JWT_SECRET ?? "dev-secret-replace-in-production"
  );

// Strict CSP — no external frames, not embeddable anywhere
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

// CSP for /simulateur-interne:
//   frame-src     → allows embedding Monday.com forms/views inside this page
//   frame-ancestors → allows Monday.com to embed THIS page in an iframe
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
  "frame-ancestors https://monday.com https://*.monday.com",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ── CSP + framing headers (per-route) ───────────────────────────
  // Managed here (not in next.config.ts) to avoid duplicate header conflicts.
  // /simulateur-interne is embeddable inside Monday.com; all other routes are not.
  const response = NextResponse.next();
  const isSimulateurInterne = pathname.startsWith("/simulateur-interne");

  response.headers.set(
    "Content-Security-Policy",
    isSimulateurInterne ? SIMULATEUR_INTERNE_CSP : STRICT_CSP
  );

  // X-Frame-Options is a legacy fallback for browsers that don't support frame-ancestors CSP.
  // Omit it for /simulateur-interne so Monday.com can render the page in an iframe.
  if (!isSimulateurInterne) {
    response.headers.set("X-Frame-Options", "DENY");
  }

  return response;
}

export const config = {
  matcher: [
    // Run on all routes except Next.js internals and static assets
    "/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp)).*)",
  ],
};
