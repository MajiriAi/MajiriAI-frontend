import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE = "founder_copilot_session";
const PROTECTED_PREFIXES = [
  "/dashboard",
  // "/onboarding", // Bypassed for UI preview and dev mode
  "/startup",
  "/goals",
  "/tasks",
  "/activities",
  "/ai",
  "/settings",
];

// Route protection lives here as a first line of defense (fast redirect,
// no data fetched). The Laravel backend is the actual source of truth for
// authorization on every request — this middleware never substitutes for it.
export function middleware(request: NextRequest) {
  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    request.nextUrl.pathname.startsWith(prefix)
  );

  if (!isProtected) return NextResponse.next();

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/onboarding/:path*",
    "/startup/:path*",
    "/goals/:path*",
    "/tasks/:path*",
    "/activities/:path*",
    "/ai/:path*",
    "/settings/:path*",
  ],
};
