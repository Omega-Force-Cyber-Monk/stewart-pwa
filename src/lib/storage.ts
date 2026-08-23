const storagePrefix = "quittheapp";

export const storageKeys = {
  appFlowState: `${storagePrefix}:appFlowState`,
  abandonedCheckout: `${storagePrefix}:abandonedCheckout`,
  marketingSessionId: `${storagePrefix}:marketingSessionId`,
  marketingAttribution: `${storagePrefix}:marketingAttribution`,
  marketingConsumed: `${storagePrefix}:marketingConsumed`,
  marketingSuppressed: `${storagePrefix}:marketingSuppressed`,
} as const;

export type MarketingAttribution = {
  sourcePage: "main" | "senior" | "women" | "couple" | "spanish";
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm: string;
  utmContent: string;
  referrer: string;
};

export function readSessionStorageValue(key: string): string | null {
  if (typeof window === "undefined") return null;

  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeSessionStorageValue(key: string, value: string): void {
  if (typeof window === "undefined") return;

  try {
    window.sessionStorage.setItem(key, value);
  } catch {
    // Session persistence is non-critical for this frontend.
  }
}

export function removeSessionStorageValue(key: string): void {
  if (typeof window === "undefined") return;

  try {
    window.sessionStorage.removeItem(key);
  } catch {
    // Ignore storage failures.
  }
}

function createOpaqueSessionId(): string {
  const cryptoApi = globalThis.crypto;
  if (cryptoApi?.randomUUID) return cryptoApi.randomUUID();
  if (cryptoApi?.getRandomValues) {
    const bytes = new Uint8Array(16);
    cryptoApi.getRandomValues(bytes);
    return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
  }
  throw new Error("Secure random session IDs are unavailable in this browser.");
}

export function getOrCreateMarketingSessionId(): string {
  const existing = readSessionStorageValue(storageKeys.marketingSessionId);
  if (existing) return existing;
  const sessionId = createOpaqueSessionId();
  writeSessionStorageValue(storageKeys.marketingSessionId, sessionId);
  return sessionId;
}

export function readMarketingAttribution(): MarketingAttribution | null {
  const value = readSessionStorageValue(storageKeys.marketingAttribution);
  if (!value) return null;
  try {
    return JSON.parse(value) as MarketingAttribution;
  } catch {
    return null;
  }
}

export function writeMarketingAttribution(attribution: MarketingAttribution): void {
  writeSessionStorageValue(storageKeys.marketingAttribution, JSON.stringify(attribution));
}

export function isMarketingConsumed(): boolean {
  return readSessionStorageValue(storageKeys.marketingConsumed) === "1";
}

export function markMarketingConsumed(): void {
  writeSessionStorageValue(storageKeys.marketingConsumed, "1");
}

export function isMarketingSuppressed(): boolean {
  return readSessionStorageValue(storageKeys.marketingSuppressed) === "1";
}

export function markMarketingSuppressed(): void {
  writeSessionStorageValue(storageKeys.marketingSuppressed, "1");
}

export function readStorageValue(key: string) {
  if (typeof window === "undefined") return null;

  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeStorageValue(key: string, value: string) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Persistence is helpful but non-critical for this frontend-only demo.
  }
}

export function removeStorageValue(key: string) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.removeItem(key);
  } catch {
    // Ignore storage failures so reset never blocks navigation.
  }
}
