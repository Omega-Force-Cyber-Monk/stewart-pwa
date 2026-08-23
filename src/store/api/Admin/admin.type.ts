// ---- Common ----
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface Amount {
  currency: string;
  total: number;
}

// ---- Dashboard ----
export interface RevenueBucket {
  bucket: number;
  label: string;
  periodStart: string;
  periodEnd: string;
  totalCents: number;
  paymentCount: number;
  total: number;
}

export interface ActivityEvent {
  id: string;
  type: string;
  message: string;
  actorId: string | null;
  businessId: string | null;
  metadata: Record<string, unknown> | null;
  createdAt: string;
}

export interface DashboardUsersSummary {
  total: number;
  riders: number;
  admins: number;
  active: number;
  pending: number;
  suspended: number;
}

export interface DashboardBusinessesSummary {
  total: number;
  notStarted: number;
  inProgress: number;
  completed: number;
  active: number;
  suspended: number;
}

export interface DashboardPaymentsSummary {
  total: number;
  paid: number;
  pending: number;
  failed: number;
  expired: number;
}

export interface DashboardSummary {
  success: true;
  totalDrivers: number;
  totalRevenue: Amount & { totalCents: number };
  monthlyRevenue: RevenueBucket[];
  recentDrivers: RecentDriver[];
  activity: ActivityEvent[];
  users: DashboardUsersSummary;
  businesses: DashboardBusinessesSummary;
  payments: DashboardPaymentsSummary;
}

