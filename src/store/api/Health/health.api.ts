import { baseApi } from "../baseApi";
import type { HealthCheckResponse } from "./health.type";

export const healthApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHealthStatus: builder.query<HealthCheckResponse, void>({
      query: () => "/health",
    }),
  }),
  overrideExisting: false,
});

export const { useGetHealthStatusQuery } = healthApi;
