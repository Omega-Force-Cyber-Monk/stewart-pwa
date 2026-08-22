import { baseApi } from "../baseApi";
import type {
  Pagination,
  DashboardSummary,
  Driver,
  DriverVerificationResponse,
  BusinessListItem,
  BusinessDetail,
  BusinessSetupProgress,
  PaymentListItem,
  PaymentDetail,
  TicketListItem,
  TicketDetail,
  SupportMessage,
  PlatformSettings,
  SettingKey,
  Resource,
  RevenueBucket,
  ActivityEvent,
  RecentDriver,
} from "./admin.type";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // ---- Dashboard ----
    getAdminDashboard: build.query<DashboardSummary, void>({
      query: () => "/admin/dashboard",
      providesTags: ["Dashboard"],
    }),
    getAdminRevenue: build.query<
      { success: true; period: string; year: number; month?: number; revenue: RevenueBucket[] },
      { period: "monthly" | "daily"; year: number; month?: number }
    >({
      query: (params) => ({ url: "/admin/dashboard/revenue", params }),
    }),
    getAdminActivity: build.query<
      { success: true; activities: ActivityEvent[]; pagination: Pagination },
      { page?: number; limit?: number; type?: string }
    >({
      query: (params) => ({ url: "/admin/activity", params }),
    }),
    getAdminRecentDrivers: build.query<{ success: true; drivers: RecentDriver[] }, { limit?: number }>({
      query: (params) => ({ url: "/admin/recent-drivers", params }),
    }),

    // ---- Drivers ----
    getAdminDrivers: build.query<
      { success: true; drivers: Driver[]; pagination: Pagination },
      {
        page?: number;
        limit?: number;
        search?: string;
        category?: string;
        verificationStatus?: string;
        status?: string;
      }
    >({
      query: (params) => ({ url: "/admin/drivers", params }),
      providesTags: ["Drivers"],
    }),
    getAdminDriver: build.query<{ success: true; driver: Driver }, string>({
      query: (id) => `/admin/drivers/${id}`,
      providesTags: (_result, _err, id) => [{ type: "Driver", id }],
    }),
    updateDriverVerification: build.mutation<
      DriverVerificationResponse,
      { id: string; status: string; reason?: string }
    >({
      query: ({ id, status, reason }) => ({
        url: `/admin/drivers/${id}/verification`,
        method: "PATCH",
        body: reason ? { status, reason } : { status },
      }),
      invalidatesTags: (_result, _err, { id }) => [
        "Drivers",
        { type: "Driver", id },
        "Dashboard",
      ],
    }),
    updateDriverAccountStatus: build.mutation<
      { success: true; driver: { id: string; status: string } },
      { id: string; status: string }
    >({
      query: ({ id, status }) => ({
        url: `/admin/drivers/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (_result, _err, { id }) => [
        "Drivers",
        { type: "Driver", id },
        "Dashboard",
      ],
    }),
    deleteDriver: build.mutation<{ success: true; message: string }, string>({
      query: (id) => ({ url: `/admin/drivers/${id}`, method: "DELETE" }),
      invalidatesTags: ["Drivers", "Dashboard"],
    }),

    // ---- Businesses ----
    getAdminBusinesses: build.query<
      { success: true; businesses: BusinessListItem[]; pagination: Pagination },
      { page?: number; limit?: number; status?: string; search?: string }
    >({
      query: (params) => ({ url: "/admin/businesses", params }),
      providesTags: ["Businesses"],
    }),
    getAdminBusiness: build.query<{ success: true; business: BusinessDetail }, string>({
      query: (id) => `/admin/businesses/${id}`,
      providesTags: (_result, _err, id) => [{ type: "Business", id }],
    }),
    updateAdminBusinessStatus: build.mutation<
      { success: true; changed: boolean; businessStatus?: string; business?: { id: string; status: string; updatedAt: string }; launchReady?: boolean; missingRequirements?: string[]; progress?: BusinessSetupProgress["data"] },
      { id: string; status: string }
    >({
      query: ({ id, status }) => ({
        url: `/admin/businesses/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (_result, _err, { id }) => [
        "Businesses",
        { type: "Business", id },
        "Dashboard",
      ],
    }),
    getAdminBusinessSetup: build.query<BusinessSetupProgress, string>({
      query: (id) => `/admin/businesses/${id}/setup`,
    }),

    // ---- Payments ----
    getAdminPayments: build.query<
      { success: true; payments: PaymentListItem[]; pagination: Pagination },
      {
        page?: number;
        limit?: number;
        status?: string;
        userId?: string;
        category?: string;
        purchaseType?: string;
      }
    >({
      query: (params) => ({ url: "/admin/payments", params }),
      providesTags: ["Payments"],
    }),
    getAdminPayment: build.query<{ success: true; payment: PaymentDetail }, string>({
      query: (id) => `/admin/payments/${id}`,
      providesTags: (_result, _err, id) => [{ type: "Payment", id }],
    }),
    getAdminPaymentReceipt: build.query<
      { success: true; receiptUrl: string; receiptNo: string | null; paymentId: string },
      string
    >({
      query: (id) => `/admin/payments/${id}/receipt`,
      providesTags: (_result, _err, id) => [{ type: "Payment", id }],
    }),

    // ---- Resources ----
    getAdminResources: build.query<
      { success: true; resources: Resource[]; pagination: Pagination },
      { page?: number; limit?: number; categoryId?: string; step?: string; type?: string; active?: boolean; search?: string }
    >({
      query: (params) => ({ url: "/admin/resources", params }),
      providesTags: ["Resources"],
    }),
    getAdminResource: build.query<{ success: true; resource: Resource }, string>({
      query: (id) => `/admin/resources/${id}`,
      providesTags: (_result, _err, id) => [{ type: "Resource", id }],
    }),
    createAdminResource: build.mutation<{ success: true; resource: Resource }, FormData>({
      query: (formData) => ({
        url: "/admin/resources",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Resources", "ResourceCategories"],
    }),
    updateAdminResource: build.mutation<
      { success: true; resource: Resource },
      { id: string; formData: FormData }
    >({
      query: ({ id, formData }) => ({
        url: `/admin/resources/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Resources", "ResourceCategories"],
    }),
    deleteAdminResource: build.mutation<{ success: true; message: string }, string>({
      query: (id) => ({ url: `/admin/resources/${id}`, method: "DELETE" }),
      invalidatesTags: ["Resources", "ResourceCategories"],
    }),

    // ---- Support tickets ----
    getAdminTickets: build.query<
      { success: true; tickets: TicketListItem[]; pagination: Pagination },
      { page?: number; limit?: number; status?: string; category?: string; search?: string }
    >({
      query: (params) => ({ url: "/admin/support/tickets", params }),
      providesTags: ["Tickets"],
    }),
    getAdminTicket: build.query<{ success: true; ticket: TicketDetail }, string>({
      query: (id) => `/admin/support/tickets/${id}`,
      providesTags: (_result, _err, id) => [{ type: "Ticket", id }],
    }),
    replyToAdminTicket: build.mutation<
      { success: true; message: SupportMessage },
      { id: string; message: string; notifyEmail?: boolean }
    >({
      query: ({ id, ...body }) => ({
        url: `/admin/support/tickets/${id}/replies`,
        method: "POST",
        body,
      }),
      invalidatesTags: (_result, _err, { id }) => [
        "Tickets",
        { type: "Ticket", id },
      ],
    }),
    updateAdminTicketStatus: build.mutation<
      { success: true; ticket: { id: string; status: string } },
      { id: string; status: string }
    >({
      query: ({ id, status }) => ({
        url: `/admin/support/tickets/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (_result, _err, { id }) => [
        "Tickets",
        { type: "Ticket", id },
      ],
    }),
    deleteAdminTicket: build.mutation<{ success: true; message: string }, string>({
      query: (id) => ({
        url: `/admin/support/tickets/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tickets"],
    }),

    // ---- Settings ----
    getAdminSettings: build.query<{ success: true; settings: PlatformSettings }, void>({
      query: () => "/admin/settings",
      providesTags: ["Settings"],
    }),
    getAdminSetting: build.query<
      { success: true; setting: { key: SettingKey; value: Record<string, unknown>; updatedAt?: string } },
      SettingKey
    >({
      query: (key) => `/admin/settings/${key}`,
      providesTags: (_result, _err, key) => [{ type: "Setting", id: key }],
    }),
    updateAdminSetting: build.mutation<
      { success: true; setting: { key: SettingKey; value: Record<string, unknown>; updatedAt?: string } },
      { key: SettingKey; value: Record<string, unknown> }
    >({
      query: ({ key, value }) => ({
        url: `/admin/settings/${key}`,
        method: "PATCH",
        body: { value },
      }),
      invalidatesTags: ["Settings", { type: "Setting", id: "platform" }, { type: "Setting", id: "notifications" }, { type: "Setting", id: "legalCompliance" }],
    }),

  }),
  overrideExisting: false,
});

export const {
  // Dashboard
  useGetAdminDashboardQuery,
  useGetAdminRevenueQuery,
  useGetAdminActivityQuery,
  useGetAdminRecentDriversQuery,
  // Drivers
  useGetAdminDriversQuery,
  useGetAdminDriverQuery,
  useUpdateDriverVerificationMutation,
  useUpdateDriverAccountStatusMutation,
  useDeleteDriverMutation,
  // Businesses
  useGetAdminBusinessesQuery,
  useGetAdminBusinessQuery,
  useUpdateAdminBusinessStatusMutation,
  useGetAdminBusinessSetupQuery,
  // Payments
  useGetAdminPaymentsQuery,
  useGetAdminPaymentQuery,
  useGetAdminPaymentReceiptQuery,
  // Resources
  useGetAdminResourcesQuery,
  useGetAdminResourceQuery,
  useCreateAdminResourceMutation,
  useUpdateAdminResourceMutation,
  useDeleteAdminResourceMutation,
  // Support tickets
  useGetAdminTicketsQuery,
  useGetAdminTicketQuery,
  useReplyToAdminTicketMutation,
  useUpdateAdminTicketStatusMutation,
  useDeleteAdminTicketMutation,
  // Settings
  useGetAdminSettingsQuery,
  useGetAdminSettingQuery,
  useUpdateAdminSettingMutation,
} = adminApi;
