import type { FunnelType } from "../appFlow/appFlowTypes";

export type FunnelTheme = {
  pageClassName: string;
  accentClassName: string;
  backgroundAccentClassName: string;
  badgeClassName: string;
  buttonClassName: string;
  cardClassName: string;
};

export type FunnelRouteConfig = {
  path: string;
  funnelType: FunnelType;
};

export type FunnelConfig = {
  key: FunnelType;
  routePath: string;
  audienceLabel: string;
  price: number;
  dfyUpgradePrice: number;
  theme: FunnelTheme;
  featureHighlights: string[];
  personaNotes: string[];
};
