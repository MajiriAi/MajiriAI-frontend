"use client";
import { useRouter } from "next/navigation";
import { OnboardingData } from "@/types/onboarding";

interface Step7Props {
  data: OnboardingData;
}

export function Step7Complete({ data }: Step7Props) {
  const router = useRouter();

  return (
    <div className="space-y-6">
      {/* Celebration Header */}
      <div className="rounded-3xl border border-blue-100 bg-gradient-to-b from-[#EFF6FF] to-white p-6 sm:p-8 text-center shadow-xs">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-md">
          <svg viewBox="0 0 20 20" className="h-7 w-7 fill-none stroke-currentColor stroke-[2.5]">
            <path d="M4 10.5 8 14.5 16 6.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1 className="mt-4 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F172A]">
          You&apos;re all set, {data.firstName || "Founder"}! 🎉
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-sm sm:text-[15px] text-[#475467] leading-relaxed">
          Your business profile is ready. MAJIRI AI will now start working for you — researching, analyzing, and preparing your personalized growth workspace.
        </p>
      </div>

      {/* What Happens Next Timeline */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">
          Here&apos;s what happens next:
        </h3>
        <div className="grid gap-4 sm:grid-cols-4">
          <div className="space-y-1.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 text-sm font-bold">
              🔍
            </span>
            <h4 className="text-sm font-bold text-slate-900">1. AI Research</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              We analyze your industry, market, and competitors.
            </p>
          </div>

          <div className="space-y-1.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 text-sm font-bold">
              📑
            </span>
            <h4 className="text-sm font-bold text-slate-900">2. Build Workspace</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              We create your personalized dashboard and tools.
            </p>
          </div>

          <div className="space-y-1.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600 text-sm font-bold">
              🤖
            </span>
            <h4 className="text-sm font-bold text-slate-900">3. Agents at Work</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Your AI team starts planning and finding opportunities.
            </p>
          </div>

          <div className="space-y-1.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 text-sm font-bold">
              📈
            </span>
            <h4 className="text-sm font-bold text-slate-900">4. CEO Briefing</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Get your first AI briefing within 24 hours.
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          className="w-full sm:w-1/2 rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 flex items-center justify-center gap-2"
        >
          <span>▶ Take a Quick Tour (2 min)</span>
        </button>
        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          className="w-full sm:w-1/2 rounded-xl bg-[#2563EB] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 flex items-center justify-center gap-2"
        >
          <span>Go to My Dashboard</span>
          <svg viewBox="0 0 16 16" className="h-4 w-4 fill-none stroke-currentColor stroke-[2.2]">
            <path d="M6 3.5l4.5 4.5L6 12.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Quote */}
      <blockquote className="rounded-2xl border border-slate-100 bg-[#F8FAFC] p-4 text-center text-xs text-slate-500 italic">
        &ldquo;Ideas are powerful, but execution changes lives. We&apos;re excited to be part of your journey.&rdquo;
        <span className="block not-italic font-semibold text-slate-700 mt-1">— The MAJIRI AI Team</span>
      </blockquote>
    </div>
  );
}

