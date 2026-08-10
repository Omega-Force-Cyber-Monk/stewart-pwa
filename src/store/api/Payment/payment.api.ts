import { baseApi } from "../baseApi";
import type {
  CreateCheckoutSessionRequest,
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
    getRiderPaymentHistory: builder.query<PaymentHistoryResponse, void>({
      query: () => "/payments/history",
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateRiderCheckoutSessionMutation,
  useGetRiderPaymentHistoryQuery,
} = paymentApi;
