import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 보호된 라우트 목록
  const protectedRoutes = ["/feed", "/write", "/profile", "/board"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // 세션 쿠키 확인 (NextAuth.js는 기본적으로 authjs.session-token 또는 __Secure-authjs.session-token 쿠키 사용)
  const sessionToken =
    request.cookies.get("authjs.session-token") ||
    request.cookies.get("__Secure-authjs.session-token");

  const isLoggedIn = !!sessionToken;

  // 인증 필요한 페이지에 비로그인 상태로 접근 시 로그인 페이지로 리다이렉트
  if (isProtectedRoute && !isLoggedIn) {
    const url = new URL("/login", request.url);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  // 로그인 상태에서 로그인/회원가입 페이지 접근 시 피드로 리다이렉트
  if (isLoggedIn && (pathname === "/login" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/feed", request.url));
  }

  return NextResponse.next();
}

// 미들웨어 적용 경로 설정
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)",
  ],
};
