const storagePrefix = "quittheapp";

export const storageKeys = {
  exitIntentShown: "exit_intent_shown",
  appFlowState: `${storagePrefix}:appFlowState`,
  abandonedCheckout: `${storagePrefix}:abandonedCheckout`,
};

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
