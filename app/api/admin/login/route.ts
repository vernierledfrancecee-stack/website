import { NextRequest, NextResponse } from "next/server";
import { signAdminToken, COOKIE_NAME, COOKIE_MAX_AGE } from "@/lib/admin-auth";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import bcrypt from "bcryptjs";
import crypto from "crypto";

function base32Decode(secret: string): Buffer {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  let bits = 0;
  let value = 0;
  const output: number[] = [];
  for (const char of secret.toUpperCase().replace(/=+$/, "")) {
    const idx = chars.indexOf(char);
    if (idx === -1) continue;
    value = (value << 5) | idx;
    bits += 5;
    if (bits >= 8) {
      output.push((value >>> (bits - 8)) & 0xff);
      bits -= 8;
    }
  }
  return Buffer.from(output);
}

function verifyTotp(token: string, secret: string): boolean {
  const key = base32Decode(secret);
  const step = Math.floor(Date.now() / 1000 / 30);
  for (const t of [step - 1, step, step + 1]) {
    const buf = Buffer.alloc(8);
    buf.writeBigInt64BE(BigInt(t));
    const hmac = crypto.createHmac("sha1", key).update(buf).digest();
    const offset = hmac[hmac.length - 1] & 0xf;
    const code =
      (((hmac[offset] & 0x7f) << 24) |
        (hmac[offset + 1] << 16) |
        (hmac[offset + 2] << 8) |
        hmac[offset + 3]) %
      1_000_000;
    if (String(code).padStart(6, "0") === token) return true;
  }
  return false;
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
    if (!verifyTotp(totp, totpSecret)) {
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
