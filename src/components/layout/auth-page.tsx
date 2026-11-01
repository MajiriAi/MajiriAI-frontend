import Link from "next/link";
import { Suspense } from "react";
import { AuthForm } from "@/components/auth-form";
import { Logo } from "@/components/brand/logo";

type AuthPageProps = {
  title: string;
  description: string;
  alternateHref: string;
  alternateLabel: string;
};

const VALUE_PROPS = [
  {
    title: "Location Context",
    desc: "Blue Ocean keeps the full picture of your business and where it operates in context.",
    icon: "M12 21s-6-5.1-6-10a6 6 0 1 1 12 0c0 4.9-6 10-6 10Zm0-7a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  },
  {
    title: "Market Intelligence",
    desc: "Understand your customers and your market with grounded, actionable insight.",
    icon: "M4 20V10M10 20V4M16 20v-8M22 20H2",
  },
  {
    title: "Personalized Guidance",
    desc: "Advice tailored to your goals, your stage, and your real progress.",
    icon: "M12 8a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-6 9a6 6 0 0 1 12 0",
  },
  {
    title: "Smarter Growth",
    desc: "Always know what to do next and why it matters for your business.",
    icon: "M13 3l-7 9h5l-1 9 7-9h-5l1-9Z",
  },
];

export function AuthPage({ title, description, alternateHref, alternateLabel }: AuthPageProps) {
  return (
    <main className="flex min-h-screen">
      {/* Left brand panel */}
      <aside className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-gradient-to-br from-ocean-700 via-ocean-600 to-violet-700 p-12 text-white lg:flex">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-violet-400/20 blur-3xl" aria-hidden="true" />

        <div className="relative flex items-center gap-2">
          <Logo className="h-9 w-9" />
          <span className="text-xl font-bold">Blue Ocean</span>
        </div>

        <div className="relative">
          <h2 className="text-3xl font-extrabold leading-tight">
            Build. Grow. Scale.
          </h2>
          <p className="mt-3 max-w-md text-ocean-100">
            Your AI-powered business partner — from first idea to global reach.
          </p>

          <ul className="mt-10 space-y-6">
            {VALUE_PROPS.map((v) => (
              <li key={v.title} className="flex items-start gap-4">
                <span className="mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d={v.icon} />
                  </svg>
                </span>
                <div>
                  <p className="font-semibold">{v.title}</p>
                  <p className="mt-0.5 text-sm text-ocean-100/90">{v.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-sm text-ocean-100/80">© {new Date().getFullYear()} Blue Ocean</p>
      </aside>

      {/* Right form panel */}
      <section className="flex w-full items-center justify-center px-5 py-12 sm:px-8 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <Logo className="h-9 w-9" />
            <span className="text-xl font-bold text-ocean-900">Blue Ocean</span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-ocean-950">{title}</h1>
          <p className="mt-2 text-slate-600">{description}</p>

          <Suspense fallback={null}>
            <AuthForm mode={alternateHref === "/register" ? "login" : "register"} />
          </Suspense>

          <Link href={alternateHref} className="mt-6 block text-center text-sm font-medium text-ocean-700 hover:underline">
            {alternateLabel}
          </Link>
        </div>
      </section>
    </main>
  );
}
