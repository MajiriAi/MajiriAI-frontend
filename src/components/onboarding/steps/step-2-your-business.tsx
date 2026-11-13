"use client";
import { FormEvent, useState } from "react";
import { BusinessStage, OnboardingData } from "@/types/onboarding";

interface Step2Props {
  data: OnboardingData;
  onUpdate: (fields: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const STAGES: { id: BusinessStage; title: string; subtitle: string; icon: string }[] = [
  { id: "idea", title: "Just an idea", subtitle: "Exploring / planning", icon: "bulb" },
  { id: "validation", title: "Validating", subtitle: "Testing demand", icon: "flask" },
  { id: "early_customers", title: "Early customers", subtitle: "First paying clients", icon: "users" },
  { id: "growing", title: "Growing", subtitle: "Scaling operations", icon: "trend" },
  { id: "established", title: "Established", subtitle: "Stable & profitable", icon: "building" },
];

const INDUSTRIES = [
  "Fashion & Apparel",
  "Technology & Software",
  "Retail & E-commerce",
  "Food & Agriculture",
  "Health & Wellness",
  "Education & Coaching",
  "Creative & Media",
  "Financial Services & FinTech",
  "Professional Services & Consulting",
  "Other",
];

export function Step2YourBusiness({ data, onUpdate, onNext, onBack }: Step2Props) {
  const [businessName, setBusinessName] = useState(data.businessName);
  const [businessDescription, setBusinessDescription] = useState(data.businessDescription);
  const [businessStage, setBusinessStage] = useState<BusinessStage>(data.businessStage);
  const [primaryIndustry, setPrimaryIndustry] = useState(data.primaryIndustry);
  const [businessLocation, setBusinessLocation] = useState(data.businessLocation || `${data.city ? data.city + ", " : ""}${data.country || "Nigeria"}`);
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!businessName.trim()) {
      setError("Please provide your business name.");
      return;
    }
    if (!businessDescription.trim()) {
      setError("Please provide a brief description of what your business does.");
      return;
    }
    setError("");
    onUpdate({
      businessName,
      businessDescription,
      businessStage,
      primaryIndustry,
      businessLocation,
    });
    onNext();
  }

  return (
    <div className="space-y-6">
      <div>
        <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
          Step 2 of 7
        </span>
        <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F172A]">
          Tell us about your business
        </h1>
        <p className="mt-1.5 text-sm sm:text-[15px] text-[#475467]">
          MAJIRI will use this information to build your business context and make its guidance more relevant over time.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-[#1E293B] mb-1.5">
            Business name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="e.g. Eni's Fashion Home"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-sm font-semibold text-[#1E293B]">
              What does your business do? <span className="text-red-500">*</span>
            </label>
            <span className="text-xs text-slate-400">{businessDescription.length}/500</span>
          </div>
          <textarea
            required
            maxLength={500}
            rows={3}
            value={businessDescription}
            onChange={(e) => setBusinessDescription(e.target.value)}
            placeholder="Describe your products, services, or what problem you solve..."
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition"
          />
        </div>

        {/* Business Stage Selector */}
        <div>
          <label className="block text-sm font-semibold text-[#1E293B] mb-2">
            Business stage <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {STAGES.map((st) => {
              const selected = businessStage === st.id;
              return (
                <button
                  type="button"
                  key={st.id}
                  onClick={() => setBusinessStage(st.id)}
                  className={`rounded-xl border p-3 text-left transition ${
                    selected
                      ? "border-blue-600 bg-blue-50/60 ring-2 ring-blue-600/20 shadow-xs"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="text-base mb-1">
                    {st.icon === "bulb" && "💡"}
                    {st.icon === "flask" && "🧪"}
                    {st.icon === "users" && "👥"}
                    {st.icon === "trend" && "📈"}
                    {st.icon === "building" && "🏢"}
                  </div>
                  <p className="text-xs font-bold text-[#0F172A] leading-tight">{st.title}</p>
                  <p className="mt-0.5 text-[10.5px] text-[#64748B] leading-tight">{st.subtitle}</p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold text-[#1E293B] mb-1.5">
              Primary industry / category <span className="text-red-500">*</span>
            </label>
            <select
              value={primaryIndustry}
              onChange={(e) => setPrimaryIndustry(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition"
            >
              {INDUSTRIES.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#1E293B] mb-1.5">
              Business location / market <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={businessLocation}
              onChange={(e) => setBusinessLocation(e.target.value)}
              placeholder="e.g. Warri, Delta State, Nigeria"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition"
            />
          </div>
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

