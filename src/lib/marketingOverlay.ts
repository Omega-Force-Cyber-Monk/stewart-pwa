export type MarketingOverlayState = {
  pricingModalVisible: boolean;
  abandonedCheckoutVisible: boolean;
};

let overlayState: MarketingOverlayState = {
  pricingModalVisible: false,
  abandonedCheckoutVisible: false,
};

const listeners = new Set<(state: MarketingOverlayState) => void>();

export function readMarketingOverlayState(): MarketingOverlayState {
  return overlayState;
}

export function setMarketingOverlayState(nextState: MarketingOverlayState): void {
  overlayState = { ...nextState };
  listeners.forEach((listener) => listener(overlayState));
}

export function subscribeMarketingOverlayState(
  listener: (state: MarketingOverlayState) => void,
): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function areMarketingOverlaysVisible(): boolean {
  return overlayState.pricingModalVisible || overlayState.abandonedCheckoutVisible;
}

// Short aliases keep the helper convenient for consumers that already know the shared-state contract.
export const readOverlayState = readMarketingOverlayState;
export const setOverlayState = setMarketingOverlayState;
export const subscribeOverlayState = subscribeMarketingOverlayState;
