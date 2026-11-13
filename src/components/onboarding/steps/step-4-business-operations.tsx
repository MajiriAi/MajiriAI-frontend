"use client";
import { FormEvent, useState } from "react";
import { BusinessModel, OnboardingData } from "@/types/onboarding";

interface Step4Props {
  data: OnboardingData;
  onUpdate: (fields: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const BUSINESS_MODELS: { id: BusinessModel; title: string; subtitle: string; icon: string }[] = [
  { id: "sell_products", title: "Sell products", subtitle: "Physical or digital products", icon: "🛍️" },
  { id: "provide_services", title: "Provide services", subtitle: "Professional or personal services", icon: "👥" },
  { id: "subscription", title: "Subscription", subtitle: "Recurring revenue (SaaS, membership)", icon: "🔄" },
  { id: "other", title: "Other", subtitle: "Marketplace, franchise, commission", icon: "📦" },
];

const AVAILABLE_TOOLS = [
  { name: "Website", icon: "🌐" },
  { name: "Social Media", icon: "📱" },
  { name: "Email Marketing", icon: "✉️" },
  { name: "WhatsApp", icon: "💬" },
  { name: "Accounting/Finance", icon: "📊" },
  { name: "CRM", icon: "📑" },
  { name: "E-commerce Platform", icon: "🛒" },
  { name: "Project Management", icon: "📋" },
];

export function Step4BusinessOperations({ data, onUpdate, onNext, onBack }: Step4Props) {
  const [businessModel, setBusinessModel] = useState<BusinessModel>(data.businessModel);
  const [revenueStage, setRevenueStage] = useState(data.revenueStage);
  const [averageMonthlyRevenue, setAverageMonthlyRevenue] = useState(data.averageMonthlyRevenue);
  const [teamSize, setTeamSize] = useState(data.teamSize || "1-5");
  const [toolsUsed, setToolsUsed] = useState<string[]>(data.toolsUsed || []);
  const [operationsDescription, setOperationsDescription] = useState(data.operationsDescription);

  function toggleTool(toolName: string) {
    setToolsUsed((prev) =>
      prev.includes(toolName) ? prev.filter((t) => t !== toolName) : [...prev, toolName]
    );
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onUpdate({
      businessModel,
      revenueStage,
      averageMonthlyRevenue,
      teamSize,
      toolsUsed,
      operationsDescription,
    });
    onNext();
  }

  return (
    <div className="space-y-6">
      <div>
        <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
          Step 4 of 7
        </span>
        <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F172A]">
          Tell us about your business operations
        </h1>
        <p className="mt-1.5 text-sm sm:text-[15px] text-[#475467]">
          Let&apos;s understand how your business currently works so MAJIRI AI can identify gaps and recommend the right tools.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Business Model */}
        <div>
          <label className="block text-sm font-semibold text-[#1E293B] mb-2">
            Business model <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
            {BUSINESS_MODELS.map((bm) => {
              const selected = businessModel === bm.id;
              return (
                <button
                  type="button"
                  key={bm.id}
                  onClick={() => setBusinessModel(bm.id)}
                  className={`rounded-xl border p-3 text-left transition ${
                    selected
                      ? "border-blue-600 bg-blue-50/60 ring-2 ring-blue-600/20 shadow-xs"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="text-base mb-1">{bm.icon}</div>
                  <p className="text-xs font-bold text-[#0F172A] leading-tight">{bm.title}</p>
                  <p className="mt-0.5 text-[10.5px] text-[#64748B] leading-tight">{bm.subtitle}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Revenue Stage & Average Revenue */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold text-[#1E293B] mb-1.5">
              Revenue stage <span className="text-red-500">*</span>
            </label>
            <select
              value={revenueStage}
              onChange={(e) => setRevenueStage(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition"
            >
              <option value="No revenue yet (pre-revenue)">No revenue yet (pre-revenue)</option>
              <option value="Under ₦500,000 / month">Under ₦500,000 / month</option>
              <option value="₦500,000 - ₦2,000,000 / month">₦500,000 - ₦2,000,000 / month</option>
              <option value="₦2,000,000 - ₦10,000,000 / month">₦2,000,000 - ₦10,000,000 / month</option>
              <option value="₦10,000,000+ / month">₦10,000,000+ / month</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#1E293B] mb-1.5">
              Average monthly revenue <span className="text-xs text-slate-400 font-normal">(Optional)</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-sm font-bold text-slate-500">
                ₦
              </span>
              <input
                type="text"
                value={averageMonthlyRevenue}
                onChange={(e) => setAverageMonthlyRevenue(e.target.value)}
                placeholder="e.g. 500,000"
                className="w-full rounded-xl border border-slate-300 bg-white pl-9 pr-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition"
              />
            </div>
          </div>
        </div>

        {/* Team Size */}
        <div>
          <label className="block text-sm font-semibold text-[#1E293B] mb-1.5">
            Number of team members
          </label>
          <select
            value={teamSize}
            onChange={(e) => setTeamSize(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition"
          >
            <option value="Just me (Solo founder)">Just me (Solo founder)</option>
            <option value="1-5">1-5 team members</option>
            <option value="6-15">6-15 team members</option>
            <option value="16-50">16-50 team members</option>
            <option value="50+">50+ team members</option>
          </select>
        </div>

        {/* Tools in Use */}
        <div>
          <label className="block text-sm font-semibold text-[#1E293B] mb-2">
            Tools you currently use <span className="text-xs text-slate-400 font-normal">(Optional)</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {AVAILABLE_TOOLS.map((t) => {
              const active = toolsUsed.includes(t.name);
              return (
                <button
                  type="button"
                  key={t.name}
                  onClick={() => toggleTool(t.name)}
                  className={`flex items-center gap-2 rounded-xl border p-2.5 text-left text-xs transition ${
                    active
                      ? "border-blue-600 bg-blue-50/60 font-semibold text-blue-900"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                  }`}
                >
                  <span>{t.icon}</span>
                  <span className="truncate">{t.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Current Operations Description */}
        <div>
          <label className="block text-sm font-semibold text-[#1E293B] mb-1.5">
            Describe your current operations <span className="text-xs text-slate-400 font-normal">(Optional)</span>
          </label>
          <textarea
            rows={2}
            value={operationsDescription}
            onChange={(e) => setOperationsDescription(e.target.value)}
            placeholder="Tell us how you currently run your business (e.g. sales process, fulfillment, customer support, etc.)"
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

