import { readStorageValue, writeStorageValue } from "./storage";

export type Ecommerce = {
  currency: string;
  value: number;
  items: Array<{ item_id: string; item_name: string; price: number; quantity: number }>;
};
export type Purchase = Ecommerce & { transaction_id: string; tax?: number };
type DataLayerEvent = { event?: string; [key: string]: unknown };
declare global {
  interface Window { dataLayer?: DataLayerEvent[] }
}

function pushDataLayerEvent(payload: DataLayerEvent) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}

function validEcommerce(data: Ecommerce | null | undefined): data is Ecommerce {
  return Boolean(data && /^[A-Z]{3}$/.test(data.currency) && Number.isFinite(data.value) && data.value >= 0 &&
    data.items.length > 0 && data.items.every((item) => item.item_id && item.item_name &&
      Number.isFinite(item.price) && item.price >= 0 && Number.isInteger(item.quantity) && item.quantity > 0));
}

export function trackEcommerce(event: "view_item" | "select_item" | "begin_checkout", ecommerce: Ecommerce) {
  if (!validEcommerce(ecommerce)) return;
  pushDataLayerEvent({ ecommerce: null });
  pushDataLayerEvent({ event, ecommerce });
}

const purchases = new Set<string>();
export function trackPurchaseCompleted(ecommerce: Purchase) {
  if (!/^cs_(test_|live_)?[A-Za-z0-9]+$/.test(ecommerce.transaction_id) || !validEcommerce(ecommerce)) return;
  const key = `quittheapp:trackedPurchase:${ecommerce.transaction_id}`;
  if (purchases.has(key) || readStorageValue(key)) return;
  pushDataLayerEvent({ ecommerce: null });
  // Keep legacy top-level fields consumed by the existing Meta purchase tag.
  // GA4 should use the canonical ecommerce object, configured in GTM.
  pushDataLayerEvent({ event: "purchase", ...ecommerce, ecommerce });
  purchases.add(key);
  writeStorageValue(key, "1");
}

// Share the request and dispatch across React StrictMode effect replays.
const confirmations = new Map<string, Promise<boolean>>();
export function reportVerifiedPurchase(
  sessionId: string,
  load: () => Promise<{ confirmed: boolean; ecommerce: Purchase | null }>,
): Promise<boolean> {
  const existing = confirmations.get(sessionId);
  if (existing) return existing;
  const pending = load().then((result) => {
    if (result.ecommerce) trackPurchaseCompleted(result.ecommerce);
    if (!result.confirmed) confirmations.delete(sessionId);
    return result.confirmed;
  }).catch((error: unknown) => { confirmations.delete(sessionId); throw error; });
  confirmations.set(sessionId, pending);
  return pending;
}

export function startTrackedCheckout(ecommerce: Ecommerce, url: string) {
  let navigated = false;
  const navigate = () => {
    if (navigated) return;
    navigated = true;
    window.location.assign(url);
  };
  if (!validEcommerce(ecommerce)) { navigate(); return; }
  pushDataLayerEvent({ ecommerce: null });
  pushDataLayerEvent({ event: "select_item", ecommerce });
  pushDataLayerEvent({ ecommerce: null });
  const timer = window.setTimeout(navigate, 500);
  pushDataLayerEvent({
    event: "begin_checkout", ecommerce, eventTimeout: 450,
    eventCallback: () => { window.clearTimeout(timer); navigate(); },
  });
}

export function trackOnboardingCompleted(userId?: string | null) {
  const key = userId ? `quittheapp:trackedOnboarding:${userId}` : null;
  if (key && readStorageValue(key)) return;
  pushDataLayerEvent({ event: "onboarding_completed", user_id: userId || undefined });
  if (key) writeStorageValue(key, "1");
}
