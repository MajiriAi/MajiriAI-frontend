"use client";
import { useEffect, useRef, useState } from "react";
import {
  DEMO_ONBOARDING_DATA,
  EMPTY_ONBOARDING_DATA,
  OnboardingData,
  mergeOnboardingData,
} from "@/types/onboarding";
import {
  completeOnboarding,
  fetchOnboardingState,
  saveOnboardingDraft,
} from "@/lib/api/onboarding";
import { ApiError } from "@/types/api";
import { OnboardingSidebar } from "./onboarding-sidebar";
import { StepProgressBar } from "./step-progress-bar";
import { Step1AboutYou } from "./steps/step-1-about-you";
import { Step2YourBusiness } from "./steps/step-2-your-business";
import { Step3BusinessGoals } from "./steps/step-3-business-goals";
import { Step4BusinessOperations } from "./steps/step-4-business-operations";
import { Step5Preferences } from "./steps/step-5-preferences";
import { Step6Review } from "./steps/step-6-review";
import { Step7Complete } from "./steps/step-7-complete";

const STORAGE_KEY = "majiri_onboarding_draft_v2";

type StoredDraft = {
  step?: number;
  data?: Partial<OnboardingData>;
  completed?: boolean;
  savedAt?: string;
};

type SaveState = "idle" | "saving" | "saved" | "error";

function readDraft(key: string): StoredDraft | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as StoredDraft) : null;
  } catch {
    return null;
  }
}

function clampStep(step: number | undefined): number {
  if (!step || Number.isNaN(step)) return 1;
  return Math.min(6, Math.max(1, Math.round(step)));
}

const DEMO_IMPORT_WINDOW_MS = 24 * 60 * 60 * 1000;

function readRecentDemoDraft(): StoredDraft | null {
  const draft = readDraft(`${STORAGE_KEY}:demo`);
  if (!draft?.data) return null;

  const savedAt = draft.savedAt ? Date.parse(draft.savedAt) : 0;
  if (savedAt && Date.now() - savedAt > DEMO_IMPORT_WINDOW_MS) return null;

  return draft;
}

function normalizeDefaults(data: OnboardingData): OnboardingData {
  return {
    ...data,
    primaryIndustry: data.primaryIndustry || EMPTY_ONBOARDING_DATA.primaryIndustry,
    revenueStage: data.revenueStage || EMPTY_ONBOARDING_DATA.revenueStage,
  };
}

function findIncompleteStep(data: OnboardingData): { step: number; message: string } | null {
  if (!data.firstName.trim() || !data.city.trim()) {
    return { step: 1, message: "Please complete your name and city before finishing." };
  }

  if (
    !data.businessName.trim() ||
    !data.businessDescription.trim() ||
    !data.primaryIndustry.trim() ||
    !data.businessLocation.trim()
  ) {
    return { step: 2, message: "Please complete your business details before finishing." };
  }

  if (!data.specificGoals.length) {
    return { step: 3, message: "Please choose at least one business goal before finishing." };
  }

  if (!data.businessModel) {
    return { step: 4, message: "Please choose a business model before finishing." };
  }

  if (!data.supportAreas.length || !data.communicationStyle) {
    return { step: 5, message: "Please select your support areas and communication style." };
  }

  return null;
}

