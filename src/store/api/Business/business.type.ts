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

export interface BusinessProfile {
  id: string;
  userId: string;
  businessName: string;
  email: string | null;
  phone: string | null;
  businessInfo: string | null;
  logoUrl: string | null;
  slug: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface BusinessProfileResponse {
  success: boolean;
  business: BusinessProfile | null;
}

export interface CreateBusinessRequest {
  businessName: string;
  email?: string;
  phone?: string;
  businessInfo?: string;
  logoUrl?: string;
  slug?: string;
}

export interface UpdateBusinessRequest {
  businessName?: string;
  email?: string;
  phone?: string;
  businessInfo?: string;
  logoUrl?: string;
  slug?: string;
}

export interface PublicBusinessProfile {
  name: string;
  slug: string;
  businessInfo: string | null;
  email: string | null;
  phone: string | null;
  logoUrl: string | null;
  websiteUrl: string;
}

export interface PublicServiceArea {
  cityArea: string | null;
  airports: string[];
}

export interface PublicBusinessData {
  business: PublicBusinessProfile;
  serviceArea: PublicServiceArea;
  booking: {
    bookingUrl: string | null;
  };
  referralCard: {
    websiteUrl: string;
    qrCodeUrl: string | null;
    digitalCardUrl: string | null;
    printCardUrl: string | null;
  };
}

export interface PublicBusinessResponse {
  success: boolean;
  data: PublicBusinessData;
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
    referralCard?: {
      websiteUrl: string | null;
      qrCodeUrl: string | null;
      digitalCardUrl: string | null;
      printCardUrl: string | null;
      ready: boolean;
    };
    progress: ProgressInfo;
    launchReady?: {
      ready: boolean;
      missingRequirements: string[];
    };
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
  businessInfo?: string | null;
  logoUrl?: string | null;
  serviceArea?: ServiceAreaInfo;
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

export type ResourceType = "video" | "pdf" | "link" | "guide";

export interface BusinessResource {
  id: string;
  categoryId?: string | null;
  name: string;
  title: string;
  description: string;
  type: ResourceType | string;
  step?: string;
  cardColor?: string | null;
  iconKey?: string | null;
  sortOrder: number;
  fileUrl: string;
  linkUrl?: string | null;
  durationSec?: number | null;
  hasFile?: boolean;
  createdAt?: string;
  isActive?: boolean;
}

export interface GuideResource {
  name: string;
  description: string | null;
  body: string;
}

export interface BusinessResourcesResponse {
  success: boolean;
  resources: BusinessResource[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface GuideResourceResponse {
  success?: boolean;
  data?: GuideResource;
  name?: string;
  description?: string | null;
  body?: string;
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

export type LeadSourcePage = "main" | "senior" | "women" | "couple" | "spanish";
export type LeadConsentTextVersion = "sms-consent-v1";

export interface PublicLeadConfigResponse {
  success: true;
  spanishPopupEnabled: boolean;
}

export interface CreatePublicLeadRequest {
  phone: string;
  city: string;
  sourcePage: LeadSourcePage;
  sessionId: string;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmTerm: string | null;
  utmContent: string | null;
  referrer: string | null;
  smsConsent: true;
  consentTextVersion: LeadConsentTextVersion;
}

export interface PublicLeadSubmission {
  id: string;
  status: "NEW";
  sourcePage: LeadSourcePage;
  submittedAt: string;
}

export interface CreatePublicLeadResponse {
  success: true;
  created: boolean;
  lead: PublicLeadSubmission;
}
