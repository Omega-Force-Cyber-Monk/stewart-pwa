export type Locale = "en" | "es";

export type FunnelType = "standard" | "women" | "seniors" | "couples";

export type ModuleStatus = "not_started" | "in_progress" | "complete";

export type DriverProfile = {
  fullName: string;
  targetCity: string;
  regionalAirports: string;
  preferredDomain: string;
  headshotPreviewUrl?: string;
};

export type AppFlowState = {
  locale: Locale;
  activeFunnel: FunnelType;
  hasPurchased: boolean;
  hasDfyUpgrade: boolean;
  onboardingCompleted: boolean;
  driverProfile: DriverProfile | null;
  moduleStatuses: Record<string, ModuleStatus>;
  dfyPipelineStep: number;
};
