import { baseApi } from "../baseApi";
import type {
  AdminDfyOrderResponse,
  AdminDfyOrdersResponse,
  CustomerDfyResponse,
  DfyAsset,
} from "./dfy.type";

export const doneForYouApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCustomerDoneForYou: build.query<CustomerDfyResponse, void>({
      query: () => "/business/done-for-you",
      providesTags: ["DoneForYou"],
    }),
    selectDoneForYouLogoStyle: build.mutation<
      CustomerDfyResponse,
      { logoStyleKey: string }
    >({
      query: (body) => ({
        url: "/business/done-for-you/logo-style",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["DoneForYou"],
    }),
    getAdminDfyOrders: build.query<
      AdminDfyOrdersResponse,
      {
        page?: number;
        limit?: number;
        search?: string;
        status?: string;
        audience?: string;
      }
    >({
      query: (params) => ({ url: "/admin/done-for-you", params }),
      providesTags: ["DoneForYouOrders"],
    }),
    getAdminDfyOrder: build.query<AdminDfyOrderResponse, string>({
      query: (id) => `/admin/done-for-you/${id}`,
      providesTags: (_result, _error, id) => [{ type: "DoneForYouOrder", id }],
    }),
    uploadAdminDfyLogo: build.mutation<
      { success: true; asset: DfyAsset },
      { orderId: string; formData: FormData }
    >({
      query: ({ orderId, formData }) => ({
        url: `/admin/done-for-you/${orderId}/brand/logo`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: (_result, _error, { orderId }) => [
        { type: "DoneForYouOrder", id: orderId },
      ],
    }),
    approveAdminDfyLogo: build.mutation<
      AdminDfyOrderResponse,
      { orderId: string; assetId: string }
    >({
      query: ({ orderId, assetId }) => ({
        url: `/admin/done-for-you/${orderId}/brand/logo/${assetId}/approve`,
        method: "POST",
      }),
      invalidatesTags: (_result, _error, { orderId }) => [
        { type: "DoneForYouOrder", id: orderId },
        "DoneForYou",
      ],
    }),
    reevaluateAdminDfyFulfillment: build.mutation<
      { success: true; processed: boolean; eligibility: unknown; job: unknown },
      string
    >({
      query: (orderId) => ({
        url: `/admin/done-for-you/${orderId}/fulfillment/reevaluate`,
        method: "POST",
      }),
      invalidatesTags: (_result, _error, orderId) => [
        { type: "DoneForYouOrder", id: orderId },
        "DoneForYou",
        "DoneForYouOrders",
      ],
    }),
    retryAdminDfyFulfillment: build.mutation<
      { success: true; processed: boolean; eligibility: unknown; job: unknown },
      string
    >({
      query: (orderId) => ({
        url: `/admin/done-for-you/${orderId}/fulfillment/retry-failed`,
        method: "POST",
      }),
      invalidatesTags: (_result, _error, orderId) => [
        { type: "DoneForYouOrder", id: orderId },
        "DoneForYou",
        "DoneForYouOrders",
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCustomerDoneForYouQuery,
  useSelectDoneForYouLogoStyleMutation,
  useGetAdminDfyOrdersQuery,
  useGetAdminDfyOrderQuery,
  useUploadAdminDfyLogoMutation,
  useApproveAdminDfyLogoMutation,
  useReevaluateAdminDfyFulfillmentMutation,
  useRetryAdminDfyFulfillmentMutation,
} = doneForYouApi;
