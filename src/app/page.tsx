import Link from "next/link";
import { LandingNav } from "@/components/landing/nav";
import { Logo } from "@/components/brand/logo";

const HERO_PILLARS = [
  { title: "Plan Smarter", desc: "AI-powered guidance that keeps every decision grounded in your real progress." },
  { title: "Build Faster", desc: "Turn your goals and next steps into a clear plan you can act on every day." },
  { title: "Grow Systematically", desc: "While you work, Blue Ocean learns your journey and surfaces what matters most." },
];

const FEATURES = [
  {
    title: "Build a professional website",
    desc: "Present your business with a polished, ready-to-launch online presence.",
    icon: "M16 8a5 5 0 0 0-9.9-1M8 16a5 5 0 0 0 9.9-1M4 12h16",
  },
  {
    title: "Run email marketing campaigns",
    desc: "Reach your audience with campaigns that convert leads into customers.",
    icon: "M4 4h16v14H4zM4 6l8 6 8-6",
  },
  {
    title: "Manage social media",
    desc: "Plan, publish, and track your presence across the channels you use.",
    icon: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 6a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z",
  },
  {
    title: "Automate business tasks",
    desc: "Free up your time by automating the repetitive work that grows your business.",
    icon: "M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1M12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z",
  },
  {
    title: "Track sales and revenue",
    desc: "See your numbers clearly so you always know where your business stands.",
    icon: "M4 20V10M10 20V4M16 20v-8M22 20H2",
  },
  {
    title: "Get expert business insights",
    desc: "Understand your market, your customers, and the smartest way forward.",
    icon: "M12 3l2 4 4.5.6-3.2 3.1.8 4.6L12 13l-4.1 2.3.8-4.6L5.5 7.6 10 7l2-4Z",
  },
];

const WHY = [
  {
    title: "AI Business Partner",
    desc: "A partner that learns your business and gives you advice you can actually use.",
    icon: "M12 8a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-6 9a6 6 0 0 1 12 0",
  },
  {
    title: "Build & Operate",
    desc: "Everything you need to build and run your business from one place.",
    icon: "M4 20V4h16v16M4 12h16M4 16h16",
  },
  {
    title: "Save Time",
    desc: "Cut through the busywork and focus on the work that moves the needle.",
    icon: "M12 6v6l4 2M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z",
  },
  {
    title: "Grow Faster",
    desc: "Turn plans into momentum with a clear, always-ready list of next steps.",
    icon: "M13 3l-7 9h5l-1 9 7-9h-5l1-9Z",
  },
  {
    title: "Scale Globally",
    desc: "From first idea to global reach — build a business that goes the distance.",
    icon: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM3 12h18M12 3c2.5 2.4 4 5.6 4 9s-1.5 6.6-4 9c-2.5-2.4-4-5.6-4-9s1.5-6.6 4-9Z",
  },
];

const FOOTER_COLS = [
  { title: "Product", links: ["Features", "Pricing", "Success Stories", "Roadmap"] },
  { title: "Resources", links: ["Help & Support", "Blog", "Guides", "Community"] },
  { title: "Company", links: ["About", "Careers", "Contact", "Press"] },
  { title: "Legal", links: ["Privacy", "Terms", "Cookies", "Security"] },
];

