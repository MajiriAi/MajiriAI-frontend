"use client";

import { useRouter } from "next/navigation";
import { FormEvent, ReactNode, useState } from "react";

const COUNTRIES = [
  "United States",
  "United Kingdom",
  "Canada",
  "Nigeria",
  "Ghana",
  "Kenya",
  "South Africa",
  "India",
  "Germany",
  "France",
  "Brazil",
  "Australia",
];

export function JourneyForm() {
  const router = useRouter();
  const [country, setCountry] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/register");
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="grid items-end gap-3 sm:grid-cols-2 xl:grid-cols-[1fr_1fr_1fr_auto]">
        <Field label="Full Name">
          <input name="name" required placeholder="Your name" className="landing-input" autoComplete="name" />
        </Field>
        <Field label="Email Address">
          <input name="email" type="email" required placeholder="you@example.com" className="landing-input" autoComplete="email" />
        </Field>
        <Field label="Country">
          <div className="relative">
            <select
              name="country"
              required
              value={country}
              onChange={(event) => setCountry(event.target.value)}
              className={`landing-input appearance-none pr-9 ${country ? "text-[#1e293b]" : "text-[#94a3b8]"}`}
            >
              <option value="" disabled>
                Select country
              </option>
              {COUNTRIES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <svg viewBox="0 0 20 20" className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748b]" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M5 7.5 10 12.5 15 7.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </Field>
        <button
          type="submit"
          className="inline-flex h-[46px] items-center justify-center gap-2 rounded-xl bg-[#4f46e5] px-6 text-[15px] font-semibold text-white shadow-[0_10px_24px_rgba(79,70,229,0.32)] transition hover:bg-[#4338ca]"
        >
          Create Your Free Account
          <Arrow />
        </button>
      </div>
      <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-[12.5px] text-[#8b95a8]">
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="5" y="11" width="14" height="9" rx="2" />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" />
        </svg>
        Your information is secure and will never be shared.
      </p>
    </form>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-medium text-[#5c6b88]">{label}</span>
      {children}
    </label>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
