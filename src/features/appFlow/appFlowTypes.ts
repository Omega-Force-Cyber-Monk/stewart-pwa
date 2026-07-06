export type Locale = "en" | "es";

export type FunnelType = "standard" | "women" | "seniors" | "couples";

export type ModuleStatus = "not_started" | "in_progress" | "complete";
export type ApprovalStatus = "not_submitted" | "pending" | "approved";

export type DriverProfile = {
  fullName: string;
  targetCity: string;
  regionalAirports: string;
  preferredDomain: string;
  headshotPreviewUrl?: string;
  email?: string;
  phone?: string;
  businessName?: string;
  businessContactEmail?: string;
  businessContactPhone?: string;
  pickupAreas?: string;
  topServiceAreas?: string;
};

export type BusinessSetupDraft = {
  fullName: string;
  email: string;
  phone: string;
  cityState: string;
  contactMethod: string;
  bestContactTime: string;
  spanishPreference: string;
  businessName: string;
  businessNameStatus: string;
  businessNameIdeas: string;
  preferredDomain: string;
  businessContactPhone: string;
  businessContactEmail: string;
  hasLogo: string;
  tagline: string;
  headshotPreviewUrl: string;
  serviceCity: string;
  airports: string;
  pickupAreas: string;
  customerTypes: string[];
  airportFocus: string;
  topServiceAreas: string;
};

export type AppFlowState = {
  locale: Locale;
  activeFunnel: FunnelType;
  hasPurchased: boolean;
  hasDfyUpgrade: boolean;
  onboardingCompleted: boolean;
  approvalStatus: ApprovalStatus;
  businessSetupDraft: BusinessSetupDraft;
  businessSetupStep: number;
  driverProfile: DriverProfile | null;
  moduleStatuses: Record<string, ModuleStatus>;
  dfyPipelineStep: number;
};
