import { baseApi } from "../baseApi";
import type {
  BusinessDashboardResponse,
  PublicBusinessResponse,
} from "./business.type";

export const businessApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRiderDashboard: builder.query<BusinessDashboardResponse, void>({
      query: () => "/business/dashboard",
    }),
    getPublicBusinessFromHost: builder.query<PublicBusinessResponse, void>({
      query: () => "/public/business-from-host",
    }),
    getPublicBusinessBySlug: builder.query<PublicBusinessResponse, string>({
      query: (slug) => `/public/business/${slug}`,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetRiderDashboardQuery,
  useGetPublicBusinessFromHostQuery,
  useGetPublicBusinessBySlugQuery,
} = businessApi;
