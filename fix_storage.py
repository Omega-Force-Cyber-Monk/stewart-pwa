with open("src/lib/storage.ts", "r") as f:
    content = f.read()

addition = """
  marketingSessionId: `stewart-pwa:marketingSessionId`,
  marketingAttribution: `stewart-pwa:marketingAttribution`,
  marketingConsumed: `stewart-pwa:marketingConsumed`,
  marketingSuppressed: `stewart-pwa:marketingSuppressed`,
"""
content = content.replace("abandonedCheckout: `${storagePrefix}:abandonedCheckout`,", "abandonedCheckout: `${storagePrefix}:abandonedCheckout`," + addition)

addition2 = """

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
"""

content = content.replace("export function readStorageValue", addition2 + "export function readStorageValue")

with open("src/lib/storage.ts", "w") as f:
    f.write(content)

