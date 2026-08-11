import { baseApi } from "../baseApi";
import type {
  CreateSupportTicketRequest,
  CreateSupportTicketResponse,
  MyTicketsResponse,
} from "./support.type";

export const supportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createRiderSupportTicket: builder.mutation<
      CreateSupportTicketResponse,
      CreateSupportTicketRequest
    >({
      query: (body) => ({
        url: "/support/tickets",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Tickets"],
    }),
    getMySupportTickets: builder.query<MyTicketsResponse, void>({
      query: () => "/support/my/tickets",
      providesTags: ["Tickets"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateRiderSupportTicketMutation,
  useGetMySupportTicketsQuery,
} = supportApi;
