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
};

export const exitIntentConfig: Record<ExitIntentRoute, ExitIntentRouteConfig> = {
  "/": {
    sourcePage: "main",
    locale: "en",
    headline: "Before You Start — Get the Launch Checklist",
    subhead: "Get the free private transportation launch checklist for your city before you spend a dollar.",
    submitLabel: "Send Me The Checklist",
    microcopy: "No spam. Just the real requirements, straight to your phone.",
  },
  "/senior": {
    sourcePage: "senior",
    locale: "en",
    headline: "Before You Decide — See the Launch Steps",
    subhead: "Get the free 50+ launch checklist with setup steps, insurance notes, and a realistic transition timeline.",
    submitLabel: "Send Me The Checklist",
    microcopy: "No spam. Just the real requirements, straight to your phone.",
  },
  "/women": {
    sourcePage: "women",
    locale: "en",
    headline: "Before You Start — Get the Safety Checklist",
    subhead: "Free guide: vet routes, screen ride requests, and build a professional, safe operation from day one.",
    submitLabel: "Send Me The Checklist",
    microcopy: "No spam. Just the real requirements, straight to your phone.",
  },
  "/couple": {
    sourcePage: "couple",
    locale: "en",
    headline: "Building This Together? Start Here.",
    subhead: "Free guide: split roles, set a shared schedule, and avoid common mistakes couples make launching together.",
    submitLabel: "Send Me The Guide",
    microcopy: "No spam. Just the real requirements, straight to your phone.",
  },
  "/spanish": {
    sourcePage: "spanish",
    locale: "es",
    headline: "Antes de Empezar — Recibe la Guía Rápida",
    subhead: "Guía gratis: pasos prácticos para empezar tu negocio de transporte privado sin depender de las apps.",
    submitLabel: "Enviarme la Guía",
    microcopy: "Sin spam. Soporte real en español, cuando lo necesites.",
  },
};

export function getExitIntentConfig(pathname: string): ExitIntentRouteConfig | undefined {
  return exitIntentConfig[pathname as ExitIntentRoute];
}

export function isExitIntentRoute(pathname: string): pathname is ExitIntentRoute {
  return EXIT_INTENT_ROUTES.includes(pathname as ExitIntentRoute);
}
