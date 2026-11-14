import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, sessionCookieOptions } from "@/lib/auth/session";

export async function GET(request: NextRequest) {
  const next = request.nextUrl.searchParams.get("next") || "/onboarding";
  const url = new URL(next, request.url);
  const response = NextResponse.redirect(url);
  response.cookies.set(SESSION_COOKIE, "demo-preview-token", sessionCookieOptions());
  return response;
}

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ ok: true, redirect: "/onboarding" });
  response.cookies.set(SESSION_COOKIE, "demo-preview-token", sessionCookieOptions());
  return response;
}

