import { readStorageValue, writeStorageValue, storageKeys } from "./storage";

type DataLayerEvent = {
  event: string;
  [key: string]: unknown;
};

type CheckoutPlan = "base" | "bundle";

type AbandonedCheckoutState = {
  sessionId?: string;
  plan?: CheckoutPlan;
};

declare global {
  interface Window {
    dataLayer?: DataLayerEvent[];
  }
}

const trackedPurchasePrefix = "quittheapp:trackedPurchase:";
const trackedOnboardingPrefix = "quittheapp:trackedOnboarding:";

const purchasePayloadByPlan = {
  base: {
    value: 295,
    items: [{ item_name: "QuitTheApp", price: 295, quantity: 1 }],
  },
  bundle: {
    value: 394,
    items: [
      { item_name: "QuitTheApp", price: 295, quantity: 1 },
      { item_name: "Done For You", price: 99, quantity: 1 },
    ],
  },
} as const;

function pushDataLayerEvent(payload: DataLayerEvent) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}

function normalizeCheckoutPlan(plan?: string | null): CheckoutPlan | null {
  return plan === "base" || plan === "bundle" ? plan : null;
}

function readCheckoutPlan(stripeSessionId: string, fallbackPlan?: string | null): CheckoutPlan | null {
  const normalizedFallback = normalizeCheckoutPlan(fallbackPlan);
  const raw = readStorageValue(storageKeys.abandonedCheckout);
  if (!raw) return normalizedFallback;

  try {
    const checkout = JSON.parse(raw) as AbandonedCheckoutState;
    if (checkout.sessionId !== stripeSessionId) return normalizedFallback;
    return normalizeCheckoutPlan(checkout.plan) ?? normalizedFallback;
  } catch {
    return normalizedFallback;
  }
}

export function trackPurchaseCompleted(stripeSessionId: string, plan?: string | null) {
  const trackedKey = `${trackedPurchasePrefix}${stripeSessionId}`;
  if (readStorageValue(trackedKey)) return;

  const checkoutPlan = readCheckoutPlan(stripeSessionId, plan);
  if (!checkoutPlan) return;

  const payload = purchasePayloadByPlan[checkoutPlan];
  pushDataLayerEvent({
    event: "purchase",
    transaction_id: stripeSessionId,
    value: payload.value,
    currency: "USD",
    items: payload.items,
  });

  writeStorageValue(trackedKey, "1");
}

export function trackOnboardingCompleted(userId?: string | null) {
  const trackedKey = userId ? `${trackedOnboardingPrefix}${userId}` : null;
  if (trackedKey && readStorageValue(trackedKey)) return;

  pushDataLayerEvent({
    event: "onboarding_completed",
    user_id: userId || undefined,
  });

  if (trackedKey) writeStorageValue(trackedKey, "1");
}
