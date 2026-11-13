"use client";
import { FormEvent, useState } from "react";
import { OnboardingData } from "@/types/onboarding";

interface Step1Props {
  data: OnboardingData;
  onUpdate: (fields: Partial<OnboardingData>) => void;
  onNext: () => void;
}

export function Step1AboutYou({ data, onUpdate, onNext }: Step1Props) {
  const [firstName, setFirstName] = useState(data.firstName);
  const [country, setCountry] = useState(data.country || "Nigeria");
  const [city, setCity] = useState(data.city);
  const [roleTitle, setRoleTitle] = useState(data.roleTitle);
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!firstName.trim()) {
      setError("Please provide your first name.");
      return;
    }
    if (!city.trim()) {
      setError("Please provide your city / location.");
      return;
    }
    setError("");
    onUpdate({ firstName, country, city, roleTitle });
    onNext();
  }

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div>
        <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
          Step 1 of 7
        </span>
        <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F172A]">
          Tell us about yourself
        </h1>
        <p className="mt-1.5 text-sm sm:text-[15px] text-[#475467]">
          Let&apos;s start with your basic information. This helps us personalize your experience and build your business context.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-[#1E293B] mb-1.5">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="e.g. David"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold text-[#1E293B] mb-1.5">
              Country <span className="text-red-500">*</span>
            </label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition"
            >
              <option value="Nigeria">🇳🇬 Nigeria</option>
              <option value="Ghana">🇬🇭 Ghana</option>
              <option value="Kenya">🇰🇪 Kenya</option>
              <option value="South Africa">🇿🇦 South Africa</option>
              <option value="Rwanda">🇷🇼 Rwanda</option>
              <option value="United Kingdom">🇬🇧 United Kingdom</option>
              <option value="United States">🇺🇸 United States</option>
              <option value="Canada">🇨🇦 Canada</option>
              <option value="Other">🌍 Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#1E293B] mb-1.5">
              City / Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="e.g. Lagos"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#1E293B] mb-1.5">
            Role / Title <span className="text-xs text-slate-400 font-normal">(Optional)</span>
          </label>
          <input
            type="text"
            value={roleTitle}
            onChange={(e) => setRoleTitle(e.target.value)}
            placeholder="e.g. Founder, CEO, Business Owner"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition"
          />
        </div>

        <button
          type="submit"
          className="mt-2 w-full rounded-xl bg-[#2563EB] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 flex items-center justify-center gap-2"
        >
          <span>Continue</span>
          <svg viewBox="0 0 16 16" className="h-4 w-4 fill-none stroke-currentColor stroke-[2.2]">
            <path d="M6 3.5l4.5 4.5L6 12.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <p className="flex items-center justify-center gap-1.5 text-center text-xs text-[#64748B]">
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-current text-slate-400">
            <path d="M8 1a3.5 3.5 0 0 0-3.5 3.5V6H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-.5V4.5A3.5 3.5 0 0 0 8 1Zm2 5H6V4.5a2 2 0 1 1 4 0V6Z" />
          </svg>
          Your information is secure and will only be used to improve your MAJIRI AI experience.
        </p>
      </form>

      {/* Next Preview Card */}
      <div className="rounded-2xl border border-blue-100 bg-[#F0F6FE] p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm">
            <svg viewBox="0 0 20 20" className="h-4 w-4 fill-none stroke-currentColor stroke-2">
              <circle cx="10" cy="10" r="7" />
              <circle cx="10" cy="10" r="3" />
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#0F172A]">
              Next, we&apos;ll ask about your business
            </h4>
            <p className="mt-1 text-xs text-[#475467]">
              In the next few steps, we&apos;ll learn more about your business, including:
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-semibold text-[#1E293B]">
              {["Business name", "Business stage", "Biggest challenge", "Goals", "Resources", "Market context"].map(
                (item) => (
                  <span key={item} className="inline-flex items-center gap-1 rounded-md bg-white px-2.5 py-1 border border-blue-100 shadow-2xs">
                    <span className="text-blue-600">✓</span> {item}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

