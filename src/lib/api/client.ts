import { ApiError, type ApiErrorResponse } from "@/types/api";

/**
 * Shared fetch wrapper for calling the Laravel API from Server Components,
 * Route Handlers, and Server Actions. Client Components never call the
 * Laravel API directly with a token attached — they go through this module
 * on the server side (via Server Actions / Route Handlers), or through the
 * thin Next.js proxy routes in `app/api/*`. This keeps the Sanctum token out
 * of client-side JS entirely (see lib/auth/session.ts).
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8002/api";

interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  token?: string;
  cache?: RequestCache;
}

export async function apiFetch<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, token, cache = "no-store" } = options;

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    cache,
  });

  if (!res.ok) {
    let payload: ApiErrorResponse | undefined;
    try {
      payload = await res.json();
    } catch {
      // Non-JSON error body (e.g. a 502 from the platform in front of Laravel).
    }
    throw new ApiError(payload?.message ?? "Something went wrong. Please try again.", res.status, payload?.errors);
  }

  // 204 No Content (logout, delete) has no body to parse.
  if (res.status === 204) {
    return undefined as T;
  }

  return res.json() as Promise<T>;
}
