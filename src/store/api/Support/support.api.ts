import { baseApi } from "../baseApi";
import type {
  CreateSupportTicketRequest,
  CreateSupportTicketResponse,
  MyTicketResponse,
  MyTicketsResponse,
  ReplySupportTicketRequest,
  ReplySupportTicketResponse,
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
    getMySupportTicket: builder.query<MyTicketResponse, string>({
      query: (id) => `/support/my/tickets/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Ticket", id }],
    }),
    replyToMySupportTicket: builder.mutation<
      ReplySupportTicketResponse,
      ReplySupportTicketRequest
    >({
      query: ({ id, message }) => ({
        url: `/support/my/tickets/${id}/replies`,
        method: "POST",
        body: { message },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        "Tickets",
        { type: "Ticket", id },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateRiderSupportTicketMutation,
  useGetMySupportTicketQuery,
  useGetMySupportTicketsQuery,
  useReplyToMySupportTicketMutation,
} = supportApi;
