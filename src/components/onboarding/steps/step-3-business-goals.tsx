"use client";
import { FormEvent, useState } from "react";
import { OnboardingData, PrimaryGoal } from "@/types/onboarding";

interface Step3Props {
  data: OnboardingData;
  onUpdate: (fields: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const PRIMARY_GOALS: { id: PrimaryGoal; title: string; subtitle: string; icon: string }[] = [
  { id: "scale_revenue", title: "Scale Revenue", subtitle: "Increase sales and profitability", icon: "📈" },
  { id: "first_customer", title: "Get First Customer", subtitle: "Validate your idea and gain traction", icon: "👥" },
  { id: "expand_market", title: "Expand Market", subtitle: "Reach new customers or regions", icon: "🌐" },
  { id: "improve_operations", title: "Improve Operations", subtitle: "Work smarter and more efficiently", icon: "⚙️" },
  { id: "raise_funding", title: "Raise Funding", subtitle: "Get investment or financial support", icon: "💰" },
];

const AVAILABLE_SPECIFIC_GOALS = [
  "Reach ₦1M+ in monthly revenue",
  "Launch a website / online store",
  "Acquire 1,000+ customers",
  "Expand to new locations / markets",
  "Build a strong brand presence",
];

export function Step3BusinessGoals({ data, onUpdate, onNext, onBack }: Step3Props) {
  const [primaryGoal, setPrimaryGoal] = useState<PrimaryGoal>(data.primaryGoal);
  const [specificGoals, setSpecificGoals] = useState<string[]>(data.specificGoals);
  const [targetTimeline, setTargetTimeline] = useState(data.targetTimeline || "Next 12 months");
  const [goalNotes, setGoalNotes] = useState(data.goalNotes);
  const [customGoal, setCustomGoal] = useState("");
  const [error, setError] = useState("");

  function toggleSpecificGoal(goal: string) {
    setSpecificGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (specificGoals.length === 0 && !customGoal.trim()) {
      setError("Please select at least one specific goal.");
      return;
    }
    setError("");
    const finalGoals = customGoal.trim() ? [...specificGoals, customGoal.trim()] : specificGoals;
    onUpdate({
      primaryGoal,
      specificGoals: finalGoals,
      targetTimeline,
      goalNotes,
    });
    onNext();
  }

  return (
    <div className="space-y-6">
      <div>
        <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
          Step 3 of 7
        </span>
        <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F172A]">
          What are your business goals?
        </h1>
        <p className="mt-1.5 text-sm sm:text-[15px] text-[#475467]">
          Tell us what you want to achieve in the next 12 months and beyond. This helps MAJIRI AI create a personalized roadmap.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Primary Goal Selector */}
        <div>
          <label className="block text-sm font-semibold text-[#1E293B] mb-2">
            Primary goal (select one) <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {PRIMARY_GOALS.map((pg) => {
              const selected = primaryGoal === pg.id;
              return (
                <button
                  type="button"
                  key={pg.id}
                  onClick={() => setPrimaryGoal(pg.id)}
                  className={`rounded-xl border p-3 text-left transition ${
                    selected
                      ? "border-blue-600 bg-blue-50/60 ring-2 ring-blue-600/20 shadow-xs"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="text-base mb-1">{pg.icon}</div>
                  <p className="text-xs font-bold text-[#0F172A] leading-tight">{pg.title}</p>
                  <p className="mt-0.5 text-[10.5px] text-[#64748B] leading-tight">{pg.subtitle}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Specific Goals Checklist */}
        <div>
          <label className="block text-sm font-semibold text-[#1E293B] mb-2">
            Specific goals (you can select multiple) <span className="text-red-500">*</span>
          </label>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {AVAILABLE_SPECIFIC_GOALS.map((goal) => {
              const checked = specificGoals.includes(goal);
              return (
                <label
                  key={goal}
                  onClick={() => toggleSpecificGoal(goal)}
                  className={`flex items-center gap-3 rounded-xl border p-3 text-sm cursor-pointer transition select-none ${
                    checked
                      ? "border-blue-500 bg-blue-50/50 text-[#0F172A]"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                  }`}
                >
                  <div
                    className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border transition ${
                      checked
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    {checked && (
                      <svg viewBox="0 0 16 16" className="h-3 w-3 fill-none stroke-currentColor stroke-[2.5]">
                        <path d="M3.5 8.5 6.5 11.5 12.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <span className="font-medium text-xs sm:text-sm">{goal}</span>
                </label>
              );
            })}
          </div>
          <input
            type="text"
            value={customGoal}
            onChange={(e) => setCustomGoal(e.target.value)}
            placeholder="Other (please specify)"
            className="mt-2.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition"
          />
        </div>

        {/* Timeline */}
        <div>
          <label className="block text-sm font-semibold text-[#1E293B] mb-1.5">
            Target timeline <span className="text-red-500">*</span>
          </label>
          <select
            value={targetTimeline}
            onChange={(e) => setTargetTimeline(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition"
          >
            <option value="Next 3 months">Next 3 months</option>
            <option value="Next 6 months">Next 6 months</option>
            <option value="Next 12 months">Next 12 months</option>
            <option value="Next 24 months">Next 24 months</option>
          </select>
        </div>

        {/* Additional Notes */}
        <div>
          <label className="block text-sm font-semibold text-[#1E293B] mb-1.5">
            Additional notes <span className="text-xs text-slate-400 font-normal">(Optional)</span>
          </label>
          <textarea
            rows={2}
            value={goalNotes}
            onChange={(e) => setGoalNotes(e.target.value)}
            placeholder="Anything else you'd like us to know about your goals, challenges or vision?"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition"
          />
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={onBack}
            className="w-1/3 rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            ← Back
          </button>
          <button
            type="submit"
            className="w-2/3 rounded-xl bg-[#2563EB] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 flex items-center justify-center gap-2"
          >
            <span>Continue</span>
            <svg viewBox="0 0 16 16" className="h-4 w-4 fill-none stroke-currentColor stroke-[2.2]">
              <path d="M6 3.5l4.5 4.5L6 12.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}

