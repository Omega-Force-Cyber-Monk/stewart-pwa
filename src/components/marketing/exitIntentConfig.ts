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
    headline: "Not Ready to Commit Yet?",
    subhead: "Get the free Airport Permit & Licensing Checklist for your city — know exactly what it takes before you spend a dollar.",
    submitLabel: "Send Me The Checklist",
    microcopy: "No spam. Just the real requirements, straight to your phone.",
  },
  "/senior": {
    sourcePage: "senior",
    locale: "en",
    headline: "Before You Decide — Know What It Really Takes",
    subhead: "Get the free checklist on airport permits, insurance, and what a real transition timeline looks like — built for drivers who want to do this right, not rush it.",
    submitLabel: "Send Me The Checklist",
    microcopy: "No spam. Just the real requirements, straight to your phone.",
  },
  "/women": {
    sourcePage: "women",
    locale: "en",
    headline: "Before You Start — Get the Safety & Trust Checklist",
    subhead: "Free guide: how to vet routes, screen ride requests, and build a professional, safe operation from day one.",
    submitLabel: "Send Me The Checklist",
    microcopy: "No spam. Just the real requirements, straight to your phone.",
  },
  "/couple": {
    sourcePage: "couple",
    locale: "en",
    headline: "Building This Together? Start Here First.",
    subhead: "Free guide: How to split roles, set a shared schedule, and avoid the most common mistakes couples make launching together.",
    submitLabel: "Send Me The Guide",
    microcopy: "No spam. Just the real requirements, straight to your phone.",
  },
  "/spanish": {
    sourcePage: "spanish",
    locale: "es",
    headline: "Antes de Invertir — Mira Cómo Otros Construyeron Esto",
    subhead: "Guía gratis: cómo operadores reales construyeron un negocio de transporte al aeropuerto que su familia puede heredar — sin apps, sin comisiones.",
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
