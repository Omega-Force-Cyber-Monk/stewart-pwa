import { baseApi } from "../baseApi";
import type {
  BusinessDashboardResponse,
  BusinessProfileResponse,
  CreateBusinessRequest,
  UpdateBusinessRequest,
  PublicBusinessResponse,
  SetupStateResponse,
  UpdateSetupRequest,
  UploadLogoResponse,
  AirportSuggestionsResponse,
  ReferralCardResponse,
  BusinessResourcesResponse,
  ChecklistItemsResponse,
  LaunchReadinessResponse,
  FinalReviewResponse,
  CompleteLaunchResponse,
  PublicLeadConfigResponse,
  CreatePublicLeadResponse,
  CreatePublicLeadRequest,
} from "./business.type";

export const businessApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyBusiness: builder.query<BusinessProfileResponse, void>({
      query: () => "/business",
      providesTags: ["Business"],
    }),
    createBusiness: builder.mutation<BusinessProfileResponse, CreateBusinessRequest>({
      query: (body) => ({
        url: "/business",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Business"],
    }),
    updateBusiness: builder.mutation<BusinessProfileResponse, UpdateBusinessRequest>({
      query: (body) => ({
        url: "/business",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Business"],
    }),
    getRiderDashboard: builder.query<BusinessDashboardResponse, void>({
      query: () => "/business/dashboard",
      providesTags: ["Business"],
    }),
    getPublicBusinessFromHost: builder.query<PublicBusinessResponse, void>({
      query: () => "/public/business-from-host",
    }),
    getPublicBusinessBySlug: builder.query<PublicBusinessResponse, string>({
      query: (slug) => `/public/business/${slug}`,
    }),
    initializeSetup: builder.mutation<SetupStateResponse, void>({
      query: () => ({
        url: "/business/setup",
        method: "POST",
      }),
    }),
    getSetupState: builder.query<SetupStateResponse, void>({
      query: () => "/business/setup",
      providesTags: ["Setup"],
    }),
    updateSetupState: builder.mutation<SetupStateResponse, UpdateSetupRequest>({
      query: (body) => ({
        url: "/business/setup",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Setup", "LaunchReady"],
    }),
    uploadBusinessLogo: builder.mutation<UploadLogoResponse, FormData>({
      query: (formData) => ({
        url: "/business/logo",
        method: "POST",
        body: formData,
      }),
    }),
    getAirportSuggestions: builder.query<AirportSuggestionsResponse, { cityArea: string; limit?: number }>({
      query: ({ cityArea, limit = 5 }) => `/business/service-area/airports?cityArea=${encodeURIComponent(cityArea)}&limit=${limit}`,
    }),
    getReferralCard: builder.query<ReferralCardResponse, void>({
      query: () => "/business/referral-card",
      providesTags: ["ReferralCard"],
    }),
    generateReferralCard: builder.mutation<ReferralCardResponse, void>({
      query: () => ({
        url: "/business/referral-card/generate",
        method: "POST",
      }),
      invalidatesTags: ["ReferralCard", "Setup", "LaunchReady"],
    }),
    getBusinessResources: builder.query<BusinessResourcesResponse, { step?: string; type?: string; categoryId?: string } | void>({
      query: (params) => {
        let url = "/business/resources";
        if (params) {
          const queryParams = new URLSearchParams();
          if (params.step) queryParams.append("step", params.step);
          if (params.type) queryParams.append("type", params.type);
          if (params.categoryId) queryParams.append("categoryId", params.categoryId);
          const queryString = queryParams.toString();
          if (queryString) url += `?${queryString}`;
        }
        return url;
      },
    }),
    downloadBusinessResource: builder.query<Blob, string>({
      query: (id) => ({
        url: `/business/resources/${id}/file`,
        responseHandler: (response) => response.blob(),
      }),
    }),
    getChecklistItems: builder.query<ChecklistItemsResponse, { step?: string } | void>({
      query: (params) => {
        let url = "/business/checklist";
        if (params && params.step) {
          url += `?step=${encodeURIComponent(params.step)}`;
        }
        return url;
      },
      providesTags: ["ChecklistItems"],
    }),
    updateChecklistItem: builder.mutation<ChecklistItemsResponse, { id: string; completed: boolean }>({
      query: ({ id, completed }) => ({
        url: `/business/checklist/${id}`,
        method: "PATCH",
        body: { completed },
      }),
      invalidatesTags: ["ChecklistItems", "Setup", "LaunchReady"],
    }),
    getLaunchReadiness: builder.query<LaunchReadinessResponse, void>({
      query: () => "/business/launch-ready",
      providesTags: ["LaunchReady"],
    }),
    getFinalReview: builder.query<FinalReviewResponse, void>({
      query: () => "/business/final-review",
    }),
    completeLaunch: builder.mutation<CompleteLaunchResponse, void>({
      query: () => ({
        url: "/business/complete-launch",
        method: "POST",
      }),
    }),
    getPublicLeadConfig: builder.query<PublicLeadConfigResponse, void>({
      query: () => "/public/lead-config",
    }),
    createPublicLead: builder.mutation<CreatePublicLeadResponse, CreatePublicLeadRequest>({
      query: (body) => ({
        url: "/public/leads",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Leads" as any], // Cast as any if Leads is not in tagTypes yet, or just omit if it complains
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetMyBusinessQuery,
  useCreateBusinessMutation,
  useUpdateBusinessMutation,
  useGetRiderDashboardQuery,
  useGetPublicBusinessFromHostQuery,
  useGetPublicBusinessBySlugQuery,
  useInitializeSetupMutation,
  useGetSetupStateQuery,
  useUpdateSetupStateMutation,
  useUploadBusinessLogoMutation,
  useLazyGetAirportSuggestionsQuery,
  useGetReferralCardQuery,
  useGenerateReferralCardMutation,
  useGetBusinessResourcesQuery,
  useLazyDownloadBusinessResourceQuery,
  useGetChecklistItemsQuery,
  useUpdateChecklistItemMutation,
  useGetLaunchReadinessQuery,
  useGetFinalReviewQuery,
  useCompleteLaunchMutation,
  useGetPublicLeadConfigQuery,
  useCreatePublicLeadMutation,
} = businessApi;
