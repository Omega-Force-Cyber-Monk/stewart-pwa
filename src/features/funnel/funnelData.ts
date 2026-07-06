import type { FunnelType } from "../appFlow/appFlowTypes";
import type { FunnelConfig, FunnelRouteConfig } from "./funnelTypes";

export const funnelRouteConfigs: FunnelRouteConfig[] = [
  { path: "/standard", funnelType: "standard" },
  { path: "/women", funnelType: "women" },
  { path: "/seniors", funnelType: "seniors" },
  { path: "/couple", funnelType: "couples" },
];

export const funnelConfigs: Record<FunnelType, FunnelConfig> = {
  standard: {
    key: "standard",
    routePath: "/standard",
    audienceLabel: "Independent Drivers",
    price: 495,
    dfyUpgradePrice: 245,
    theme: {
      pageClassName: "bg-slate-50 text-slate-950",
      accentClassName: "text-blue-700",
      backgroundAccentClassName: "bg-blue-50",
      badgeClassName: "border-blue-200 bg-blue-50 text-blue-800",
      buttonClassName: "bg-slate-950 text-white hover:bg-slate-800",
      cardClassName: "border-slate-200 bg-white shadow-sm",
    },
    featureHighlights: [
      "Own your customer list",
      "Set your private airport rates",
      "Stop losing margin to platform fees",
      "Build a direct booking workflow",
      "Launch with local outreach assets",
    ],
    personaNotes: [
      "For drivers ready to move beyond platform dependency.",
      "Emphasizes business ownership, margin, and direct bookings.",
      "Works as the default funnel when route detection is unknown.",
    ],
  },
  women: {
    key: "women",
    routePath: "/women",
    audienceLabel: "Women Drivers",
    price: 495,
    dfyUpgradePrice: 245,
    theme: {
      pageClassName: "bg-stone-50 text-stone-950",
      accentClassName: "text-rose-700",
      backgroundAccentClassName: "bg-rose-50",
      badgeClassName: "border-rose-200 bg-rose-50 text-rose-800",
      buttonClassName: "bg-rose-700 text-white hover:bg-rose-800",
      cardClassName: "border-stone-200 bg-white shadow-sm",
    },
    featureHighlights: [
      "Safety-first client positioning",
      "Trust-building service messaging",
      "Professional airport transfer setup",
      "Referral-ready private client offers",
      "Calm onboarding for first direct riders",
    ],
    personaNotes: [
      "For women drivers who want a safer, trust-forward private service.",
      "Messaging should feel calm, professional, and confidence-building.",
      "Useful for later pages focused on credibility and client safety.",
    ],
  },
  seniors: {
    key: "seniors",
    routePath: "/seniors",
    audienceLabel: "Drivers 50+",
    price: 495,
    dfyUpgradePrice: 245,
    theme: {
      pageClassName: "bg-white text-slate-950",
      accentClassName: "text-indigo-800",
      backgroundAccentClassName: "bg-indigo-50",
      badgeClassName: "border-indigo-300 bg-indigo-50 text-indigo-900",
      buttonClassName: "bg-indigo-800 text-white hover:bg-indigo-900",
      cardClassName: "border-slate-300 bg-white shadow-sm text-base",
    },
    featureHighlights: [
      "Simple setup steps",
      "Flexible post-retirement income",
      "Readable, low-stress launch system",
      "Senior mobility service positioning",
      "Clear outreach to families and caregivers",
    ],
    personaNotes: [
      "For experienced drivers who value clarity and low-stress execution.",
      "UI should stay readable, direct, and high contrast.",
      "Later copy can lean into reliability and life experience.",
    ],
  },
  couples: {
    key: "couples",
    routePath: "/couple",
    audienceLabel: "Couples & Family Operators",
    price: 495,
    dfyUpgradePrice: 245,
    theme: {
      pageClassName: "bg-amber-50 text-slate-950",
      accentClassName: "text-emerald-800",
      backgroundAccentClassName: "bg-emerald-50",
      badgeClassName: "border-emerald-200 bg-emerald-50 text-emerald-800",
      buttonClassName: "bg-emerald-800 text-white hover:bg-emerald-900",
      cardClassName: "border-amber-200 bg-white shadow-sm",
    },
    featureHighlights: [
      "Build a family-owned service",
      "Share operations and outreach",
      "Create a repeat rider asset",
      "Coordinate roles and schedules",
      "Package a local household brand",
    ],
    personaNotes: [
      "For couples or family members turning shared effort into a business.",
      "Tone should feel collaborative, practical, and warm.",
      "Future UI can emphasize role clarity and coordinated operations.",
    ],
  },
};
