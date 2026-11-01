"use client";
import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(e.currentTarget);
    const body = Object.fromEntries(form) as Record<string, string>;
    if (mode === "register") body.password_confirmation = body.password ?? "";

    const res = await fetch(`/api/auth/${mode}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    let data: { message?: string } = {};
    try {
      data = await res.json();
    } catch {
      // non-JSON error body
    }
    setLoading(false);

    if (!res.ok) {
      setError(data.message ?? "Unable to continue. Please try again.");
      return;
    }
    // Honour the `next` redirect set by middleware (validated to a same-origin
    // path) so a user bounced from /ai lands back on /ai, not /dashboard.
    const next = searchParams.get("next");
    const safeNext = next && next.startsWith("/") && !next.startsWith("//") ? next : null;
    router.push(mode === "register" ? "/onboarding" : (safeNext ?? "/dashboard"));
    router.refresh();
  }

  const isRegister = mode === "register";

  return (
    <form onSubmit={submit} className="mt-8 space-y-5" noValidate>
      {isRegister && (
        <div>
          <label htmlFor="name" className="label">
            Your name
          </label>
          <input id="name" name="name" required placeholder="Jane Founder" className="input" />
        </div>
      )}

      <div>
        <label htmlFor="email" className="label">
          Email address
        </label>
        <input
          id="email"
          name="email"
          required
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          className="input"
        />
      </div>

      <div>
        <label htmlFor="password" className="label">
          Password
        </label>
        <input
          id="password"
          name="password"
          required
          type="password"
          minLength={8}
          autoComplete={isRegister ? "new-password" : "current-password"}
          placeholder="8+ characters"
          className="input"
        />
        {!isRegister && (
          <div className="mt-2 flex justify-end">
            <button type="button" className="text-sm font-medium text-ocean-600 hover:underline">
              Forgot password?
            </button>
          </div>
        )}
      </div>

      {error && (
        <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700">
          {error}
        </p>
      )}

      <button type="submit" disabled={loading} className="btn w-full disabled:opacity-60">
        {loading ? "Please wait…" : isRegister ? "Create your account" : "Sign in to Blue Ocean"}
      </button>

      <p className="text-center text-xs text-slate-400">
        {isRegister ? "Free to start. No credit card required." : "You'll be back where you left off."}
      </p>
    </form>
  );
}