// ---- Drivers ----
export interface DriverUser {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  status: string;
  isVerified: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface DriverServiceArea {
  cityArea: string | null;
  airports: string[];
}

export interface DriverSetup {
  currentStep: number;
  completedSteps: number[];
  percentage: number;
}

export interface DriverReferralCard {
  websiteUrl: string | null;
  qrCodeUrl: string | null;
  digitalCardUrl: string | null;
  printCardUrl: string | null;
}

export interface Driver {
  id: string;
  driverCode: string;
  category: string;
  avatarUrl: string | null;
  verificationStatus: string;
  rejectionReason: string | null;
  approvedAt: string | null;
  rejectedAt: string | null;
  createdAt: string;
  updatedAt: string;
  user: DriverUser;
  business: (BusinessListItem & { logoUrl?: string | null; businessInfo?: string | null }) | null;
  serviceArea: DriverServiceArea;
  setup: DriverSetup;
  referralCard: DriverReferralCard;
}

export interface DriverVerificationResponse {
  success: true;
  driver: {
    id: string;
    driverCode: string;
    verificationStatus: string;
    approvedAt?: string | null;
    rejectedAt?: string | null;
    rejectionReason?: string | null;
  };
}

// ---- Businesses ----
export interface BusinessOwner {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  status: string;
}

export interface BusinessPurchase {
  basePurchased: boolean;
  addonPurchased: boolean;
  paidState: string | null;
  purchaseDate: string | null;
}

export interface BusinessSetup {
  currentStep: number;
  completedSteps: number[];
  percentage: number;
}

export interface BusinessListItem {
  id: string;
  name: string;
  slug: string;
  email: string | null;
  phone: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
  owner: BusinessOwner;
  setup: BusinessSetup;
  purchase: BusinessPurchase;
}

export interface BusinessDetail extends BusinessListItem {
  businessInfo: string | null;
  logoUrl: string | null;
  serviceArea: { cityArea: string | null; airports: string[] };
  acuity: { status: string; bookingUrl: string | null };
  launch: { launchReady: boolean; readyForFinalReview: boolean; missingRequirements: string[] };
  referralCard: {
    websiteUrl: string;
    qrCodeUrl: string | null;
    digitalCardUrl: string | null;
    printCardUrl: string | null;
  };
}

export interface SetupProgressStep {
  step: number;
  label: string;
  completed: boolean;
}

export interface BusinessSetupProgress {
  success: true;
  data: {
    currentStep: number;
    completedSteps: number[];
    percentage: number;
    requiredSteps: number[];
    launchReady: boolean;
    readyForFinalReview: boolean;
    missingRequirements: string[];
    businessStatus: string;
    steps: SetupProgressStep[];
  };
}

// ---- Payments ----
export interface PaymentLineItem {
  id: string;
  type: string;
  name: string;
  quantity: number;
  unitAmount: number;
  totalAmount: number;
}

export interface PaymentRider {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  status: string;
  driverProfile: { category: string; driverCode: string } | null;
}

export interface PaymentListItem {
  id: string;
  rider: PaymentRider | null;
  status: string;
  amount: Amount;
  lineItems: PaymentLineItem[];
  createdAt: string;
  paidAt: string | null;
}

export interface PaymentDetail extends PaymentListItem {
  rider: (PaymentRider & {
    business: { id: string; businessName: string; slug: string; status: string } | null;
  }) | null;
  receipt: { id: string; receiptNo: string | null; fileUrl: string | null; createdAt: string } | null;
  stripeCheckoutSessionId: string | null;
  stripePaymentIntentId: string | null;
  checkoutUrl: string | null;
  updatedAt: string;
}

// ---- Support ----
export interface SupportMessage {
  id: string;
  ticketId: string;
  senderId: string;
  message: string;
  isAdmin: boolean;
  createdAt: string;
}

export interface TicketListItem {
  id: string;
  subject: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  rider: {
    id: string;
    email: string;
    name: string | null;
    phone: string | null;
    driverProfile: { driverCode: string; category: string } | null;
  };
  business: { id: string; name: string; slug: string } | null;
  lastMessage: SupportMessage | null;
}

export interface TicketDetail {
  id: string;
  subject: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  rider: {
    id: string;
    email: string;
    name: string | null;
    phone: string | null;
    driverProfile: { driverCode: string; category: string } | null;
  };
  business: { id: string; businessName: string; slug: string; status: string } | null;
  messages: SupportMessage[];
}

// ---- Resources ----
export interface Resource {
  id: string;
  name: string;
  description: string | null;
  type: string;
}

// ---- Settings ----
export interface PlatformSettings {
  platform: Record<string, unknown>;
  notifications: Record<string, unknown>;
  legalCompliance: Record<string, unknown>;
}

export type SettingKey = "platform" | "notifications" | "legalCompliance";

// ---- Admin users ----
export interface AdminUser {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  role: string;
  isVerified: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
  business: { id: string; businessName: string; slug: string; status: string } | null;
  purchase: {
    basePurchased: boolean;
    addonPurchased: boolean;
    paidState: string | null;
    purchaseDate: string | null;
  };
}

// ---- Recent drivers (dashboard) ----
export interface RecentDriver {
  id: string;
  driverCode: string;
  category: string;
  userId: string;
  email: string;
  name: string | null;
  phone: string | null;
  status: string;
  isVerified: boolean;
  registrationDate: string;
  serviceArea: string | null;
  business: BusinessListItem | null;
}

// ---- Constants (frontend) ----
export const USER_ROLES = ["admin", "rider"] as const;
export const USER_STATUSES = ["active", "pending", "suspended"] as const;
export const BUSINESS_STATUSES = ["NOT_STARTED", "IN_PROGRESS", "COMPLETED", "ACTIVE", "SUSPENDED"] as const;
export const PAYMENT_STATUSES = ["pending", "paid", "failed", "expired"] as const;
export const DRIVER_CATEGORIES = ["WOMEN", "COUPLE", "FIFTY_PLUS", "STANDARD", "SPANISH"] as const;
export const DRIVER_VERIFICATION_STATUSES = ["PENDING", "UNDER_REVIEW", "APPROVED", "REJECTED"] as const;
export const TICKET_STATUSES = ["PENDING", "UNDER_REVIEW", "COMPLETED"] as const;
export const PURCHASE_TYPES = ["SETUP_PAYMENT", "ADDON_PAYMENT"] as const;

// ---- Leads ----
export type LeadSourcePage = "main" | "senior" | "women" | "couple" | "spanish";
export type LeadStatus = "NEW" | "CONTACTED" | "CONVERTED" | "SPAM";

export interface AdminLeadFilters {
  page?: number;
  limit?: number;
  search?: string;
  sourcePage?: LeadSourcePage | string;
  status?: LeadStatus | string;
  from?: string;
  to?: string;
}

export type AdminLeadExportFilters = Omit<AdminLeadFilters, "page" | "limit">;

/** Accepts the documented filter values; string fields also support existing callers. */
export type AdminLeadQueryArgs = AdminLeadFilters | {
  page: number;
  limit: number;
  search?: string;
  sourcePage?: string;
  status?: string;
  from?: string;
  to?: string;
};

export type AdminLeadExportQueryArgs = AdminLeadExportFilters | {
  search?: string;
  sourcePage?: string;
  status?: string;
  from?: string;
  to?: string;
};

export interface Lead {
  id: string;
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
  smsConsent: boolean;
  consentedAt?: string;
  consentTextVersion: string;
  submittedAt: string;
  updatedAt: string;
  ipAddress: string | null;
  userAgent: string | null;
  status: LeadStatus;
}

export interface AdminLeadsResponse {
  success: true;
  leads: Lead[];
  pagination: Pagination;
}

export type AdminLead = Lead;

export interface AdminLeadResponse {
  success: true;
  lead: Lead;
}

export interface UpdateAdminLeadStatusRequest {
  id: string;
  status: LeadStatus;
}

export interface DeleteAdminLeadResponse {
  success: true;
  message: string;
}