export default function LandingPage() {
  return (
    <div id="top" className="bg-white">
      <LandingNav />

      {/* ===================== HERO ===================== */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-32 left-1/2 h-[640px] w-[1100px] -translate-x-1/2 rounded-[50%] bg-gradient-to-b from-ocean-100/70 via-ocean-50/40 to-transparent blur-2xl" aria-hidden="true" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-16 sm:px-8 lg:grid-cols-2 lg:pt-24">
          <div>
            <span className="badge bg-ocean-100 text-ocean-700">Build. Grow. Scale.</span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-ocean-950 sm:text-5xl lg:text-6xl">
              Your Business.
              <br />
              <span className="bg-gradient-to-r from-ocean-600 to-violet-600 bg-clip-text text-transparent">
                Smarter. Stronger. Bigger.
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-slate-600">
              Blue Ocean is your AI-powered business partner. Tell it what you’re building and it
              learns as you work — turning your goals, tasks, and daily progress into grounded,
              specific advice that helps you move forward.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {HERO_PILLARS.map((p) => (
                <div key={p.title} className="rounded-xl border border-slate-200 bg-white/80 p-4 shadow-soft">
                  <p className="text-sm font-semibold text-ocean-800">{p.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{p.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/register" className="btn-gradient px-7 py-3 text-base">
                Get Started Free
              </Link>
              <a href="#features" className="btn-ghost px-7 py-3 text-base">
                See how it works
              </a>
            </div>
            <p className="mt-3 text-sm text-slate-400">Free to start. No credit card required.</p>
          </div>

          {/* Hero product visual */}
          <HeroVisual />
        </div>
      </section>

      {/* ===================== RIGHT-SIDE / FEATURES PANEL ===================== */}
      <section id="features" className="bg-ocean-50/50 py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="badge bg-violet-100 text-violet-700">Powered by AI</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-ocean-950 sm:text-4xl">
              Everything Your Business Needs
            </h2>
            <p className="mt-3 text-lg text-slate-600">
              Run your whole business with one AI partner that grows with you.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="card transition hover:-translate-y-0.5 hover:shadow-soft">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-ocean-100 text-ocean-700">
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d={f.icon} />
                  </svg>
                </span>
                <h3 className="mt-4 text-lg font-semibold text-ocean-900">{f.title}</h3>
                <p className="mt-1.5 text-sm text-slate-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== STORIES (success) ===================== */}
      <section id="stories" className="py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="badge bg-ocean-100 text-ocean-700">Success Stories</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-ocean-950 sm:text-4xl">
                Founders building with Blue Ocean
              </h2>
              <p className="mt-3 text-lg text-slate-600">
                From first idea to funded growth, Blue Ocean helps founders stay focused on what
                moves their business forward.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {["Launch faster", "Validate ideas", "Reach customers", "Raise funding"].map((t) => (
                  <span key={t} className="badge border border-ocean-200 bg-white text-ocean-700">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { q: "Launched our MVP", n: "3 weeks to market" },
                { q: "10 pilot customers", n: "in the first month" },
                { q: "Closed our seed round", n: "with AI-backed clarity" },
                { q: "Global expansion", n: "from a small team" },
              ].map((s) => (
                <div key={s.q} className="card text-center">
                  <p className="text-2xl font-extrabold text-ocean-700">{s.n}</p>
                  <p className="mt-1 text-sm text-slate-600">{s.q}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================== WHY BLUE OCEAN ===================== */}
      <section id="pricing" className="bg-ocean-50/50 py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="badge bg-ocean-100 text-ocean-700">Why Blue Ocean</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-ocean-950 sm:text-4xl">
              Built to help you go further
            </h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {WHY.map((w) => (
              <div key={w.title} className="card flex items-start gap-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-gradient text-white">
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d={w.icon} />
                  </svg>
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-ocean-900">{w.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== FINAL CTA ===================== */}
      <section id="support" className="py-24">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-ocean-600 to-violet-600 px-6 py-14 text-center shadow-glow sm:px-12">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Every great business starts with a single step.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-ocean-50">
              Join Blue Ocean and let AI help you plan smarter, build faster, and grow
              systematically — from day one.
            </p>
            <Link
              href="/register"
              className="mt-8 inline-flex items-center justify-center rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-ocean-700 shadow-soft transition hover:bg-ocean-50"
            >
              Get Started Free
            </Link>
            <p className="mt-4 text-sm text-ocean-100/90">Build. Grow. Scale.</p>
          </div>
        </div>
      </section>

      {/* ===================== FOOTER ===================== */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
          <div className="grid gap-10 md:grid-cols-5">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2">
                <Logo className="h-8 w-8" />
                <span className="text-lg font-bold text-ocean-900">Blue Ocean</span>
              </div>
              <p className="mt-3 text-sm text-slate-500">Your AI-powered business partner. Build. Grow. Scale.</p>
            </div>
            {FOOTER_COLS.map((col) => (
              <div key={col.title}>
                <p className="text-sm font-semibold text-ocean-900">{col.title}</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="transition hover:text-ocean-700">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-6 text-sm text-slate-500 sm:flex-row">
            <p>© {new Date().getFullYear()} Blue Ocean. All rights reserved.</p>
            <p className="italic">Build. Grow. Scale.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function HeroVisual() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-ocean-200/50 to-violet-200/50 blur-2xl" aria-hidden="true" />
      <div className="relative rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-card backdrop-blur">
        {/* window title bar */}
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-red-400" />
          <span className="h-3 w-3 rounded-full bg-amber-400" />
          <span className="h-3 w-3 rounded-full bg-emerald-400" />
          <div className="ml-3 h-6 flex-1 rounded-md bg-slate-100" />
        </div>

        {/* mini dashboard */}
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {[
            { label: "Goal health", value: "Healthy", tone: "text-emerald-600" },
            { label: "Next actions", value: "4", tone: "text-ocean-700" },
            { label: "Progress", value: "68%", tone: "text-violet-700" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-slate-100 bg-ocean-50/40 p-3">
              <p className="text-xs text-slate-500">{s.label}</p>
              <p className={`mt-1 text-lg font-bold ${s.tone}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* chart bar */}
        <div className="mt-4 rounded-xl border border-slate-100 p-3">
          <p className="text-xs font-medium text-slate-500">Weekly progress</p>
          <div className="mt-2 flex h-20 items-end gap-1.5">
            {[35, 55, 42, 70, 60, 85, 95].map((h, i) => (
              <div key={i} className="flex-1 rounded-md bg-gradient-to-t from-ocean-500 to-violet-500" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>

        {/* insight row */}
        <div className="mt-4 flex items-start gap-3 rounded-xl border border-violet-100 bg-violet-50/60 p-3">
          <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-lg bg-blue-gradient text-white">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
              <path d="M8 12h8M12 8v8M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z" />
            </svg>
          </span>
          <div>
            <p className="text-sm font-semibold text-ocean-900">AI Insight</p>
            <p className="text-xs text-slate-600">“Your goal is healthy. Focus on signing your first paying customers this week.”</p>
          </div>
        </div>
      </div>
    </div>
  );
}
