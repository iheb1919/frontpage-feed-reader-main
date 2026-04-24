import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Better-Auth sets a cookie named "better-auth.session_token"
  const sessionCookie =
    request.cookies.get("better-auth.session_token")?.value;
  const isLoggedIn = !!sessionCookie;

  // Redirect root "/" based on auth state
  if (pathname === "/") {
    return isLoggedIn
      ? NextResponse.redirect(new URL("/feed", request.url))
      : NextResponse.redirect(new URL("/login", request.url));
  }

  // Protect private routes
  if ((pathname.startsWith("/feed") || pathname.startsWith("/discover") || pathname.startsWith("/digest")) && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Prevent logged-in users from accessing auth pages
  if ((pathname === "/login" || pathname === "/sign-up") && isLoggedIn) {
    return NextResponse.redirect(new URL("/feed", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes, including Better-Auth endpoints)
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, sitemap.xml, robots.txt
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
