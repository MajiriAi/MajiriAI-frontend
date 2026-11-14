interface StepProgressBarProps {
  currentStep: number;
  totalSteps?: number;
}

export function StepProgressBar({ currentStep, totalSteps = 7 }: StepProgressBarProps) {
  const steps = Array.from({ length: totalSteps }, (_, index) => index + 1);

  return (
    <div className="flex items-center gap-4">
      {/* Step Counter Label */}
      <span className="text-[13px] font-semibold text-[#475467]">
        Step {currentStep} of {totalSteps}
      </span>

      {/* Segmented Progress Bars */}
      <div className="flex items-center gap-1.5">
        {steps.map((stepNumber) => {
          const isActive = stepNumber <= currentStep;
          return (
            <div
              key={stepNumber}
              className={`h-1.5 w-6 sm:w-7 rounded-full transition-all duration-300 ${
                isActive ? "bg-[#2563EB]" : "bg-[#E2E8F0]"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}

