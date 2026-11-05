import { baseApi } from "../baseApi";
import type { Ecommerce, Purchase } from "../../../lib/gtmEvents";
import type {
  CreateCheckoutSessionRequest,
  ConfirmCheckoutSessionRequest,
  ConfirmCheckoutSessionResponse,
  CreateCheckoutSessionResponse,
  PaymentHistoryResponse,
  InvoiceDownloadResponse,
} from "./payment.type";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAnalyticsPricing: builder.query<Ecommerce, void>({
      query: () => "/payments/pricing",
    }),
    claimPurchaseAnalytics: builder.mutation<{ confirmed: boolean; ecommerce: Purchase | null }, ConfirmCheckoutSessionRequest>({
      query: (body) => ({ url: "/payments/checkout-session/analytics", method: "POST", body }),
    }),
    createRiderCheckoutSession: builder.mutation<CreateCheckoutSessionResponse, CreateCheckoutSessionRequest>({
      query: (body) => ({
        url: "/payments/checkout-session",
        method: "POST",
        body,
      }),
    }),
    confirmRiderCheckoutSession: builder.mutation<
      ConfirmCheckoutSessionResponse,
      ConfirmCheckoutSessionRequest
    >({
      query: (body) => ({
        url: "/payments/checkout-session/confirm",
        method: "POST",
        body,
      }),
    }),
    getRiderPaymentHistory: builder.query<PaymentHistoryResponse, void>({
      query: () => "/payments/history",
      providesTags: ["Payments"],
    }),
    getRiderPaymentInvoice: builder.query<Blob | InvoiceDownloadResponse, string>({
      query: (id) => ({
        url: `/payments/history/${id}/invoice`,
        responseHandler: async (response) => {
          const contentType = response.headers.get("content-type") || "";
          return contentType.includes("application/json") ? response.json() : response.blob();
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAnalyticsPricingQuery,
  useClaimPurchaseAnalyticsMutation,
  useConfirmRiderCheckoutSessionMutation,
  useCreateRiderCheckoutSessionMutation,
  useGetRiderPaymentHistoryQuery,
  useLazyGetRiderPaymentInvoiceQuery,
} = paymentApi;
