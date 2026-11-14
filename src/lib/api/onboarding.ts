import { ApiError, type ApiErrorResponse } from "@/types/api";
import type { OnboardingData } from "@/types/onboarding";

export interface OnboardingUser {
  id: number;
  name: string;
  email: string;
}

export interface OnboardingState {
  completed: boolean;
  current_step: number;
  data: Partial<OnboardingData> | null;
  user?: OnboardingUser;
  founder?: unknown;
  startup?: unknown;
  goals?: unknown[];
}

async function errorFromResponse(res: Response): Promise<ApiError> {
  let payload: ApiErrorResponse | undefined;
  try {
    payload = await res.json();
  } catch {
    // The proxy may return a non-JSON body if Laravel is unreachable.
  }

  const firstValidationError = payload?.errors
    ? Object.values(payload.errors)[0]?.[0]
    : undefined;

  return new ApiError(
    firstValidationError ?? payload?.message ?? "Something went wrong. Please try again.",
    res.status,
    payload?.errors
  );
}

/**
 * Fetch the saved onboarding draft/completion. Returns null when the request is
 * unauthenticated (the demo pass), so the wizard can fall back to preview data.
 */
export async function fetchOnboardingState(): Promise<OnboardingState | null> {
  const res = await fetch("/api/backend/onboarding", { cache: "no-store" });

  if (res.status === 401 || res.status === 403) return null;
  if (!res.ok) throw await errorFromResponse(res);

  return (await res.json()) as OnboardingState;
}

export async function saveOnboardingDraft(
  currentStep: number,
  data: OnboardingData
): Promise<OnboardingState> {
  const res = await fetch("/api/backend/onboarding", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ current_step: currentStep, data }),
  });

  if (!res.ok) throw await errorFromResponse(res);

  return (await res.json()) as OnboardingState;
}

export async function completeOnboarding(data: OnboardingData): Promise<OnboardingState> {
  const res = await fetch("/api/backend/onboarding/complete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data }),
  });

  if (!res.ok) throw await errorFromResponse(res);

  return (await res.json()) as OnboardingState;
}
