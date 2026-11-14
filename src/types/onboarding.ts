export type BusinessStage = "idea" | "validation" | "early_customers" | "growing" | "established";

export type PrimaryGoal = "scale_revenue" | "first_customer" | "expand_market" | "improve_operations" | "raise_funding";

export type BusinessModel = "sell_products" | "provide_services" | "subscription" | "other";

export type CommunicationStyle = "short_focused" | "detailed_reports" | "conversational";

export interface OnboardingData {
  // Step 1: About You
  firstName: string;
  country: string;
  city: string;
  roleTitle: string;

  // Step 2: Your Business
  businessName: string;
  businessDescription: string;
  businessStage: BusinessStage;
  primaryIndustry: string;
  businessLocation: string;

  // Step 3: Business Goals
  primaryGoal: PrimaryGoal;
  specificGoals: string[];
  targetTimeline: string;
  goalNotes: string;

  // Step 4: Business Operations
  businessModel: BusinessModel;
  revenueStage: string;
  averageMonthlyRevenue: string;
  teamSize: string;
  toolsUsed: string[];
  operationsDescription: string;

  // Step 5: Preferences
  supportAreas: string[];
  communicationStyle: CommunicationStyle;
  updateFrequency: string;
  workingHoursStart: string;
  workingHoursEnd: string;
  timezone: string;
  preferredLanguage: string;
  integrations: string[];
  additionalPreferences: string;
}

/**
 * Clean defaults for a brand-new founder. The backend is the source of truth
 * once onboarding starts, so nothing here should look like real saved data.
 */
export const EMPTY_ONBOARDING_DATA: OnboardingData = {
  firstName: "",
  country: "Nigeria",
  city: "",
  roleTitle: "Founder / Owner",

  businessName: "",
  businessDescription: "",
  businessStage: "idea",
  primaryIndustry: "Fashion & Apparel",
  businessLocation: "",

  primaryGoal: "scale_revenue",
  specificGoals: [],
  targetTimeline: "Next 12 months",
  goalNotes: "",

  businessModel: "sell_products",
  revenueStage: "No revenue yet (pre-revenue)",
  averageMonthlyRevenue: "",
  teamSize: "Just me (Solo founder)",
  toolsUsed: [],
  operationsDescription: "",

  supportAreas: [],
  communicationStyle: "detailed_reports",
  updateFrequency: "Daily",
  workingHoursStart: "09:00 AM",
  workingHoursEnd: "06:00 PM",
  timezone: "WAT (GMT+1)",
  preferredLanguage: "English",
  integrations: [],
  additionalPreferences: "",
};

/**
 * Sample data used only by the passwordless demo preview, so visitors can see
 * the complete onboarding experience without creating a backend account.
 */
export const DEMO_ONBOARDING_DATA: OnboardingData = {
  firstName: "Ajiri",
  country: "Nigeria",
  city: "Warri, Delta State",
  roleTitle: "Founder / Owner",

  businessName: "Eni's Fashion Home",
  businessDescription: "A modern fashion store offering quality and affordable clothing for women.",
  businessStage: "idea",
  primaryIndustry: "Fashion & Apparel",
  businessLocation: "Warri, Delta State, Nigeria",

  primaryGoal: "scale_revenue",
  specificGoals: [
    "Reach ₦1M+ in monthly revenue",
    "Launch a website / online store",
    "Acquire 1,000+ customers",
    "Build a strong brand presence",
    "Expand to new locations / markets",
  ],
  targetTimeline: "Next 12 months",
  goalNotes: "Need guidance on registration, supplier sourcing, and online store setup.",

  businessModel: "sell_products",
  revenueStage: "No revenue yet (pre-revenue)",
  averageMonthlyRevenue: "500,000",
  teamSize: "1-5",
  toolsUsed: ["WhatsApp", "Social Media"],
  operationsDescription: "Product sourcing, sales (offline), customer engagement via social media.",

  supportAreas: [
    "Strategy & Planning",
    "Marketing & Sales",
    "Finance & Accounting",
    "Operations & Systems",
    "Product Development",
  ],
  communicationStyle: "detailed_reports",
  updateFrequency: "Daily",
  workingHoursStart: "09:00 AM",
  workingHoursEnd: "06:00 PM",
  timezone: "WAT (GMT+1)",
  preferredLanguage: "English",
  integrations: ["WhatsApp", "Social Media"],
  additionalPreferences: "Need guidance on supplier sourcing and digital storefront.",
};

/**
 * Shallow-merge saved data over defaults. `null` values are skipped so a
 * partially saved backend draft cannot wipe out local defaults.
 */
export function mergeOnboardingData(
  base: OnboardingData,
  ...patches: Array<Partial<OnboardingData> | null | undefined>
): OnboardingData {
  return patches.reduce<OnboardingData>(
    (data, patch) => (patch ? { ...data, ...patch } : data),
    base
  );
}
