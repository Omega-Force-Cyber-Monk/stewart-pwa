import { baseApi } from "../baseApi";
import type {
  CreateCheckoutSessionRequest,
  ConfirmCheckoutSessionRequest,
  ConfirmCheckoutSessionResponse,
  CreateCheckoutSessionResponse,
  PaymentHistoryResponse,
} from "./payment.type";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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
    }),
  }),
  overrideExisting: false,
});

export const {
  useConfirmRiderCheckoutSessionMutation,
  useCreateRiderCheckoutSessionMutation,
  useGetRiderPaymentHistoryQuery,
} = paymentApi;