export function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingData>(EMPTY_ONBOARDING_DATA);
  const [isLoaded, setIsLoaded] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [isDemo, setIsDemo] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [formError, setFormError] = useState("");
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [saveError, setSaveError] = useState("");
  const storageKeyRef = useRef(`${STORAGE_KEY}:anon`);

  // Load the saved draft from the backend first, then use the local draft as a
  // safety net (e.g. when the last autosave did not reach the network).
  useEffect(() => {
    let cancelled = false;

    (async () => {
      let serverState: Awaited<ReturnType<typeof fetchOnboardingState>> | undefined;
      let fetchFailed = false;

      try {
        serverState = await fetchOnboardingState();
      } catch (error) {
        fetchFailed = true;
        if (!cancelled) {
          setLoadError(
            error instanceof Error
              ? error.message
              : "We couldn't load your saved onboarding."
          );
        }
      }

      if (cancelled) return;

      const userId = serverState?.user?.id;
      const storageKey = userId ? `${STORAGE_KEY}:${userId}` : `${STORAGE_KEY}:demo`;
      storageKeyRef.current = storageKey;
      const draft = readDraft(storageKey);

      if (serverState) {
        const savedData = mergeOnboardingData(EMPTY_ONBOARDING_DATA, serverState.data);

        if (serverState.completed) {
          setCompleted(true);
          setFormData(savedData);
          setCurrentStep(7);
          setIsLoaded(true);
          return;
        }

        // A brand-new account has no workspace yet. If they just finished the
        // demo preview in this browser, carry those answers into the account.
        const isNewWorkspace =
          !serverState.startup && !serverState.data?.businessName && !serverState.data?.city;
        const demoDraft = isNewWorkspace ? readRecentDemoDraft() : null;

        const data = normalizeDefaults(
          mergeOnboardingData(savedData, demoDraft?.data, draft?.data)
        );
        if (!data.firstName && serverState.user?.name) {
          data.firstName = serverState.user.name.trim().split(/\s+/)[0] ?? "";
        }

        setFormData(data);
        setCurrentStep(clampStep(draft?.step ?? demoDraft?.step ?? serverState.current_step));
      } else if (!fetchFailed) {
        // The Laravel API returned 401/403 — this is the passwordless demo.
        setIsDemo(true);
        const data = normalizeDefaults(
          draft?.data
            ? mergeOnboardingData(EMPTY_ONBOARDING_DATA, draft.data)
            : { ...DEMO_ONBOARDING_DATA }
        );

        setFormData(data);

        if (draft?.completed) {
          setCompleted(true);
          setCurrentStep(7);
          setIsLoaded(true);
          return;
        }

        setCurrentStep(clampStep(draft?.step));
      } else {
        // Offline/backend unreachable: allow the form to be filled locally, but
        // never pretend the data was saved to the server.
        setFormData(normalizeDefaults(mergeOnboardingData(EMPTY_ONBOARDING_DATA, draft?.data)));
        setCurrentStep(clampStep(draft?.step));
      }

      setIsLoaded(true);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // Persist every step change to localStorage immediately and to the backend
  // shortly after (debounced), so refreshing or switching devices resumes work.
  useEffect(() => {
    if (!isLoaded || completed) return;

    const stepToSave = Math.min(currentStep, 6);

    try {
      localStorage.setItem(
        storageKeyRef.current,
        JSON.stringify({
          step: stepToSave,
          data: formData,
          completed: false,
          savedAt: new Date().toISOString(),
        } satisfies StoredDraft)
      );
    } catch {
      // Ignore private-mode / quota errors.
    }

    if (isDemo) {
      setSaveState("saved");
      return;
    }

    setSaveState("saving");
    setSaveError("");

    const timer = setTimeout(async () => {
      try {
        await saveOnboardingDraft(stepToSave, formData);
        setSaveState("saved");
      } catch (error) {
        setSaveState("error");
        setSaveError(
          error instanceof Error ? error.message : "Could not save your progress."
        );
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [currentStep, formData, isLoaded, completed, isDemo]);

  function updateFormData(fields: Partial<OnboardingData>) {
    setFormError("");
    setFormData((prev) => ({ ...prev, ...fields }));
  }

  function nextStep() {
    setCurrentStep((step) => Math.min(step + 1, 7));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function prevStep() {
    setCurrentStep((step) => Math.max(step - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goToStep(step: number) {
    if (step === 7) {
      if (!completed) return;
    } else {
      setCompleted(false);
    }

    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleCompleteSetup() {
    const incomplete = findIncompleteStep(formData);
    if (incomplete) {
      setFormError(incomplete.message);
      setSaveState("error");
      goToStep(incomplete.step);
      return;
    }

    setSaveState("saving");
    setSaveError("");
    setFormError("");

    if (isDemo) {
      // Keep the demo answers in the browser so they survive a refresh and can
      // still be reviewed if the visitor decides to create an account.
      try {
        localStorage.setItem(
          storageKeyRef.current,
          JSON.stringify({
            step: 6,
            data: formData,
            completed: true,
            savedAt: new Date().toISOString(),
          } satisfies StoredDraft)
        );
      } catch {
        // Ignore private-mode / quota errors.
      }
      setCompleted(true);
      setCurrentStep(7);
      setSaveState("saved");
      return;
    }

    try {
      await completeOnboarding(formData);
      try {
        localStorage.removeItem(storageKeyRef.current);
      } catch {
        // Ignore.
      }
      setCompleted(true);
      setCurrentStep(7);
      setSaveState("saved");
    } catch (error) {
      setSaveState("error");

      if (error instanceof ApiError && (error.status === 401 || error.status === 403)) {
        throw new Error("Your session has expired. Please sign in again to finish onboarding.");
      }

      if (error instanceof Error) throw error;
      throw new Error("Unable to complete setup. Please check your network and try again.");
    }
  }

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC] text-[#0F172A]">
        <div className="flex flex-col items-center gap-3">
          <span className="h-9 w-9 animate-spin rounded-full border-[3px] border-blue-100 border-t-blue-600" />
          <p className="text-sm font-medium text-slate-500">Loading your onboarding…</p>
        </div>
      </div>
    );
  }

  const saveLabel =
    saveState === "saving"
      ? "Saving progress…"
      : saveState === "error"
        ? "Autosave paused"
        : "Progress saved";

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col lg:flex-row">
      {/* Left Navigation Sidebar */}
      <OnboardingSidebar currentStep={currentStep} onStepClick={goToStep} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col justify-between p-6 sm:p-10 lg:p-12 max-w-4xl">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between gap-3 pb-6 border-b border-slate-200/80 mb-6 sm:mb-8">
          <div className="flex items-center gap-2">
            {isDemo ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-bold text-blue-700 border border-blue-200/60">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
                Demo Preview
              </span>
            ) : (
              <span
                title={saveError || undefined}
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold border ${
                  saveState === "error"
                    ? "bg-amber-50 text-amber-700 border-amber-200"
                    : saveState === "saving"
                      ? "bg-blue-50 text-blue-700 border-blue-200/60"
                      : "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    saveState === "error"
                      ? "bg-amber-500"
                      : saveState === "saving"
                        ? "bg-blue-600 animate-pulse"
                        : "bg-emerald-500"
                  }`}
                />
                {saveLabel}
              </span>
            )}
            <span className="hidden sm:inline text-xs text-slate-400 font-medium">
              {isDemo
                ? "(Click any step on the left to jump)"
                : "Your progress is saved to your account"}
            </span>
          </div>
          <div className="ml-auto">
            <StepProgressBar currentStep={currentStep} totalSteps={7} />
          </div>
        </div>

        {(loadError || saveError || formError) && (
          <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800">
            {loadError || saveError || formError}
          </div>
        )}

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
          {currentStep === 7 && (
            <Step7Complete
              data={formData}
              isDemo={isDemo}
              onBack={() => goToStep(6)}
            />
          )}
        </div>
      </main>
    </div>
  );
}
