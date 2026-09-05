import type { ExitIntentRoute } from "./exitIntentConfig";
import { isExitIntentRoute } from "./exitIntentConfig";
import { readStorageValue, writeStorageValue, storageKeys } from "../../../lib/storage";

export const CONSENT_TEXT_VERSION = "sms-consent-v1" as const;
export const ENGLISH_CONSENT_TEXT = "I agree to receive helpful tips and resources.";
export const SPANISH_CONSENT_TEXT = "Acepto recibir consejos útiles y recursos para ayudarme a empezar mi negocio.";

export function canShowExitIntent(): boolean {
  return !readStorageValue(storageKeys.exitIntentShown);
}

export function consumeExitIntent(): void {
  writeStorageValue(storageKeys.exitIntentShown, "true");
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

export function normalizePhone(value: string): string | null {
  if (!/^[\d\s().-]+$/.test(value)) return null;
  const digits = value.replace(/[\s().-]/g, "");
  return /^\d{10}$/.test(digits) ? `+1${digits}` : null;
}

export function normalizeCity(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}

export function normalizeConsent(value: boolean): true | null {
  return value ? true : null;
}
