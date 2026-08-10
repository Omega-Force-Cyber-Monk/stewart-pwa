export interface BusinessDashboardResponse {
  success: boolean;
  purchase?: {
    baseVariant: boolean;
    addon: boolean;
    status: string;
  };
  business?: {
    status: string;
  };
  setupProgress?: {
    currentStep: number;
    completedSteps: number[];
    totalSteps: number;
    percentage: number;
    completed: boolean;
  };
  launchReady: boolean;
  missingRequirements?: string[];
}

export interface PublicBusinessResponse {
  success: boolean;
  [key: string]: unknown;
}

export interface BuyerInfo {
  fullName: string | null;
  email: string | null;
  phone: string | null;
}

export interface BusinessInfo {
  businessName: string;
  email: string | null;
  phone: string | null;
  businessInfo: string | null;
  logoUrl: string | null;
  slug: string;
  websiteUrl: string;
}

export interface AcuityInfo {
  connected: boolean;
  bookingUrl: string | null;
}

export interface ServiceAreaInfo {
  cityArea: string | null;
  airports: string[];
}

export interface ProgressInfo {
  currentStep: number;
  completedSteps: number[];
  totalSteps: number;
  percentage: number;
  completed: boolean;
}

export interface SetupStateResponse {
  success: boolean;
  data: {
    buyer: BuyerInfo;
    business: BusinessInfo;
    acuity: AcuityInfo;
    serviceArea: ServiceAreaInfo;
    progress: ProgressInfo;
    businessStatus: string;
  };
}

export interface UpdateSetupRequest {
  buyer?: Partial<BuyerInfo>;
  business?: Partial<BusinessInfo>;
  acuity?: Partial<AcuityInfo>;
  serviceArea?: Partial<ServiceAreaInfo>;
}

export interface UploadLogoResponse {
  success: boolean;
  logoUrl: string;
  business?: {
    id: string;
    businessName: string;
    logoUrl: string;
    status: string;
    updatedAt: string;
  };
}

export interface AirportOption {
  code: string;
  name: string;
  label: string;
}

export interface AirportSuggestion {
  cityArea: string;
  city: string;
  state: string;
  airportOptions: AirportOption[];
  airports: string[];
}

export interface AirportSuggestionsResponse {
  success: boolean;
  query: string;
  suggestions: AirportSuggestion[];
}

export interface ReferralCardData {
  businessName: string;
  businessPhone: string;
  businessEmail: string;
  businessSlug: string;
  websiteUrl: string;
  bookingUrl: string;
  qrCodeUrl: string;
  digitalCardUrl: string | null;
  printCardUrl: string | null;
  ready: boolean;
  missingRequirements: string[];
}

export interface ReferralCardResponse {
  success: boolean;
  data: ReferralCardData;
}

export interface BusinessResource {
  id: string;
  categoryId: string;
  name: string;
  title: string;
  description: string;
  type: string;
  step: string;
  cardColor: string;
  iconKey: string;
  sortOrder: number;
  fileUrl: string;
  isActive: boolean;
}

export interface BusinessResourcesResponse {
  success: boolean;
  resources: BusinessResource[];
}

export interface ChecklistItem {
  id: string;
  step: string;
  title: string;
  description: string;
  sortOrder: number;
  completed: boolean;
  completedAt: string | null;
}

export interface ChecklistItemsResponse {
  success: boolean;
  checklistItems: ChecklistItem[];
}

export interface LaunchReadinessResponse {
  success: boolean;
  ready: boolean;
  readyForFinalReview: boolean;
  percentage: number;
  currentStep: number;
  completedSteps: number[];
  requiredSteps: number[];
  missingRequirements: string[];
  businessStatus: string;
}

export interface FinalReviewResponse {
  success: boolean;
  data: {
    buyer: BuyerInfo;
    business: {
      name: string;
      email: string | null;
      phone: string | null;
      businessInfo: string | null;
      logoUrl: string | null;
      slug: string;
    };
    serviceArea: ServiceAreaInfo;
    acuity: {
      status: string;
      bookingUrl: string;
    };
    assets: {
      websiteUrl: string;
      qrCodeUrl: string;
      digitalCardUrl: string | null;
      printCardUrl: string | null;
    };
    progress: ProgressInfo;
    launchReady: boolean;
    readyForFinalReview: boolean;
    missingRequirements: string[];
    businessStatus: string;
  };
}

export interface CompleteLaunchResponse {
  success: boolean;
  alreadyActive: boolean;
  businessStatus: string;
  progress: ProgressInfo;
  launchReady: boolean;
}
