import type {
  CustomerDfyOrder,
  DfyAsset,
  DfyDeliverable,
  DfyOrderStatus,
} from "../../store/api/DoneForYou/dfy.type";

/** Customer-facing DFY journey (no custom logo workflow). */
export type CustomerDfyJourneyStatus = "PREPARING_KIT" | "READY";

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
    case "PREPARING_KIT":
      return "Preparing Your Marketing Package";
    case "READY":
      return "Ready";
  }
}

export function customerJourneyDescription(status: CustomerDfyJourneyStatus) {
  switch (status) {
    case "PREPARING_KIT":
      return "We're assembling your audience graphics, videos, and templates. This page updates automatically.";
    case "READY":
      return "Your Done For You marketing package is ready to download and use.";
  }
}

export function customerJourneyTone(
  status: CustomerDfyJourneyStatus,
): "success" | "warning" | "accent" | "neutral" {
  if (status === "READY") return "success";
  return "accent";
}

export function resolveCustomerDfyJourneyStatus(
  order: CustomerDfyOrder,
): CustomerDfyJourneyStatus {
  const ready =
    Boolean(order.publishedAt) ||
    order.status === "READY" ||
    order.status === "PUBLISHED" ||
    order.fulfillment?.state === "READY";

  return ready ? "READY" : "PREPARING_KIT";
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

function textKind(asset: DfyAsset): "caption" | "response" | "usage" {
  const metadata =
    asset.metadata && typeof asset.metadata === "object"
      ? (asset.metadata as Record<string, unknown>)
      : {};
  const kind = typeof metadata.contentKind === "string" ? metadata.contentKind : "";
  if (kind === "caption" || kind === "ready_to_post") return "caption";
  if (kind === "response" || kind === "template") return "response";
  if (kind === "usage" || kind === "instruction") return "usage";

  const title = (asset.title || "").toLowerCase();
  if (title.includes("instruction") || title.includes("post branded") || title.includes("share the three")) {
    return "usage";
  }
  if (title.includes("reply") || title.includes("response") || title.includes("confirmation")) {
    return "response";
  }
  if (title.includes("caption")) return "caption";
  // Default seeded operational text → usage (not inventing ready-to-post copy).
  return "usage";
}

/** Split TEXT deliverable assets into copy categories without inventing content. */
export function partitionTextAssets(assets: DfyAsset[]) {
  const readyToPost: DfyAsset[] = [];
  const responseTemplates: DfyAsset[] = [];
  const usageInstructions: DfyAsset[] = [];
  for (const asset of assets) {
    if (asset.assetType !== "TEXT" && !asset.textContent) {
      usageInstructions.push(asset);
      continue;
    }
    const kind = textKind(asset);
    if (kind === "caption") readyToPost.push(asset);
    else if (kind === "response") responseTemplates.push(asset);
    else usageInstructions.push(asset);
  }
  return { readyToPost, responseTemplates, usageInstructions };
}
