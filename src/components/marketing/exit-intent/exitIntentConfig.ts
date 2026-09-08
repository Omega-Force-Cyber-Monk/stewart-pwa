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
    headline: "Before You Start — Get the Launch Checklist",
    subhead: "Get the free private transportation launch checklist for your city before you spend a dollar.",
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
    headline: "Get Your FREE 50+ Launch Checklist",
    subhead: "Setup steps, insurance notes, and a realistic transition timeline.",
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
    headline: "Your FREE Couples Launch Guide Is Waiting",
    subhead: "Split roles, set a shared schedule, and start at your pace.",
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
    headline: "Get Your FREE Safety & Trust Guide",
    subhead: "Practical steps to build a professional, safe operation from day one.",
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
    headline: "ENVÍAME GRATIS LA GUÍA RÁPIDA",
    subhead: "Pasos prácticos para empezar tu negocio de transporte privado.",
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
