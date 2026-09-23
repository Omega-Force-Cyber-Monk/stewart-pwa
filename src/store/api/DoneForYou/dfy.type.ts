import type { Pagination } from "../Admin/admin.type";

export type DfyOrderStatus = "PENDING" | "IN_PROGRESS" | "IN_REVIEW" | "READY" | "PUBLISHED";
export type DfyDeliverableStatus = "NOT_STARTED" | "IN_PROGRESS" | "IN_REVIEW" | "COMPLETED" | "PUBLISHED";
export type DfyAssetType = "IMAGE" | "VIDEO" | "DOCUMENT" | "ARCHIVE" | "LINK" | "TEXT";
export type DfyBrandApprovalStatus = "NOT_SELECTED" | "SELECTED" | "UPLOADED" | "APPROVED";

export interface DfyLogoStyle {
  id: string;
  key: string;
  name: string;
  previewUrl: string | null;
  isShared?: boolean;
  audience?: string | null;
  active: boolean;
  displayOrder: number;
}

export interface DfyAsset {
  id: string;
  deliverableId?: string | null;
  brandProfileId?: string | null;
  assetType: DfyAssetType;
  title: string;
  fileUrl: string | null;
  linkUrl: string | null;
  textContent: string | null;
  mimeType: string | null;
  fileSize: number | null;
  displayOrder: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DfyBrandProfile {
  approvalStatus: DfyBrandApprovalStatus;
  selectedLogoStyle: DfyLogoStyle | null;
  approvedLogo?: DfyAsset | null;
  approvedLogoAsset?: DfyAsset | null;
  approvedAt: string | null;
  assets?: DfyAsset[];
}

export interface DfyDeliverable {
  id: string;
  key: string;
  title: string;
  description: string | null;
  status: DfyDeliverableStatus | DfyOrderStatus;
  displayOrder: number;
  productionNotes?: string | null;
  reviewNotes?: string | null;
  updatedAt?: string;
  assets: DfyAsset[];
}

export interface DfyTemplate {
  id: string;
  deliverableKey: string;
  name: string;
  type: string;
  sourceUrl: string | null;
  previewUrl: string | null;
  active: boolean;
}

export interface DfyTemplateSet {
  id: string;
  name: string;
  audience: string;
  active: boolean;
  templates: DfyTemplate[];
}

export interface DfyReadinessBlocker {
  deliverableKey?: string;
  deliverableTitle?: string;
  message: string;
}

export interface DfyReadiness {
  ready: boolean;
  blockers: DfyReadinessBlocker[];
}

export interface CustomerDfyOrder {
  id: string;
  status: DfyOrderStatus;
  audience: string;
  publishedAt: string | null;
  business: {
    id: string;
    name: string;
    slug: string;
    logoUrl: string | null;
    category: string;
    themeKey?: string;
    serviceArea?: { cityArea: string | null; airports: string[] } | null;
    acuityConnection?: { status: string; bookingUrl: string | null } | null;
    referralCard?: {
      websiteUrl: string | null;
      qrCodeUrl: string | null;
      digitalCardUrl: string | null;
      printCardUrl: string | null;
    } | null;
  };
  brand: DfyBrandProfile | null;
  deliverables: DfyDeliverable[];
}

export interface CustomerDfyResponse {
  success: true;
  access: {
    ownsDoneForYou: boolean;
    status: DfyOrderStatus | "LOCKED";
  };
  deliverableCatalog?: Array<{
    key: string;
    title: string;
    description: string;
    displayOrder: number;
    active: boolean;
    requiredAssets?: Array<{ assetType: DfyAssetType; minimumCount: number }>;
    requiresApprovedLogo?: boolean;
  }>;
  logoStyles: DfyLogoStyle[];
  order: CustomerDfyOrder | null;
}

export interface AdminDfyOrderListItem {
  id: string;
  status: DfyOrderStatus;
  audience: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  user: { id: string; email: string; name: string | null; phone: string | null };
  business: { id: string; businessName: string; slug: string };
  brandProfile: DfyBrandProfile | null;
  deliverables: Array<{ id: string; key: string; status: DfyDeliverableStatus }>;
  templateSet: DfyTemplateSet | null;
}

export interface AdminDfyOrder extends Omit<AdminDfyOrderListItem, "business" | "user" | "brandProfile" | "deliverables"> {
  payment: { id: string; paidAt: string | null; createdAt: string; items: Array<{ id: string; name: string; type: string; quantity: number }> };
  business: AdminDfyOrderListItem["business"] & {
    email: string | null;
    phone: string | null;
    businessInfo: string | null;
    logoUrl: string | null;
    setup?: { buyerFullName: string | null; buyerEmail: string | null; buyerPhone: string | null } | null;
    serviceArea?: { cityArea: string | null; airports: string[] } | null;
    acuityConnection?: { status: string; bookingUrl: string | null } | null;
    referralCard?: { websiteUrl: string | null; qrCodeUrl: string | null; digitalCardUrl: string | null; printCardUrl: string | null } | null;
  };
  user: AdminDfyOrderListItem["user"] & { driverProfile?: { category: string; driverCode: string } | null };
  brandProfile: (DfyBrandProfile & { assets?: DfyAsset[] }) | null;
  deliverables: DfyDeliverable[];
  readiness: DfyReadiness;
  productionContext: {
    customerName: string | null;
    email: string;
    phone: string | null;
    businessName: string;
    businessInfo: string | null;
    businessSetup?: { buyerFullName: string | null; buyerEmail: string | null; buyerPhone: string | null } | null;
    category: string;
    audienceKey?: string;
    serviceArea: { cityArea: string | null; airports: string[] } | null;
    airportsServed: string[];
    websiteSlug: string;
    websiteUrl?: string;
    bookingUrl: string | null;
    contact?: {
      businessEmail: string | null;
      businessPhone: string | null;
      customerEmail: string | null;
      customerPhone: string | null;
      buyerEmail: string | null;
      buyerPhone: string | null;
    };
    referralCard: { websiteUrl: string | null; qrCodeUrl: string | null; digitalCardUrl: string | null; printCardUrl: string | null } | null;
    approvedLogo: DfyAsset | null;
  };
}

export interface AdminDfyOrdersResponse {
  success: true;
  orders: AdminDfyOrderListItem[];
  pagination: Pagination;
}

export interface AdminDfyOrderResponse {
  success: true;
  order: AdminDfyOrder;
}
