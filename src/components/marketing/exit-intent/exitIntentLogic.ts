import type { ExitIntentRoute } from "./exitIntentConfig";
import { isExitIntentRoute } from "./exitIntentConfig";
import { readSessionStorageValue, writeSessionStorageValue, storageKeys } from "../../../lib/storage";

export const CONSENT_TEXT_VERSION = "sms-consent-v1" as const;
export const ENGLISH_GUIDE_CONSENT_TEXT =
  "I agree to receive the requested QuitTheApp Quick Start Guide by text message at the phone number provided. Message and data rates may apply.";
export const ENGLISH_MARKETING_CONSENT_TEXT =
  "I agree to receive occasional marketing and promotional text messages from QuitTheApp. Consent is not a condition of purchase. Message frequency may vary. Reply STOP to opt out.";
export const SPANISH_GUIDE_CONSENT_TEXT =
  "Acepto recibir la Guia Rapida solicitada de QuitTheApp por mensaje de texto al numero de telefono proporcionado. Pueden aplicarse tarifas de mensajes y datos.";
export const SPANISH_MARKETING_CONSENT_TEXT =
  "Acepto recibir mensajes de texto ocasionales de marketing y promociones de QuitTheApp. El consentimiento no es una condicion de compra. La frecuencia de mensajes puede variar. Responde STOP para cancelar.";

export function canShowExitIntent(): boolean {
  return !readSessionStorageValue(storageKeys.exitIntentShown);
}

export function consumeExitIntent(): void {
  writeSessionStorageValue(storageKeys.exitIntentShown, "true");
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
