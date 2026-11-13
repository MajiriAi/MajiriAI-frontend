"use client";
import { useState } from "react";
import { OnboardingData } from "@/types/onboarding";

interface Step6Props {
  data: OnboardingData;
  onGoToStep: (step: number) => void;
  onBack: () => void;
  onComplete: () => Promise<void>;
}

export function Step6Review({ data, onGoToStep, onBack, onComplete }: Step6Props) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleComplete() {
    setSubmitting(true);
    setError("");
    try {
      await onComplete();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unable to complete setup. Please check your network and try again.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
          Step 6 of 7
        </span>
        <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F172A]">
          Review your information
        </h1>
        <p className="mt-1.5 text-sm sm:text-[15px] text-[#475467]">
          Here&apos;s a summary of what you&apos;ve shared. Review and edit if needed before building your workspace.
        </p>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Profile Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2 text-sm font-bold text-[#0F172A]">
              <span>👤</span> Your Profile
            </div>
            <button
              type="button"
              onClick={() => onGoToStep(1)}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
            >
              Edit
            </button>
          </div>
          <div className="mt-3 space-y-1.5 text-xs sm:text-[13px]">
            <p><span className="text-slate-400">Name:</span> <strong className="font-semibold text-slate-800">{data.firstName}</strong></p>
            <p><span className="text-slate-400">Location:</span> <span className="text-slate-700">{data.city}, {data.country}</span></p>
            <p><span className="text-slate-400">Role:</span> <span className="text-slate-700">{data.roleTitle || "Founder / Owner"}</span></p>
          </div>
        </div>

        {/* Business Overview */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2 text-sm font-bold text-[#0F172A]">
              <span>🏢</span> Business Overview
            </div>
            <button
              type="button"
              onClick={() => onGoToStep(2)}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
            >
              Edit
            </button>
          </div>
          <div className="mt-3 space-y-1.5 text-xs sm:text-[13px]">
            <p><span className="text-slate-400">Name:</span> <strong className="font-semibold text-slate-800">{data.businessName}</strong></p>
            <p><span className="text-slate-400">Industry:</span> <span className="text-slate-700">{data.primaryIndustry}</span></p>
            <p><span className="text-slate-400">Stage:</span> <span className="capitalize text-slate-700">{data.businessStage.replace("_", " ")}</span></p>
            <p><span className="text-slate-400">Description:</span> <span className="text-slate-700 line-clamp-2">{data.businessDescription}</span></p>
          </div>
        </div>

        {/* Business Goals */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2 text-sm font-bold text-[#0F172A]">
              <span>🎯</span> Business Goals
            </div>
            <button
              type="button"
              onClick={() => onGoToStep(3)}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
            >
              Edit
            </button>
          </div>
          <div className="mt-3 space-y-1 text-xs">
            <p className="text-slate-500 font-medium mb-1.5">Timeline: {data.targetTimeline}</p>
            {data.specificGoals.map((g) => (
              <p key={g} className="flex items-center gap-1.5 text-slate-700">
                <span className="text-blue-600 font-bold">✓</span> {g}
              </p>
            ))}
          </div>
        </div>

        {/* Operations */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2 text-sm font-bold text-[#0F172A]">
              <span>📊</span> Current Operations
            </div>
            <button
              type="button"
              onClick={() => onGoToStep(4)}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
            >
              Edit
            </button>
          </div>
          <div className="mt-3 space-y-1.5 text-xs sm:text-[13px]">
            <p><span className="text-slate-400">Revenue Stage:</span> <span className="text-slate-700">{data.revenueStage}</span></p>
            <p><span className="text-slate-400">Team Size:</span> <span className="text-slate-700">{data.teamSize}</span></p>
            <p><span className="text-slate-400">Tools:</span> <span className="text-slate-700">{data.toolsUsed.join(", ") || "None specified"}</span></p>
          </div>
        </div>

        {/* Support Areas */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2 text-sm font-bold text-[#0F172A]">
              <span>🤝</span> Support Areas
            </div>
            <button
              type="button"
              onClick={() => onGoToStep(5)}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
            >
              Edit
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {data.supportAreas.map((sa) => (
              <span key={sa} className="rounded-md bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-700">
                ✓ {sa}
              </span>
            ))}
          </div>
        </div>

        {/* Preferences */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2 text-sm font-bold text-[#0F172A]">
              <span>⚙️</span> Preferences
            </div>
            <button
              type="button"
              onClick={() => onGoToStep(5)}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
            >
              Edit
            </button>
          </div>
          <div className="mt-3 space-y-1.5 text-xs sm:text-[13px]">
            <p><span className="text-slate-400">Style:</span> <span className="capitalize text-slate-700">{data.communicationStyle.replace("_", " ")}</span></p>
            <p><span className="text-slate-400">Frequency:</span> <span className="text-slate-700">{data.updateFrequency}</span></p>
            <p><span className="text-slate-400">Timezone:</span> <span className="text-slate-700">{data.timezone}</span></p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-4">
        <button
          type="button"
          onClick={onBack}
          disabled={submitting}
          className="w-1/3 rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={handleComplete}
          disabled={submitting}
          className="w-2/3 rounded-xl bg-[#2563EB] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <span>{submitting ? "Building your workspace…" : "Complete Setup"}</span>
          <svg viewBox="0 0 16 16" className="h-4 w-4 fill-none stroke-currentColor stroke-[2.2]">
            <path d="M6 3.5l4.5 4.5L6 12.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

