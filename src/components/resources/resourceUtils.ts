import type { BusinessResource, ResourceType } from "../../store/api/Business/business.type";

export function normalizedType(resource: BusinessResource): ResourceType {
  const type = resource.type.toLowerCase();
  if (type.includes("video")) return "video";
  if (type.includes("link")) return "link";
  if (type.includes("guide")) return "guide";
  return "pdf";
}
