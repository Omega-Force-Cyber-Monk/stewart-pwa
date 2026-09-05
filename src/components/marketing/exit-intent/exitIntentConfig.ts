export const EXIT_INTENT_ROUTES = ["/", "/senior", "/women", "/couple", "/spanish"] as const;

export type ExitIntentRoute = (typeof EXIT_INTENT_ROUTES)[number];
export type ExitIntentSourcePage = "main" | "senior" | "women" | "couple" | "spanish";
export type ExitIntentLocale = "en" | "es";

export type ExitIntentRouteConfig = {
  sourcePage: ExitIntentSourcePage;
  locale: ExitIntentLocale;
  headline: string;
  subhead: string;
  submitLabel: string;
  microcopy: string;
  fields: ("name" | "email" | "phone" | "city")[];
  theme: {
    iconBg: string;
    buttonBg: string;
  };
};

export const exitIntentConfig: Record<ExitIntentRoute, ExitIntentRouteConfig> = {
  "/": {
    sourcePage: "main",
    locale: "en",
    headline: "Not Ready to Commit Yet?",
    subhead: "Get the free Airport Permit & Licensing Checklist for your city — know exactly what it takes before you spend a dollar.",
    submitLabel: "Send Me The Checklist",
    microcopy: "No spam. Just the real requirements, straight to your phone.",
    fields: ["phone", "city"],
    theme: {
      iconBg: "bg-[#04B5A3]",
      buttonBg: "bg-[#04B5A3] hover:bg-[#039e8f]",
    },
  },
  "/senior": {
    sourcePage: "senior",
    locale: "en",
    headline: "Get Your FREE 50+ Quick Start Guide Now!",
    subhead: "Practical steps. Proven strategies. Freedom on your terms.",
    submitLabel: "Send Me the FREE 50+ Guide",
    microcopy: "No spam. Just real help to start your business.",
    fields: ["phone", "city"],
    theme: {
      iconBg: "bg-[#39b54a]",
      buttonBg: "bg-[#39b54a] hover:bg-[#2e993b]",
    },
  },
  "/couple": {
    sourcePage: "couple",
    locale: "en",
    headline: "Your FREE Couples Quick Start Guide Is Waiting!",
    subhead: "Practical steps. Real strategies. Build a business together.",
    submitLabel: "Send Us the FREE Couples Guide",
    microcopy: "No spam. Just real help to build your business together.",
    fields: ["phone", "city"],
    theme: {
      iconBg: "bg-[#005deb]",
      buttonBg: "bg-[#c79123] hover:bg-[#a6781c]",
    },
  },
  "/women": {
    sourcePage: "women",
    locale: "en",
    headline: "Your Free Guide Is Just a Few Clicks Away!",
    subhead: "Actionable tips. Real strategies. Freedom on your terms.",
    submitLabel: "Send Me the Free Women's Guide",
    microcopy: "No spam. Just real help to get you started.",
    fields: ["phone", "city"],
    theme: {
      iconBg: "bg-[#005deb]",
      buttonBg: "bg-[#f42661] hover:bg-[#d91950]",
    },
  },
  "/spanish": {
    sourcePage: "spanish",
    locale: "es",
    headline: "ENVÍAME GRATIS LA GUÍA RÁPIDA PARA EMPEZAR",
    subhead: "Pasos prácticos. Estrategias reales. Resultados que puedes lograr.",
    submitLabel: "ENVÍAME LA GUÍA GRATIS",
    microcopy: "Tu información está segura. No enviamos spam.",
    fields: ["name", "phone", "email"],
    theme: {
      iconBg: "bg-[#2e8a38]",
      buttonBg: "bg-[#2e8a38] hover:bg-[#236e2b]",
    },
  },
};

export function getExitIntentConfig(pathname: string): ExitIntentRouteConfig | undefined {
  return exitIntentConfig[pathname as ExitIntentRoute];
}

export function isExitIntentRoute(pathname: string): pathname is ExitIntentRoute {
  return EXIT_INTENT_ROUTES.includes(pathname as ExitIntentRoute);
}
