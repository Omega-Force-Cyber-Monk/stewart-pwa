import type { FunnelType } from "../appFlow/appFlowSlice";

export type FunnelContent = {
  eyebrow: string;
  headline: string;
  description: string;
  price: string;
  audience: string;
};

export const funnelContent: Record<FunnelType, FunnelContent> = {
  standard: {
    eyebrow: "Independent driver launch",
    headline: "Build your transportation business beyond the app.",
    description:
      "A guided launch path for drivers who want direct clients, cleaner operations, and a business they control.",
    price: "$297",
    audience: "For rideshare, delivery, and private transport operators.",
  },
  women: {
    eyebrow: "Women-led transportation",
    headline: "Launch a safer, sharper private transportation offer.",
    description:
      "Position your service for trust, repeat clients, and professional local demand.",
    price: "$297",
    audience: "For women drivers building a private client base.",
  },
  seniors: {
    eyebrow: "Senior mobility service",
    headline: "Create a reliable transportation service for older adults.",
    description:
      "Package your route, scheduling, and local outreach around dependable senior mobility.",
    price: "$297",
    audience: "For drivers serving families, caregivers, and senior communities.",
  },
  couples: {
    eyebrow: "Couples business launch",
    headline: "Turn two operators into one coordinated transportation brand.",
    description:
      "Map roles, offers, client intake, and launch assets for a family-run transportation business.",
    price: "$397",
    audience: "For couples launching together.",
  },
};
