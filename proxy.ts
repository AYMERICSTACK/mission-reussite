import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth/constants";

const publicPaths = ["/connexion", "/inscription"];
export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicRoute = publicPaths.some((item) => path === item || path.startsWith(`${item}/`));
  const authApi = path.startsWith("/api/auth/");
  if (publicRoute || authApi || path.startsWith("/_next/") || path === "/favicon.ico") return NextResponse.next();
  if (!request.cookies.get(SESSION_COOKIE)?.value) return NextResponse.redirect(new URL("/connexion", request.url));
  return NextResponse.next();
}
export const config = { matcher: ["/((?!_next/static|_next/image|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"] };
