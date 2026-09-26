import dfyMain from "../assets/dfy_main_upgrade.png";
import dfyWomen from "../assets/dfy_women_upgrade.png";
import dfySenior from "../assets/dfy_50_upgrade.png";
import dfyCouples from "../assets/dfy_couples_upgrade.png";
import dfySpanish from "../assets/dfy_spanish_upgrade.png";

export type SellingPageAudience = "main" | "women" | "50+" | "couples" | "spanish";

/**
 * Explicit audience-to-Done-For-You asset mapping.
 * Each selling page resolves to its approved $99 Done For You Upgrade preview.
 */
export const DFY_AUDIENCE_ASSET_MAP: Record<SellingPageAudience, string> = {
  main: dfyMain,
  women: dfyWomen,
  "50+": seniorDfyAsset(dfySenior),
  couples: dfyCouples,
  spanish: dfySpanish,
};

function seniorDfyAsset(asset: string): string {
  return asset;
}

export function getDfyUpgradeAsset(audience: SellingPageAudience): string {
  return DFY_AUDIENCE_ASSET_MAP[audience] || dfyMain;
}
