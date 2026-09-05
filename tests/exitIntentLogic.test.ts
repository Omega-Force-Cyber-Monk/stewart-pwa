import assert from "node:assert/strict";
import test from "node:test";
import { exitIntentConfig, isExitIntentRoute } from "../src/components/marketing/exitIntentConfig.ts";
import {
  isDesktopExitIntent,
  isMobileExitIntentVisible,
  normalizeCity,
  normalizeConsent,
  normalizePhone,
  normalizeUsPhone,
  overwriteLastTouchAttribution,
} from "../src/components/marketing/exitIntentLogic.ts";
import {
  getOrCreateMarketingSessionId,
  isMarketingConsumed,
  isMarketingSuppressed,
  markMarketingConsumed,
  markMarketingSuppressed,
  readMarketingAttribution,
  storageKeys,
} from "../src/lib/storage.ts";
import { areMarketingOverlaysVisible, setMarketingOverlayState } from "../src/lib/marketingOverlay.ts";

class MemoryStorage {
  private readonly values = new Map<string, string>();

  getItem(key: string): string | null {
    return this.values.get(key) ?? null;
  }

  setItem(key: string, value: string): void {
    this.values.set(key, value);
  }

  removeItem(key: string): void {
    this.values.delete(key);
  }

  clear(): void {
    this.values.clear();
  }
}

const sessionStorage = new MemoryStorage();
Object.defineProperty(globalThis, "window", {
  configurable: true,
  value: { sessionStorage },
});

function resetSession(): void {
  sessionStorage.clear();
}

test("only the five configured doorway routes are eligible", () => {
  assert.deepEqual(
    ["/", "/senior", "/women", "/couple", "/spanish"].map(isExitIntentRoute),
    [true, true, true, true, true],
  );
  assert.equal(isExitIntentRoute("/dashboard"), false);
  assert.equal(isExitIntentRoute("/unknown"), false);
});

test("doorway configuration contains the approved copy and locales", () => {
  assert.equal(exitIntentConfig["/"].sourcePage, "main");
  assert.equal(exitIntentConfig["/couple"].submitLabel, "Send Me The Guide");
  assert.equal(exitIntentConfig["/spanish"].locale, "es");
  assert.equal(exitIntentConfig["/spanish"].submitLabel, "Enviarme la Guía");
});

test("normalizes and validates US phone numbers with normalizeUsPhone and normalizePhone", () => {
  // Acceptance tests
  assert.equal(normalizeUsPhone("5125555789"), "5125555789");
  assert.equal(normalizeUsPhone("(512) 555-5789"), "5125555789");
  assert.equal(normalizeUsPhone("+1 512 555 5789"), "5125555789");
  assert.throws(() => normalizeUsPhone("1512555788"), /Enter a valid 10-digit US phone number\./);
  assert.throws(() => normalizeUsPhone("123"), /Enter a valid 10-digit US phone number\./);

  // normalizePhone wrapper tests
  assert.equal(normalizePhone("(415) 555-0134"), "4155550134");
  assert.equal(normalizePhone("415.555.0134"), "4155550134");
  assert.equal(normalizePhone("415-555-013"), null);
  assert.equal(normalizePhone("+1 415 555 0134"), "4155550134");
  assert.equal(normalizePhone("415-555-0134x9"), null);
});

test("normalizes city whitespace and requires affirmative consent", () => {
  assert.equal(normalizeCity("  San   Francisco  "), "San Francisco");
  assert.equal(normalizeCity("   "), "");
  assert.equal(normalizeConsent(true), true);
  assert.equal(normalizeConsent(false), null);
});

test("desktop and mobile trigger predicates match the contract", () => {
  assert.equal(isDesktopExitIntent({ clientY: 0 }), true);
  assert.equal(isDesktopExitIntent({ clientY: -1 }), true);
  assert.equal(isDesktopExitIntent({ clientY: 1 }), false);
  assert.equal(isMobileExitIntentVisible(0), false);
  assert.equal(isMobileExitIntentVisible(0.001), true);
});

test("session ID is created once under the exact key", () => {
  resetSession();
  const first = getOrCreateMarketingSessionId();
  const second = getOrCreateMarketingSessionId();
  assert.ok(first.length > 0);
  assert.equal(first, second);
  assert.equal(sessionStorage.getItem(storageKeys.marketingSessionId), first);
});

test("last-touch attribution overwrites every field including empty values", () => {
  resetSession();
  overwriteLastTouchAttribution({
    sourcePage: "women",
    utmSource: "newsletter",
    utmMedium: "email",
    utmCampaign: "spring",
    utmTerm: "airport",
    utmContent: "button",
    referrer: "https://example.com",
  });
  overwriteLastTouchAttribution({ sourcePage: "couple" });
  assert.deepEqual(readMarketingAttribution(), {
    sourcePage: "couple",
    utmSource: "",
    utmMedium: "",
    utmCampaign: "",
    utmTerm: "",
    utmContent: "",
    referrer: "",
  });
});

test("consumed and suppression state persists for the session", () => {
  resetSession();
  assert.equal(isMarketingConsumed(), false);
  assert.equal(isMarketingSuppressed(), false);
  markMarketingConsumed();
  markMarketingSuppressed();
  assert.equal(isMarketingConsumed(), true);
  assert.equal(isMarketingSuppressed(), true);
});

test("overlay state reports when an existing marketing overlay is visible", () => {
  setMarketingOverlayState({ pricingModalVisible: true, abandonedCheckoutVisible: false });
  assert.equal(areMarketingOverlaysVisible(), true);
  setMarketingOverlayState({ pricingModalVisible: false, abandonedCheckoutVisible: false });
  assert.equal(areMarketingOverlaysVisible(), false);
});
