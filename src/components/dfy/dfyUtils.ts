import type {
  CustomerDfyOrder,
  DfyAsset,
  DfyBrandProfile,
  DfyDeliverable,
  DfyOrderStatus,
} from "../../store/api/DoneForYou/dfy.type";

/** Customer-facing DFY journey statuses (spec §3 Section 1). */
export type CustomerDfyJourneyStatus =
  | "CHOOSE_LOGO"
  | "LOGO_BEING_PREPARED"
  | "PREPARING_KIT"
  | "READY";

export const DFY_CUSTOMER_GRAPHICS_KEY = "social_media_starter_content";
export const DFY_CUSTOMER_VIDEOS_KEY = "personalized_launch_videos";
export const DFY_CUSTOMER_CAPTIONS_KEY = "text_customer_response_templates";

export function formatDfyStatus(status: string) {
  return status
    .toLowerCase()
    .split("_")
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(" ");
}

export function customerJourneyLabel(status: CustomerDfyJourneyStatus) {
  switch (status) {
    case "CHOOSE_LOGO":
      return "Choose Your Logo";
    case "LOGO_BEING_PREPARED":
      return "Logo Being Prepared";
    case "PREPARING_KIT":
      return "Preparing Your Marketing Kit";
    case "READY":
      return "Ready";
  }
}

export function customerJourneyDescription(status: CustomerDfyJourneyStatus) {
  switch (status) {
    case "CHOOSE_LOGO":
      return "Pick one of the five logo styles for your business. Your team will personalize it next.";
    case "LOGO_BEING_PREPARED":
      return "We've saved your style choice. Your personalized logo is being prepared.";
    case "PREPARING_KIT":
      return "Your final logo is ready. We're building your marketing graphics, videos, and captions.";
    case "READY":
      return "Your Done For You marketing kit is ready to download and use.";
  }
}

export function customerJourneyTone(
  status: CustomerDfyJourneyStatus,
): "success" | "warning" | "accent" | "neutral" {
  if (status === "READY") return "success";
  if (status === "CHOOSE_LOGO") return "warning";
  if (status === "PREPARING_KIT") return "accent";
  return "neutral";
}

export function hasApprovedFinalLogo(brand: DfyBrandProfile | null | undefined) {
  if (!brand || brand.approvalStatus !== "APPROVED") return false;
  return Boolean(brand.approvedLogo?.fileUrl || brand.approvedLogoAsset?.fileUrl);
}

export function resolveCustomerDfyJourneyStatus(
  order: CustomerDfyOrder,
): CustomerDfyJourneyStatus {
  const brand = order.brand;
  const hasStyle = Boolean(brand?.selectedLogoStyle);
  const approved = hasApprovedFinalLogo(brand);
  const ready =
    Boolean(order.publishedAt) ||
    order.status === "READY" ||
    order.status === "PUBLISHED" ||
    order.fulfillment?.state === "READY";

  if (ready) return "READY";
  if (approved) return "PREPARING_KIT";
  if (hasStyle) return "LOGO_BEING_PREPARED";
  return "CHOOSE_LOGO";
}

export function findCustomerDeliverable(
  deliverables: DfyDeliverable[],
  key: string,
) {
  return deliverables.find((item) => item.key === key) ?? null;
}

export function assetUrl(asset: DfyAsset) {
  return asset.fileUrl || asset.linkUrl || "";
}

export function isVideoAsset(asset: DfyAsset) {
  return asset.assetType === "VIDEO" || asset.mimeType?.startsWith("video/");
}

export function isImageAsset(asset: DfyAsset) {
  return asset.assetType === "IMAGE" || asset.mimeType?.startsWith("image/");
}

export function orderTone(status: DfyOrderStatus | string) {
  if (status === "PUBLISHED" || status === "READY") return "success";
  if (status === "IN_REVIEW") return "accent";
  if (status === "PENDING") return "warning";
  return "neutral";
}

export function downloadAsset(asset: DfyAsset) {
  const url = assetUrl(asset);
  if (!url) return;
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = asset.title || "done-for-you-asset";
  anchor.target = "_blank";
  anchor.rel = "noopener noreferrer";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
}

export function formatDate(value?: string | null) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

