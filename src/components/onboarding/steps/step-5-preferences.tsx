"use client";
import { FormEvent, useState } from "react";
import { CommunicationStyle, OnboardingData } from "@/types/onboarding";

interface Step5Props {
  data: OnboardingData;
  onUpdate: (fields: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const SUPPORT_AREAS = [
  { name: "Strategy & Planning", icon: "🎯" },
  { name: "Marketing & Sales", icon: "📢" },
  { name: "Finance & Accounting", icon: "📊" },
  { name: "Operations & Systems", icon: "⚙️" },
  { name: "Legal & Compliance", icon: "⚖️" },
  { name: "Product Development", icon: "📦" },
  { name: "Team Building & HR", icon: "👥" },
  { name: "Funding & Investment", icon: "🏦" },
  { name: "Market Research", icon: "🔍" },
];

const COMMUNICATION_STYLES: { id: CommunicationStyle; title: string; subtitle: string; icon: string }[] = [
  { id: "short_focused", title: "Short & Focused", subtitle: "Key insights only", icon: "⚡" },
  { id: "detailed_reports", title: "Detailed Reports", subtitle: "In-depth analysis", icon: "📑" },
  { id: "conversational", title: "Conversational", subtitle: "Chat with MAJIRI AI", icon: "💬" },
];

const INTEGRATIONS = [
  "Google Workspace",
  "Microsoft 365",
  "WhatsApp",
  "Shopify",
  "Stripe",
  "QuickBooks",
  "Facebook / Instagram",
  "Not now",
];

export function Step5Preferences({ data, onUpdate, onNext, onBack }: Step5Props) {
  const [supportAreas, setSupportAreas] = useState<string[]>(data.supportAreas || []);
  const [communicationStyle, setCommunicationStyle] = useState<CommunicationStyle>(data.communicationStyle);
  const [updateFrequency, setUpdateFrequency] = useState(data.updateFrequency || "Daily");
  const [workingHoursStart, setWorkingHoursStart] = useState(data.workingHoursStart || "09:00 AM");
  const [workingHoursEnd, setWorkingHoursEnd] = useState(data.workingHoursEnd || "06:00 PM");
  const [timezone, setTimezone] = useState(data.timezone || "WAT (GMT+1)");
  const [preferredLanguage, setPreferredLanguage] = useState(data.preferredLanguage || "English");
  const [integrations, setIntegrations] = useState<string[]>(data.integrations || []);
  const [additionalPreferences, setAdditionalPreferences] = useState(data.additionalPreferences);
  const [error, setError] = useState("");

  function toggleSupportArea(area: string) {
    if (supportAreas.includes(area)) {
      setSupportAreas(supportAreas.filter((a) => a !== area));
    } else {
      if (supportAreas.length >= 5) {
        setError("You can select up to 5 support areas.");
        return;
      }
      setError("");
      setSupportAreas([...supportAreas, area]);
    }
  }

  function toggleIntegration(integ: string) {
    if (integ === "Not now") {
      setIntegrations(["Not now"]);
      return;
    }
    const filtered = integrations.filter((i) => i !== "Not now");
    if (filtered.includes(integ)) {
      setIntegrations(filtered.filter((i) => i !== integ));
    } else {
      setIntegrations([...filtered, integ]);
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (supportAreas.length === 0) {
      setError("Please choose at least 1 support area.");
      return;
    }
    setError("");
    onUpdate({
      supportAreas,
      communicationStyle,
      updateFrequency,
      workingHoursStart,
      workingHoursEnd,
      timezone,
      preferredLanguage,
      integrations,
      additionalPreferences,
    });
    onNext();
  }

  return (
    <div className="space-y-6">
      <div>
        <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
          Step 5 of 7
        </span>
        <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F172A]">
          Set your preferences
        </h1>
        <p className="mt-1.5 text-sm sm:text-[15px] text-[#475467]">
          Help us tailor MAJIRI AI to your unique needs. These preferences guide our insights and recommendations.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Support Areas */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-semibold text-[#1E293B]">
              Areas you need the most support (select up to 5) <span className="text-red-500">*</span>
            </label>
            <span className="text-xs text-slate-400">{supportAreas.length}/5 selected</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {SUPPORT_AREAS.map((sa) => {
              const active = supportAreas.includes(sa.name);
              return (
                <button
                  type="button"
                  key={sa.name}
                  onClick={() => toggleSupportArea(sa.name)}
                  className={`flex items-center gap-2 rounded-xl border p-3 text-left text-xs transition ${
                    active
                      ? "border-blue-600 bg-blue-50/60 font-semibold text-blue-900 ring-1 ring-blue-600/30"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                  }`}
                >
                  <span className="text-base">{sa.icon}</span>
                  <span className="truncate">{sa.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Communication Style */}
        <div>
          <label className="block text-sm font-semibold text-[#1E293B] mb-2">
            Preferred communication style <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {COMMUNICATION_STYLES.map((cs) => {
              const selected = communicationStyle === cs.id;
              return (
                <button
                  type="button"
                  key={cs.id}
                  onClick={() => setCommunicationStyle(cs.id)}
                  className={`rounded-xl border p-3 text-left transition ${
                    selected
                      ? "border-blue-600 bg-blue-50/60 ring-2 ring-blue-600/20 shadow-xs"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="text-base mb-1">{cs.icon}</div>
                  <p className="text-xs font-bold text-[#0F172A]">{cs.title}</p>
                  <p className="mt-0.5 text-[10.5px] text-[#64748B]">{cs.subtitle}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Frequency & Language */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold text-[#1E293B] mb-1.5">
              Update frequency <span className="text-red-500">*</span>
            </label>
            <select
              value={updateFrequency}
              onChange={(e) => setUpdateFrequency(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition"
            >
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Bi-weekly">Bi-weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#1E293B] mb-1.5">
              Preferred language
            </label>
            <select
              value={preferredLanguage}
              onChange={(e) => setPreferredLanguage(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition"
            >
              <option value="English">English</option>
              <option value="French">Français (French)</option>
            </select>
          </div>
        </div>

        {/* Working Hours */}
        <div>
          <label className="block text-sm font-semibold text-[#1E293B] mb-1.5">
            Your working hours <span className="text-xs text-slate-400 font-normal">(Optional)</span>
          </label>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <input
              type="text"
              value={workingHoursStart}
              onChange={(e) => setWorkingHoursStart(e.target.value)}
              placeholder="9:00 AM"
              className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-xs sm:text-sm text-slate-900 text-center"
            />
            <input
              type="text"
              value={workingHoursEnd}
              onChange={(e) => setWorkingHoursEnd(e.target.value)}
              placeholder="6:00 PM"
              className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-xs sm:text-sm text-slate-900 text-center"
            />
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="rounded-xl border border-slate-300 bg-white px-2 sm:px-3 py-2.5 text-xs sm:text-sm text-slate-900"
            >
              <option value="WAT (GMT+1)">WAT (GMT+1)</option>
              <option value="GMT (+0)">GMT (+0)</option>
              <option value="EAT (GMT+3)">EAT (GMT+3)</option>
              <option value="EST (GMT-5)">EST (GMT-5)</option>
              <option value="PST (GMT-8)">PST (GMT-8)</option>
            </select>
          </div>
        </div>

        {/* Integrations */}
        <div>
          <label className="block text-sm font-semibold text-[#1E293B] mb-2">
            Integrations <span className="text-xs text-slate-400 font-normal">(Optional)</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {INTEGRATIONS.map((integ) => {
              const active = integrations.includes(integ);
              return (
                <button
                  type="button"
                  key={integ}
                  onClick={() => toggleIntegration(integ)}
                  className={`rounded-lg border px-3 py-1.5 text-xs transition ${
                    active
                      ? "border-blue-600 bg-blue-50 text-blue-900 font-semibold"
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                  }`}
                >
                  {integ}
                </button>
              );
            })}
          </div>
        </div>

        {/* Additional details */}
        <div>
          <label className="block text-sm font-semibold text-[#1E293B] mb-1.5">
            Anything else we should know? <span className="text-xs text-slate-400 font-normal">(Optional)</span>
          </label>
          <textarea
            rows={2}
            value={additionalPreferences}
            onChange={(e) => setAdditionalPreferences(e.target.value)}
            placeholder="Share any specific preferences, constraints, or important details..."
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

