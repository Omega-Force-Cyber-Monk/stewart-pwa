import type { FunnelType } from "../appFlow/appFlowTypes";
import { funnelConfigs, funnelRouteConfigs } from "./funnelData";
import type { FunnelConfig } from "./funnelTypes";

export function getFunnelTypeFromPathname(pathname: string): FunnelType {
  if (pathname.startsWith("/women")) return "women";
  if (pathname.startsWith("/seniors")) return "seniors";
  if (pathname.startsWith("/couples")) return "couples";
  if (pathname.startsWith("/standard")) return "standard";

  return "standard";
}

export function getFunnelConfig(funnelType: FunnelType): FunnelConfig {
  return funnelConfigs[funnelType];
}

export function isFunnelRoute(pathname: string): boolean {
  return funnelRouteConfigs.some((config) => pathname.startsWith(config.path));
}
