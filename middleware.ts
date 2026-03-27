import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const getSecret = () =>
  new TextEncoder().encode(
    process.env.ADMIN_JWT_SECRET ?? "dev-secret-replace-in-production"
  );

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!pathname.startsWith("/admin")) return NextResponse.next();

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

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
