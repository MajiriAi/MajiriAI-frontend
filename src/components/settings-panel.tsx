"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function SettingsPanel() {
  const [user, setUser] = useState<{ name?: string; email?: string }>();
  const [loggingOut, setLoggingOut] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/backend/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setUser(d?.user));
  }, []);

  async function logout() {
    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // ignore
    }
    router.push("/");
    router.refresh();
  }

  return (
    <div className="max-w-2xl space-y-5">
      <header>
        <p className="text-sm font-semibold uppercase tracking-wide text-ocean-600">Blue Ocean</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-ocean-950">Settings</h1>
        <p className="mt-2 text-slate-600">Manage your account and sign out.</p>
      </header>

      <section className="card">
        <h2 className="font-semibold text-ocean-900">Account</h2>
        <dl className="mt-4 space-y-3 text-sm">
          <div className="flex gap-4">
            <dt className="w-24 shrink-0 font-medium text-slate-500">Name</dt>
            <dd className="text-slate-700">{user?.name ?? "—"}</dd>
          </div>
          <div className="flex gap-4">
            <dt className="w-24 shrink-0 font-medium text-slate-500">Email</dt>
            <dd className="text-slate-700">{user?.email ?? "—"}</dd>
          </div>
        </dl>
      </section>

      <section className="card">
        <h2 className="font-semibold text-ocean-900">Session</h2>
        <p className="mt-1 text-sm text-slate-600">
          Signing out returns you to the Blue Ocean landing page.
        </p>
        <button
          onClick={logout}
          disabled={loggingOut}
          className="btn-ghost mt-4 border-red-200 text-red-600 hover:border-red-300 hover:text-red-700 disabled:opacity-60"
        >
          {loggingOut ? "Signing out…" : "Sign out"}
        </button>
      </section>
    </div>
  );
}
