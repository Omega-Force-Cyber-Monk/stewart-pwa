export interface CheckoutSessionItem {
  productId: string;
  quantity: number;
}

export interface CreateCheckoutSessionRequest {
  items: CheckoutSessionItem[];
  email?: string;
  successUrl?: string;
  cancelUrl?: string;
}

export interface CreateCheckoutSessionResponse {
  success: boolean;
  message?: string;
  checkoutUrl: string | null;
  sessionId: string;
}

export interface PaymentItem {
  id: string;
  type: string;
  name: string;
  quantity: number;
  unitAmount: number;
  totalAmount: number;
}

export interface PaymentRecord {
  id: string;
  currency: string;
  totalAmount: number;
  status: string;
  checkoutUrl: string;
  paidAt: string;
  createdAt: string;
  updatedAt: string;
  items: PaymentItem[];
}

export interface PaymentHistoryResponse {
  success: boolean;
  payments: PaymentRecord[];
}
