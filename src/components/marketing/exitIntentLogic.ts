import type { ExitIntentRoute } from "./exitIntentConfig.ts";
import { isExitIntentRoute } from "./exitIntentConfig.ts";
import {
  isMarketingConsumed,
  isMarketingSuppressed,
  markMarketingConsumed,
  markMarketingSuppressed,
  type MarketingAttribution,
  writeMarketingAttribution,
} from "../../lib/storage.ts";
export const CONSENT_TEXT_VERSION = "sms-consent-v1" as const;
export const ENGLISH_CONSENT_TEXT = "I agree to receive text messages related to my request.";
export const SPANISH_CONSENT_TEXT = "Acepto recibir mensajes de texto relacionados con mi solicitud.";

export function canShowExitIntent(): boolean {
  return !isMarketingConsumed() && !isMarketingSuppressed();
}

export function consumeExitIntent(): void {
  markMarketingConsumed();
}

export function suppressExitIntent(): void {
  markMarketingSuppressed();
}

export function isEligibleExitIntentPath(pathname: string): pathname is ExitIntentRoute {
  return isExitIntentRoute(pathname);
}

export function isDesktopExitIntent(event: Pick<MouseEvent, "clientY">): boolean {
  return event.clientY <= 0;
}

export function isMobileExitIntentVisible(intersectionRatio: number): boolean {
  return intersectionRatio > 0;
}

export type ExitIntentAttributionInput = {
  sourcePage: MarketingAttribution["sourcePage"];
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  utmTerm?: string | null;
  utmContent?: string | null;
  referrer?: string | null;
};

export function overwriteLastTouchAttribution(input: ExitIntentAttributionInput): MarketingAttribution {
  const attribution: MarketingAttribution = {
    sourcePage: input.sourcePage,
    utmSource: input.utmSource ?? "",
    utmMedium: input.utmMedium ?? "",
    utmCampaign: input.utmCampaign ?? "",
    utmTerm: input.utmTerm ?? "",
    utmContent: input.utmContent ?? "",
    referrer: input.referrer ?? "",
  };
  writeMarketingAttribution(attribution);
  return attribution;
}

export function normalizePhone(value: string): string | null {
  const digits = value.replace(/\D/g, "");

  const tenDigits =
    digits.length === 11 && digits.startsWith("1")
      ? digits.slice(1)
      : digits;

  const isValidUsPhone = /^[2-9]\d{2}[2-9]\d{6}$/.test(tenDigits);

  return isValidUsPhone ? tenDigits : null;
}

export function normalizeCity(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}

export function normalizeConsent(value: boolean): true | null {
  return value ? true : null;
}export function isCoarsePointer(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
}
