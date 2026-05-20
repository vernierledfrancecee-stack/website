import { NextRequest, NextResponse } from "next/server";
import { signAdminToken, COOKIE_NAME, COOKIE_MAX_AGE } from "@/lib/admin-auth";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import bcrypt from "bcryptjs";
import { authenticator } from "otplib";

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

  const { password, totp } = body as { password?: string; totp?: string };
  if (!password) return NextResponse.json({ message: "Mot de passe requis" }, { status: 400 });

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    console.error("[Admin] ADMIN_PASSWORD env var not set");
    return NextResponse.json({ message: "Non configuré" }, { status: 503 });
  }

  // Support bcrypt hashes ($2b$... / $2a$...) and plain-text passwords
  const isBcrypt = adminPassword.startsWith("$2b$") || adminPassword.startsWith("$2a$");
  const passwordOk = isBcrypt
    ? await bcrypt.compare(password, adminPassword)
    : password === adminPassword;

  if (!passwordOk) {
    return NextResponse.json({ message: "Mot de passe incorrect" }, { status: 401 });
  }

  const totpSecret = process.env.ADMIN_TOTP_SECRET;
  if (totpSecret) {
    if (!totp) {
      // Password correct — signal client to show TOTP step
      return NextResponse.json({ totp_required: true }, { status: 200 });
    }
    if (!authenticator.verify({ token: totp, secret: totpSecret })) {
      return NextResponse.json({ message: "Code TOTP invalide" }, { status: 401 });
    }
  }

  const token = await signAdminToken();
  const res = NextResponse.json({ success: true });
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });
  return res;
}
