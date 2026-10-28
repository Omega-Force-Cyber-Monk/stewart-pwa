import type { DfyAsset, DfyDeliverable, DfyOrderStatus } from "../../store/api/DoneForYou/dfy.type";

export function formatDfyStatus(status: string) {
  return status
    .toLowerCase()
    .split("_")
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(" ");
}

export function customerStatus(status: string) {
  return status === "READY" || status === "PUBLISHED" ? "Ready" : "In Progress";
}

export function customerFulfillmentLabel(state?: string | null) {
  switch (state) {
    case "AWAITING_LOGO":
      return "Awaiting Logo";
    case "PREPARING":
      return "Preparing";
    case "READY":
      return "Ready";
    case "NEEDS_ATTENTION":
      return "Needs Attention";
    default:
      return null;
  }
}

export function fulfillmentTone(state?: string | null) {
  if (state === "READY") return "success";
  if (state === "NEEDS_ATTENTION") return "danger";
  if (state === "AWAITING_LOGO") return "warning";
  if (state === "PREPARING") return "accent";
  return "neutral";
}

export function calculateDfyProgress(deliverables: DfyDeliverable[]) {
  if (deliverables.length === 0) return 0;
  const completed = deliverables.filter((item) => item.status === "READY" || item.status === "PUBLISHED" || item.status === "COMPLETED").length;
  return Math.round((completed / deliverables.length) * 100);
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

