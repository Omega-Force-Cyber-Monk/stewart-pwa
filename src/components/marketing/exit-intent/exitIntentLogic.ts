import type { ExitIntentRoute } from "./exitIntentConfig";
import { isExitIntentRoute } from "./exitIntentConfig";
import { readStorageValue, writeStorageValue, storageKeys } from "../../../lib/storage";

export const CONSENT_TEXT_VERSION = "sms-consent-v1" as const;
export const ENGLISH_CONSENT_TEXT = "I agree to receive text messages related to my request.";
export const SPANISH_CONSENT_TEXT = "Acepto recibir mensajes de texto relacionados con mi solicitud.";

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

export function normalizeUsPhone(value: string): string {
  let digits = value.replace(/\D/g, "");

  if (digits.length === 11 && digits.startsWith("1")) {
    digits = digits.slice(1);
  }

  if (!/^[2-9]\d{2}[2-9]\d{6}$/.test(digits)) {
    throw new Error("Enter a valid 10-digit US phone number.");
  }

  return digits;
}

export function normalizePhone(value: string): string | null {
  try {
    return normalizeUsPhone(value);
  } catch {
    return null;
  }
}

export function normalizeCity(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}

export function normalizeConsent(value: boolean): true | null {
  return value ? true : null;
}
