import { MajiriBrand } from "./majiri-brand";

export interface StepMeta {
  id: number;
  title: string;
  subtitle: string;
}

export const ONBOARDING_STEPS: StepMeta[] = [
  { id: 1, title: "About You", subtitle: "Your profile and goals" },
  { id: 2, title: "Your Business", subtitle: "Help us understand your business" },
  { id: 3, title: "Business Goals", subtitle: "What you want to achieve" },
  { id: 4, title: "Business Operations", subtitle: "How your business works" },
  { id: 5, title: "Preferences", subtitle: "Tailor your experience" },
  { id: 6, title: "Review", subtitle: "Confirm and get started" },
  { id: 7, title: "Setup Complete", subtitle: "You're all set!" },
];

interface OnboardingSidebarProps {
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export function OnboardingSidebar({ currentStep, onStepClick }: OnboardingSidebarProps) {
  return (
    <aside className="w-full lg:w-[320px] xl:w-[340px] flex-shrink-0 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#E2E8F0] bg-[#F8FAFC]/70 p-6 sm:p-8">
      <div>
        {/* Brand Header */}
        <div className="pb-8">
          <MajiriBrand />
        </div>

        {/* Step Navigation List */}
        <nav aria-label="Onboarding Progress" className="space-y-4">
          {ONBOARDING_STEPS.map((step) => {
            const isCompleted = step.id < currentStep;
            const isCurrent = step.id === currentStep;
            const isClickable = !!onStepClick;

            return (
              <div
                key={step.id}
                onClick={() => onStepClick?.(step.id)}
                className={`flex items-start gap-3.5 transition p-1.5 -ml-1.5 rounded-xl ${
                  isClickable ? "cursor-pointer hover:bg-slate-100/70 group" : ""
                }`}
              >
                {/* Step Circle Indicator */}
                <div
                  className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all ${
                    isCompleted
                      ? "bg-[#2563EB] text-white shadow-sm"
                      : isCurrent
                        ? "bg-[#2563EB] text-white ring-4 ring-blue-100 shadow-sm"
                        : "border border-slate-300 bg-white text-slate-400"
                  }`}
                >
                  {isCompleted ? (
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-none stroke-currentColor stroke-[2.5]" aria-hidden="true">
                      <path d="M3.5 8.5 6.5 11.5 12.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    step.id
                  )}
                </div>

                {/* Step Text */}
                <div className="pt-0.5">
                  <p
                    className={`text-[13.5px] font-semibold leading-none transition-colors ${
                      isCurrent
                        ? "text-[#0F172A]"
                        : isCompleted
                          ? "text-[#1E293B] group-hover:text-blue-600"
                          : "text-[#64748B]"
                    }`}
                  >
                    {step.title}
                  </p>
                  <p className="mt-1 text-[11.5px] text-[#94A3B8] leading-tight">
                    {step.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </nav>
      </div>

      {/* Inspirational Sidebar Callout */}
      <div className="mt-10 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/70 to-indigo-50/40 p-5">
        <span className="text-[10.5px] font-bold tracking-wider uppercase text-blue-700">
          Your Vision Matters
        </span>
        <h4 className="mt-1 text-[15px] font-bold text-[#0F172A] leading-snug">
          We&apos;re not just building a platform. We&apos;re building your growth partner.
        </h4>
        <p className="mt-2 text-[12px] text-[#475467] leading-relaxed">
          The more we understand about your business, the better we can help you make decisions, find opportunities, and scale faster.
        </p>

        <div className="mt-5 pt-3 border-t border-blue-100/60 flex items-center justify-between text-[10px] font-bold tracking-wider text-[#64748B] uppercase">
          <span>MAJIRI AI</span>
          <span>•</span>
          <span>BUSINESS OPERATING SYSTEM</span>
        </div>
      </div>
    </aside>
  );
}

