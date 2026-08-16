export interface CheckoutSessionItem {
  productId: string;
  quantity: number;
}

export interface CreateCheckoutSessionRequest {
  items: CheckoutSessionItem[];
  successUrl?: string;
  cancelUrl?: string;
}

export interface CreateCheckoutSessionResponse {
  success: boolean;
  message?: string;
  paymentId?: string;
  checkoutUrl: string;
  packageType: string;
  amount: {
    currency: string;
    total: number;
  };
  purchase: {
    baseVariant: {
      included: boolean;
      quantity: number;
      unitPrice: number;
    };
    addon: {
      included: boolean;
      quantity: number;
      unitPrice: number;
    };
  };
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
