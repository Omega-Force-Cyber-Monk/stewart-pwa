import type { Locale } from "../appFlow/appFlowSlice";

export const appCopy: Record<Locale, { checkout: string; onboarding: string }> = {
  en: {
    checkout: "Mock checkout",
    onboarding: "Onboarding intake",
  },
  es: {
    checkout: "Pago simulado",
    onboarding: "Formulario inicial",
  },
};
