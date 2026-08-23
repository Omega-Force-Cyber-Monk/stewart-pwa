import { createApi, fetchBaseQuery, type BaseQueryFn, type FetchArgs, type FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut, type User } from "../features/auth/authSlice";

const baseUrl = (import.meta.env.VITE_API_BASE_URL as string) || "http://localhost:3000/api/v1";

interface RootStateLight {
  auth: {
    accessToken: string | null;
    refreshToken: string | null;
    user: User | null;
  };
}

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootStateLight;
    const token = state.auth?.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const state = api.getState() as RootStateLight;
    const refreshToken = state.auth?.refreshToken;

    if (refreshToken) {
      // Attempt to refresh the access token
      const refreshResult = await baseQuery(
        {
          url: "/auth/refresh",
          method: "POST",
          body: { refreshToken },
        },
        api,
        extraOptions
      );

      interface RefreshResponse {
        success: boolean;
        accessToken: string;
        refreshToken: string;
        user?: User;
      }

      if (refreshResult.data) {
        const data = refreshResult.data as RefreshResponse;
        const currentUser = data.user || state.auth.user;
        if (currentUser) {
          api.dispatch(
            setCredentials({
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
              user: currentUser,
            })
          );
          // Retry the original request with the new access token
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logOut());
        }
      } else {
        api.dispatch(logOut());
      }
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "Dashboard",
    "Drivers",
    "Driver",
    "Businesses",
    "Business",
    "Payments",
    "Payment",
    "Resources",
    "Resource",
    "ResourceCategories",
    "ChecklistItems",
    "Tickets",
    "Ticket",
    "Settings",
    "Setting",
    "Users",
    "User",
    "Setup",
    "LaunchReady",
    "ReferralCard",
    "Leads",
    "Lead",
  ],
  endpoints: () => ({}),
});
