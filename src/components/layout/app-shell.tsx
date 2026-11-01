"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/brand/logo";

const NAV = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Goals", href: "/goals" },
  { label: "Tasks", href: "/tasks" },
  { label: "Activities", href: "/activities" },
  { label: "Blue Ocean AI", href: "/ai" },
];

export function AppShell({ children, fullHeight }: { children: React.ReactNode; fullHeight?: boolean }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  async function logout() {
    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // ignore — clear locally and return home anyway
    }
    router.push("/");
    router.refresh();
  }

  return (
    <div className={fullHeight ? "flex h-screen flex-col bg-ocean-50/40" : "min-h-screen bg-ocean-50/40"}>
      <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Logo className="h-8 w-8" />
            <span className="text-lg font-bold tracking-tight text-ocean-900">Blue Ocean</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Dashboard">
            {NAV.map((n) => {
              const active = pathname === n.href || pathname.startsWith(n.href + "/");
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                    active ? "bg-ocean-100 text-ocean-800" : "text-slate-600 hover:bg-slate-100 hover:text-ocean-700"
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={logout}
              disabled={loggingOut}
              className="hidden rounded-lg border border-slate-300 px-3.5 py-2 text-sm font-medium text-slate-700 transition hover:border-ocean-300 hover:text-ocean-700 disabled:opacity-60 md:inline-flex"
            >
              {loggingOut ? "Signing out…" : "Sign out"}
            </button>
            <button
              className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 md:hidden"
              aria-label="Toggle navigation"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <div className="border-t border-slate-200 bg-white px-4 py-3 md:hidden">
            <nav className="flex flex-col gap-1" aria-label="Mobile dashboard">
              {NAV.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-3 py-2 text-sm font-medium ${
                    pathname === n.href ? "bg-ocean-100 text-ocean-800" : "text-slate-600"
                  }`}
                >
                  {n.label}
                </Link>
              ))}
              <button
                onClick={logout}
                disabled={loggingOut}
                className="mt-2 rounded-lg border border-slate-300 px-3 py-2 text-left text-sm font-medium text-slate-700 disabled:opacity-60"
              >
                {loggingOut ? "Signing out…" : "Sign out"}
              </button>
            </nav>
          </div>
        )}
      </header>

      <main className={fullHeight ? "flex-1 overflow-hidden" : "mx-auto max-w-7xl px-4 py-8 sm:px-6"}>{children}</main>
    </div>
  );
}
