import Link from "next/link";
import { Plus_Jakarta_Sans } from "next/font/google";
import { LandingNav } from "@/components/landing/nav";
import { Earth, HeroVisual } from "@/components/landing/hero-visual";
import { JourneyForm } from "@/components/landing/journey-form";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const FEATURES = [
  { title: "Build a professional website", icon: "globe" },
  { title: "Run email marketing campaigns", icon: "mail" },
  { title: "Manage all your social media", icon: "share" },
  { title: "Automate business tasks", icon: "gear" },
  { title: "Track sales and revenue", icon: "chart" },
  { title: "Get expert business insights", icon: "bulb" },
] as const;

const WHY = [
  {
    title: "AI Business Partner",
    desc: "Your 24/7 AI assistant for all business decisions and actions.",
    icon: "brain",
  },
  {
    title: "Build & Operate",
    desc: "Create and manage your website, marketing, sales and more — in one place.",
    icon: "monitor",
  },
  {
    title: "Save Time",
    desc: "Automate repetitive tasks and focus on what matters most.",
    icon: "clock",
  },
  {
    title: "Grow Faster",
    desc: "Get data-driven insights and personalized strategies for sustainable growth.",
    icon: "rocket",
  },
  {
    title: "Scale Globally",
    desc: "Build a business ready for local and international markets.",
    icon: "globe",
  },
] as const;

