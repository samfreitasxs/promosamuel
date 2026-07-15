import { NextRequest, NextResponse } from "next/server";
import { verifyToken, ADMIN_COOKIE } from "@/lib/session-crypto";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Login fica liberado.
  if (pathname === "/admin/login") return NextResponse.next();

  const token = req.cookies.get(ADMIN_COOKIE)?.value;
  if (await verifyToken(token)) return NextResponse.next();

  // Não autenticado → volta pro login, preservando o destino.
  const url = req.nextUrl.clone();
  url.pathname = "/admin/login";
  url.searchParams.set("from", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin/:path*"],
};
