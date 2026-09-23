import { baseApi } from "../baseApi";
import type {
  AdminDfyOrderResponse,
  AdminDfyOrdersResponse,
  CustomerDfyResponse,
  DfyAsset,
  DfyLogoStyle,
  DfyTemplateSet,
} from "./dfy.type";

export const doneForYouApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCustomerDoneForYou: build.query<CustomerDfyResponse, void>({
      query: () => "/business/done-for-you",
      providesTags: ["DoneForYou"],
    }),
    selectDoneForYouLogoStyle: build.mutation<CustomerDfyResponse, { logoStyleKey: string }>({
      query: (body) => ({
        url: "/business/done-for-you/logo-style",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["DoneForYou"],
    }),
    getAdminDfyOrders: build.query<
      AdminDfyOrdersResponse,
      { page?: number; limit?: number; search?: string; status?: string; audience?: string }
    >({
      query: (params) => ({ url: "/admin/done-for-you", params }),
      providesTags: ["DoneForYouOrders"],
    }),
    getAdminDfyOrder: build.query<AdminDfyOrderResponse, string>({
      query: (id) => `/admin/done-for-you/${id}`,
      providesTags: (_result, _error, id) => [{ type: "DoneForYouOrder", id }],
    }),
    updateAdminDfyOrder: build.mutation<
      AdminDfyOrderResponse,
      { id: string; status?: string; audience?: string; templateSetId?: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/admin/done-for-you/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        "DoneForYouOrders",
        { type: "DoneForYouOrder", id },
        "DoneForYou",
      ],
    }),
    updateAdminDfyDeliverable: build.mutation<
      AdminDfyOrderResponse,
      { orderId: string; deliverableId: string; status: string; productionNotes?: string; reviewNotes?: string }
    >({
      query: ({ orderId, deliverableId, ...body }) => ({
        url: `/admin/done-for-you/${orderId}/deliverables/${deliverableId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_result, _error, { orderId }) => [
        "DoneForYouOrders",
        { type: "DoneForYouOrder", id: orderId },
        "DoneForYou",
      ],
    }),
    createAdminDfyAsset: build.mutation<{ success: true; asset: DfyAsset }, { orderId: string; formData: FormData }>({
      query: ({ orderId, formData }) => ({
        url: `/admin/done-for-you/${orderId}/assets`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: (_result, _error, { orderId }) => [
        { type: "DoneForYouOrder", id: orderId },
        "DoneForYou",
      ],
    }),
    deleteAdminDfyAsset: build.mutation<{ success: true; message: string }, { orderId: string; assetId: string }>({
      query: ({ orderId, assetId }) => ({
        url: `/admin/done-for-you/${orderId}/assets/${assetId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, { orderId }) => [
        { type: "DoneForYouOrder", id: orderId },
        "DoneForYou",
      ],
    }),
    uploadAdminDfyLogo: build.mutation<{ success: true; asset: DfyAsset }, { orderId: string; formData: FormData }>({
      query: ({ orderId, formData }) => ({
        url: `/admin/done-for-you/${orderId}/brand/logo`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: (_result, _error, { orderId }) => [{ type: "DoneForYouOrder", id: orderId }],
    }),
    approveAdminDfyLogo: build.mutation<AdminDfyOrderResponse, { orderId: string; assetId: string }>({
      query: ({ orderId, assetId }) => ({
        url: `/admin/done-for-you/${orderId}/brand/logo/${assetId}/approve`,
        method: "POST",
      }),
      invalidatesTags: (_result, _error, { orderId }) => [
        { type: "DoneForYouOrder", id: orderId },
        "DoneForYou",
      ],
    }),
    publishAdminDfyOrder: build.mutation<AdminDfyOrderResponse, string>({
      query: (orderId) => ({
        url: `/admin/done-for-you/${orderId}/publish`,
        method: "POST",
      }),
      invalidatesTags: (_result, _error, orderId) => [
        "DoneForYouOrders",
        { type: "DoneForYouOrder", id: orderId },
        "DoneForYou",
      ],
    }),
    getAdminDfyLogoStyles: build.query<{ success: true; logoStyles: DfyLogoStyle[] }, void>({
      query: () => "/admin/done-for-you/logo-styles",
      providesTags: ["DoneForYouLogoStyles"],
    }),
    getAdminDfyTemplateSets: build.query<{ success: true; templateSets: DfyTemplateSet[] }, void>({
      query: () => "/admin/done-for-you/template-sets",
      providesTags: ["DoneForYouTemplateSets"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCustomerDoneForYouQuery,
  useSelectDoneForYouLogoStyleMutation,
  useGetAdminDfyOrdersQuery,
  useGetAdminDfyOrderQuery,
  useUpdateAdminDfyOrderMutation,
  useUpdateAdminDfyDeliverableMutation,
  useCreateAdminDfyAssetMutation,
  useDeleteAdminDfyAssetMutation,
  useUploadAdminDfyLogoMutation,
  useApproveAdminDfyLogoMutation,
  usePublishAdminDfyOrderMutation,
  useGetAdminDfyLogoStylesQuery,
  useGetAdminDfyTemplateSetsQuery,
} = doneForYouApi;
