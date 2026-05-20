import { timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { signAdminToken, COOKIE_NAME, COOKIE_MAX_AGE } from "@/lib/admin-auth";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

// Constant-time string comparison to prevent timing side-channel attacks.
// Pads both buffers to the same length before comparing so length differences
// don't leak information via early return.
function passwordMatch(input: string, expected: string): boolean {
  try {
    const a = Buffer.from(input, "utf8");
    const b = Buffer.from(expected, "utf8");
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

  const { password } = body as { password?: unknown };
  if (typeof password !== "string" || password.length === 0 || password.length > 128) {
    return NextResponse.json({ message: "Mot de passe requis" }, { status: 400 });
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    console.error("[Admin] ADMIN_PASSWORD env var not set");
    return NextResponse.json({ message: "Erreur de configuration serveur" }, { status: 500 });
  }

  if (!passwordMatch(password, adminPassword)) {
    return NextResponse.json({ message: "Mot de passe incorrect" }, { status: 401 });
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
