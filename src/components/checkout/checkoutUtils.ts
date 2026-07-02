export const BASE_PRICE = 495;
export const DFY_PRICE = 245;
export const SUCCESS_REDIRECT_DELAY_MS = 800;

export function formatPrice(price: number) {
  return `$${price}`;
}

export function calculateCheckoutTotal(hasDfyUpgrade: boolean) {
  return BASE_PRICE + (hasDfyUpgrade ? DFY_PRICE : 0);
}
