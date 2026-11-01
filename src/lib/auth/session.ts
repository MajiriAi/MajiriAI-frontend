import "server-only";
import { cookies } from "next/headers";

/**
 * The Sanctum API token is kept ONLY in an httpOnly, secure cookie set by the
 * Next.js route handlers in app/api/auth/*. It is never sent to the browser
 * as readable JS state, which keeps it safe from XSS-based theft. Server
 * Components and Route Handlers read it here to attach it to Laravel calls.
 */
export const SESSION_COOKIE = "founder_copilot_session";

interface SessionCookieOptions {
  httpOnly: boolean;
  secure: boolean;
  sameSite: "lax";
  path: string;
  maxAge: number;
}

export function sessionCookieOptions(): SessionCookieOptions {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  };
}

export function getSessionToken(): string | undefined {
  return cookies().get(SESSION_COOKIE)?.value;
}

export function setSessionToken(token: string) {
  cookies().set(SESSION_COOKIE, token, sessionCookieOptions());
}

export function clearSessionToken() {
  cookies().delete(SESSION_COOKIE);
}
