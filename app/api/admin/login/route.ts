import { timingSafeEqual } from "crypto";
import bcrypt from "bcryptjs";
import { authenticator } from "otplib";
import { NextRequest, NextResponse } from "next/server";
import { signAdminToken, COOKIE_NAME, COOKIE_MAX_AGE } from "@/lib/admin-auth";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

// Supports both bcrypt hashes ($2b$…) and plaintext passwords (legacy).
// Bcrypt hashes are detected by their prefix; all new passwords should be
// hashed with `node scripts/hash-password.mjs`.
async function checkPassword(input: string, stored: string): Promise<boolean> {
  if (stored.startsWith("$2b$") || stored.startsWith("$2a$") || stored.startsWith("$2y$")) {
    return bcrypt.compare(input, stored);
  }
  // Timing-safe plaintext comparison (constant-time even if lengths differ)
  try {
    const a = Buffer.from(input, "utf8");
    const b = Buffer.from(stored, "utf8");
    const maxLen = Math.max(a.length, b.length);
    const aPadded = Buffer.concat([a, Buffer.alloc(maxLen - a.length)]);
    const bPadded = Buffer.concat([b, Buffer.alloc(maxLen - b.length)]);
    return timingSafeEqual(aPadded, bPadded) && a.length === b.length;
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const rl = await rateLimit(`admin-login:${ip}`, 5, 15 * 60_000);
  if (!rl.success) {
    return NextResponse.json(
      { message: "Trop de tentatives. Réessayez dans 15 minutes." },
      { status: 429, headers: { "Retry-After": String(Math.ceil((rl.resetAt - Date.now()) / 1000)) } }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Requête invalide" }, { status: 400 });
  }

  const { password, totpCode } = body as { password?: unknown; totpCode?: unknown };

  if (typeof password !== "string" || password.length === 0 || password.length > 128) {
    return NextResponse.json({ message: "Mot de passe requis" }, { status: 400 });
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    console.error("[Admin] ADMIN_PASSWORD env var not set");
    return NextResponse.json({ message: "Erreur de configuration serveur" }, { status: 500 });
  }

  const passwordOk = await checkPassword(password, adminPassword);
  if (!passwordOk) {
    return NextResponse.json({ message: "Mot de passe incorrect" }, { status: 401 });
  }

  // ── TOTP (optionnel — activé si ADMIN_TOTP_SECRET est défini) ────────────────
  const totpSecret = process.env.ADMIN_TOTP_SECRET;
  if (totpSecret) {
    if (!totpCode || typeof totpCode !== "string") {
      // Password OK but TOTP code not yet provided — tell the client to ask for it
      return NextResponse.json({ requireTotp: true }, { status: 401 });
    }
    if (!authenticator.verify({ token: totpCode, secret: totpSecret })) {
      return NextResponse.json({ message: "Code TOTP invalide ou expiré" }, { status: 401 });
    }
  }

  const token = await signAdminToken();
  const res = NextResponse.json({ success: true });
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });
  return res;
}
