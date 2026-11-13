"use client";
import { useEffect, useState } from "react";
import { INITIAL_ONBOARDING_DATA, OnboardingData } from "@/types/onboarding";
import { OnboardingSidebar } from "./onboarding-sidebar";
import { StepProgressBar } from "./step-progress-bar";
import { Step1AboutYou } from "./steps/step-1-about-you";
import { Step2YourBusiness } from "./steps/step-2-your-business";
import { Step3BusinessGoals } from "./steps/step-3-business-goals";
import { Step4BusinessOperations } from "./steps/step-4-business-operations";
import { Step5Preferences } from "./steps/step-5-preferences";
import { Step6Review } from "./steps/step-6-review";
import { Step7Complete } from "./steps/step-7-complete";

const STORAGE_KEY = "majiri_onboarding_draft_v1";

export function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingData>(INITIAL_ONBOARDING_DATA);
  const [isLoaded, setIsLoaded] = useState(false);

  // Restore draft from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.data) setFormData(parsed.data);
        if (parsed.step && parsed.step < 7) setCurrentStep(parsed.step);
      }
    } catch {
      // Ignore storage error
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save draft to localStorage whenever step or data changes
  useEffect(() => {
    if (!isLoaded || currentStep >= 7) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ step: currentStep, data: formData })
      );
    } catch {
      // Ignore storage error
    }
  }, [currentStep, formData, isLoaded]);

  function updateFormData(fields: Partial<OnboardingData>) {
    setFormData((prev) => ({ ...prev, ...fields }));
  }

  function nextStep() {
    setCurrentStep((s) => Math.min(s + 1, 7));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function prevStep() {
    setCurrentStep((s) => Math.max(s - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goToStep(step: number) {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleCompleteSetup() {
    try {
      // 1. Update Founder Profile in Laravel Backend
      const founderPayload = {
        background: `${formData.roleTitle || "Founder"} based in ${formData.city}, ${formData.country}`,
        skills: formData.supportAreas.join(", "),
        experience: `Current operations: ${formData.operationsDescription || "N/A"}. Working hours: ${formData.workingHoursStart} - ${formData.workingHoursEnd} (${formData.timezone})`,
        personal_goals: formData.specificGoals.join("; "),
        resources: `Team: ${formData.teamSize}. Tools: ${formData.toolsUsed.join(", ") || "None"}. Revenue: ${formData.revenueStage}`,
      };

      await fetch("/api/backend/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(founderPayload),
      }).catch(() => null);

      // 2. Map frontend stage to backend StartupStage
      const stageMap: Record<string, string> = {
        idea: "idea",
        validation: "validation",
        early_customers: "building",
        growing: "launched",
        established: "growth",
      };

      const startupPayload = {
        name: formData.businessName,
        description: formData.businessDescription,
        problem: formData.businessDescription,
        solution: `Business model: ${formData.businessModel.replace("_", " ")}. Primary Goal: ${formData.primaryGoal.replace("_", " ")}.`,
        target_customers: `Market location: ${formData.businessLocation}`,
        industry: formData.primaryIndustry,
        stage: stageMap[formData.businessStage] || "idea",
        current_challenges: formData.goalNotes || null,
      };

      await fetch("/api/backend/startups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(startupPayload),
      }).catch(() => null);
    } catch {
      // Fallback for preview mode
    }

    // Clear saved draft and advance to celebration step
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
    setCurrentStep(7);
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col lg:flex-row">
      {/* Left Navigation Sidebar */}
      <OnboardingSidebar currentStep={currentStep} onStepClick={goToStep} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col justify-between p-6 sm:p-10 lg:p-12 max-w-4xl">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-200/80 mb-6 sm:mb-8">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-bold text-blue-700 border border-blue-200/60">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
              Preview Pass Active
            </span>
            <span className="hidden sm:inline text-xs text-slate-400 font-medium">
              (Click any step on the left to jump)
            </span>
          </div>
          <div className="ml-auto">
            <StepProgressBar currentStep={currentStep} totalSteps={7} />
          </div>
        </div>

        {/* Step Views */}
        <div className="flex-1">
          {currentStep === 1 && (
            <Step1AboutYou data={formData} onUpdate={updateFormData} onNext={nextStep} />
          )}
          {currentStep === 2 && (
            <Step2YourBusiness
              data={formData}
              onUpdate={updateFormData}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
          {currentStep === 3 && (
            <Step3BusinessGoals
              data={formData}
              onUpdate={updateFormData}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
          {currentStep === 4 && (
            <Step4BusinessOperations
              data={formData}
              onUpdate={updateFormData}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
          {currentStep === 5 && (
            <Step5Preferences
              data={formData}
              onUpdate={updateFormData}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
          {currentStep === 6 && (
            <Step6Review
              data={formData}
              onGoToStep={goToStep}
              onBack={prevStep}
              onComplete={handleCompleteSetup}
            />
          )}
          {currentStep === 7 && <Step7Complete data={formData} />}
        </div>
      </main>
    </div>
  );
}

