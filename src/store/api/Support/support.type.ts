export interface CreateSupportTicketRequest {
  subject: string;
  message: string;
}

export interface SupportMessage {
  id: string;
  ticketId: string;
  senderId: string;
  message: string;
  isAdmin: boolean;
  createdAt: string;
}

export interface RiderTicket {
  id: string;
  subject: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  messages: SupportMessage[];
}

export interface CreateSupportTicketResponse {
  success: boolean;
  ticket: RiderTicket;
}

export interface MyTicketsResponse {
  success: boolean;
  tickets: RiderTicket[];
}
