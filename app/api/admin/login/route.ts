import { NextRequest, NextResponse } from "next/server";
import { signAdminToken, COOKIE_NAME, COOKIE_MAX_AGE } from "@/lib/admin-auth";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const rl = rateLimit(`admin-login:${ip}`, 5, 15 * 60_000);
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

  const { password } = body as { password?: string };
  if (!password) return NextResponse.json({ message: "Mot de passe requis" }, { status: 400 });

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    console.error("[Admin] ADMIN_PASSWORD env var not set");
    return NextResponse.json({ message: "Non configuré" }, { status: 503 });
  }

  if (password !== adminPassword) {
    return NextResponse.json({ message: "Mot de passe incorrect" }, { status: 401 });
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