export default function LandingPage() {
  return (
    <div id="top" className={`${jakarta.className} overflow-x-hidden bg-white text-[#12224f]`}>
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f3f7ff_0%,#f7f9ff_46%,#ffffff_100%)]">
        <LandingNav />
        <Earth />
        <div className="relative z-10 mx-auto grid max-w-[1180px] items-center gap-10 px-5 pb-28 pt-6 sm:px-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.15fr)_280px] lg:items-start lg:gap-6 lg:pb-36 lg:pt-4">
          <div className="lg:pt-10">
            <h1 className="max-w-[460px] text-[42px] font-extrabold leading-[1.05] tracking-[-0.035em] text-[#101a3d] sm:text-[52px]">
              Your Business.
              <br />
              Smarter. Stronger. <span className="text-[#2f6bff]">Bigger.</span>
            </h1>
            <p className="mt-5 max-w-[430px] text-[16px] leading-relaxed text-[#3d5288] sm:text-[17px]">
              Blue Ocean is your AI-powered business partner — helping you build, grow and scale your business with less effort.
            </p>
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[14px] font-semibold text-[#1d2b52]">
              {["Plan Smarter", "Build Faster", "Grow Systematically"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="inline-flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#2f6bff] text-white">
                    <svg viewBox="0 0 20 20" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.6">
                      <path d="M4.5 10.5 8 14l7.5-8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/register"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#4f46e5] px-7 py-3.5 text-[16px] font-semibold text-white shadow-[0_12px_28px_rgba(79,70,229,0.35)] transition hover:bg-[#4338ca]"
            >
              Get Started Free
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <p className="mt-3 text-[13px] text-[#8b95a8]">No credit card required • 14-day free trial</p>
          </div>

          <HeroVisual />

          <aside id="features" className="rounded-[24px] border border-[#e7ebf6] bg-white p-6 shadow-[0_16px_40px_rgba(37,99,235,0.08)] lg:mt-6">
            <h2 className="text-[22px] font-extrabold leading-[1.25] tracking-[-0.02em] text-[#14224a]">
              Everything Your Business Needs — Powered by AI
            </h2>
            <ul className="mt-5 space-y-3.5">
              {FEATURES.map((feature) => (
                <li key={feature.title} className="flex items-center gap-3 text-[14.5px] font-medium text-[#1c2a4d]">
                  <FeatureIcon name={feature.icon} />
                  {feature.title}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="bg-white px-5 pb-6 sm:px-6">
        <div className="mx-auto max-w-[1180px] rounded-[28px] border border-[#e6eaf5] bg-[#f7f8fd] px-4 py-10 sm:px-6">
          <div className="text-center">
            <h2 className="text-[28px] font-extrabold tracking-[-0.03em] text-[#14224a] sm:text-[32px]">
              Why Founders Choose Blue Ocean
            </h2>
            <p className="mt-2 text-[14.5px] text-[#7b879c]">
              More than advice — a complete AI-powered business operating system.
            </p>
          </div>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0 lg:divide-x lg:divide-[#e3e8f4]">
            {WHY.map((item) => (
              <div key={item.title} className="px-4 text-center">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#eceefe] text-[#6d5ce7]">
                  <WhyIcon name={item.icon} />
                </span>
                <h3 className="mt-3 text-[15px] font-bold text-[#172448]">{item.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[#6d7a98]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="journey" className="bg-white px-5 py-8 sm:px-6">
        <div className="mx-auto grid max-w-[1180px] items-stretch gap-5 lg:grid-cols-[1.55fr_0.85fr]">
          <div className="rounded-[28px] border border-[#e6eaf5] bg-[#f7f8fd] px-5 py-7 sm:px-8">
            <h2 className="text-[26px] font-extrabold tracking-[-0.03em] text-[#14224a] sm:text-[28px]">
              Start Your Entrepreneurial Journey Today
            </h2>
            <p className="mt-2 max-w-[640px] text-[14.5px] text-[#6d7a98]">
              Join thousands of founders using Blue Ocean to build and scale successful businesses.
            </p>
            <div className="mt-6">
              <JourneyForm />
            </div>
          </div>

          <aside id="stories" className="relative overflow-hidden rounded-[28px] border border-[#e6eaf5] bg-[#f7f8fd] px-5 py-6">
            <blockquote className="rounded-2xl bg-white px-4 py-3.5 text-[13.5px] leading-relaxed text-[#3c4d73] shadow-[0_8px_24px_rgba(37,99,235,0.06)]">
              “Blue Ocean gave me the tools, insights and automation I need to focus on growing my business.”
              <footer className="mt-2 flex flex-wrap items-center gap-2 text-[12.5px] text-[#7b879c]">
                <span>— A Happy Founder</span>
                <span className="tracking-tight text-[#f5b400]" aria-label="5 stars">
                  ★★★★★
                </span>
              </footer>
            </blockquote>
            <GrowthChart />
          </aside>
        </div>
      </section>

      <footer id="support" className="bg-white px-5 py-8 text-center text-[13px] text-[#8b95a8]">
        <p>
          © 2024 Blue Ocean. All rights reserved.
          <span className="mx-2 text-[#d5dbe6]">|</span>
          <a href="#" className="hover:text-[#2f6bff]">
            Privacy Policy
          </a>
          <span className="mx-2 text-[#d5dbe6]">|</span>
          <a href="#" className="hover:text-[#2f6bff]">
            Terms of Use
          </a>
        </p>
      </footer>
    </div>
  );
}

function FeatureIcon({ name }: { name: (typeof FEATURES)[number]["icon"] }) {
  const common = "h-[18px] w-[18px] shrink-0 text-[#4f6ef7]";
  if (name === "globe") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.7 3.8 5.8 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.8-3.8-9S9.5 5.7 12 3Z" />
      </svg>
    );
  }
  if (name === "mail") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M4 7l8 6 8-6" />
      </svg>
    );
  }
  if (name === "share") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="6" cy="12" r="2.2" />
        <circle cx="17" cy="6.5" r="2.2" />
        <circle cx="17" cy="17.5" r="2.2" />
        <path d="M8 11.2 14.8 7.4M8.1 13l6.7 3.6" />
      </svg>
    );
  }
  if (name === "gear") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2M6 6l1.6 1.6M16.4 16.4 18 18M18 6l-1.6 1.6M7.6 16.4 6 18" />
      </svg>
    );
  }
  if (name === "chart") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 19h16" />
        <path d="M7 16V10M12 16V6M17 16v-4" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M9 18h6M10 21h4" strokeLinecap="round" />
      <path d="M8 14a5.5 5.5 0 1 1 8 0c-.7.7-1.2 1.5-1.4 2.4h-5.2c-.2-.9-.7-1.7-1.4-2.4Z" />
    </svg>
  );
}

function WhyIcon({ name }: { name: (typeof WHY)[number]["icon"] }) {
  const common = "h-6 w-6";
  if (name === "brain") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M9 6a3 3 0 0 0-3 3 2.5 2.5 0 0 0-1 4.8A3 3 0 0 0 8 18h.5M15 6a3 3 0 0 1 3 3 2.5 2.5 0 0 1 1 4.8A3 3 0 0 1 16 18h-.5M9 6a3 3 0 0 1 3-2 3 3 0 0 1 3 2M9.5 18V10M14.5 18V10M12 4v6" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === "monitor") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.7">
        <rect x="3" y="4" width="18" height="12" rx="2" />
        <path d="M8 20h8M12 16v4" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === "clock") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.7">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4.5l3 2" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === "rocket") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M12 3c3 3 4.5 6.5 4.5 10.2 0 1.2-.4 2.2-1.2 3.1L12 19l-3.3-2.7c-.8-.9-1.2-1.9-1.2-3.1C7.5 9.5 9 6 12 3Z" />
        <path d="M9 14.5 5.5 16 7 19.5 9.5 17M15 14.5 18.5 16 17 19.5 14.5 17" strokeLinecap="round" />
        <circle cx="12" cy="10" r="1.3" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.7">
      <circle cx="12" cy="12" r="8" />
      <path d="M4 12h16M12 4c2.2 2.3 3.3 5 3.3 8s-1.1 5.7-3.3 8c-2.2-2.3-3.3-5-3.3-8s1.1-5.7 3.3-8Z" />
    </svg>
  );
}

function GrowthChart() {
  const bars = [28, 40, 52, 66, 84, 108, 132];
  return (
    <svg viewBox="0 0 360 190" className="mt-2 h-[180px] w-full" aria-hidden="true">
      <defs>
        <marker id="growth-arrow" markerWidth="10" markerHeight="10" refX="6" refY="5" orient="auto">
          <path d="M0 0 L10 5 L0 10 Z" fill="#2f6bff" />
        </marker>
        <linearGradient id="bar-blue" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
      </defs>
      {bars.map((height, index) => (
        <rect
          key={height}
          x={36 + index * 42}
          y={168 - height}
          width="26"
          height={height}
          rx="4"
          fill="url(#bar-blue)"
          opacity={0.45 + index * 0.08}
        />
      ))}
      <path
        d="M42 150 C 90 146, 140 120, 190 92 S 280 40, 328 18"
        fill="none"
        stroke="#2f6bff"
        strokeWidth="5"
        strokeLinecap="round"
        markerEnd="url(#growth-arrow)"
      />
    </svg>
  );
}
