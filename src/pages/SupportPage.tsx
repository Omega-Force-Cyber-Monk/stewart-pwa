import { useState } from "react";
import {
  AlertCircle,
  ChevronRight,
  Inbox,
  Loader2,
  MessageCircle,
  Plus,
  RefreshCw,
  Send,
  X,
} from "lucide-react";

import ContactSupportModal from "../components/dashboard/ContactSupportModal";
import { cn } from "../lib/cn";
import {
  useGetMySupportTicketQuery,
  useGetMySupportTicketsQuery,
  useReplyToMySupportTicketMutation,
} from "../store/api/Support/support.api";
import type { RiderTicket } from "../store/api/Support/support.type";

const statusStyles: Record<string, string> = {
  PENDING: "border-amber-100 bg-amber-50 text-amber-700",
  UNDER_REVIEW: "border-blue-100 bg-blue-50 text-blue-700",
  COMPLETED: "border-green-100 bg-green-50 text-green-700",
};

const formatStatus = (status: string) =>
  status
    .split("_")
    .map((word) => word[0] + word.slice(1).toLowerCase())
    .join(" ");

const formatDate = (iso: string) => {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return { date: iso, time: "" };

  return {
    date: date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    time: date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    }),
  };
};

const getLastMessage = (ticket: RiderTicket) => {
  if (ticket.messages.length === 0) return null;
  return ticket.messages[ticket.messages.length - 1];
};

export default function SupportPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const { data, isLoading, isError, refetch } = useGetMySupportTicketsQuery();
  const { data: detailData, isFetching: isDetailLoading } =
    useGetMySupportTicketQuery(selectedId ?? "", { skip: !selectedId });
  const [replyToTicket, { isLoading: isReplying }] =
    useReplyToMySupportTicketMutation();

  const tickets = data?.tickets ?? [];
  const selectedTicket =
    detailData?.ticket ?? tickets.find((ticket) => ticket.id === selectedId);

  const handleReply = async () => {
    if (!selectedId || !replyText.trim()) return;

    try {
      await replyToTicket({ id: selectedId, message: replyText.trim() }).unwrap();
      setReplyText("");
    } catch (error) {
      console.error("Failed to send support reply:", error);
    }
  };

  return (
    <>
      <div className="space-y-6">
        <header className="flex flex-col justify-between gap-4 rounded-2xl border border-green-100 bg-white p-6 shadow-sm sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-dashboard-rider">
              Support
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">
              Support Conversations
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              Keep your support requests and team replies in one place.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsCreateOpen(true)}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-dashboard-rider px-5 text-sm font-bold text-white shadow-sm transition hover:bg-dashboard-rider-dark"
          >
            <Plus className="h-4 w-4" />
            New Ticket
          </button>
        </header>

        <section className="rounded-2xl border border-slate-100 bg-white shadow-sm">
          <div className="flex items-center justify-between gap-3 border-b border-slate-100 p-5">
            <div>
              <h3 className="text-lg font-bold text-slate-900">My Tickets</h3>
              <p className="text-sm text-slate-500">
                {tickets.length} active conversation{tickets.length === 1 ? "" : "s"}
              </p>
            </div>
            <button
              type="button"
              onClick={refetch}
              disabled={isLoading}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:opacity-50"
              aria-label="Refresh tickets"
            >
              <RefreshCw className={cn("h-4 w-4", isLoading && "animate-spin")} />
            </button>
          </div>

          {isLoading ? (
            <div className="grid gap-3 p-5">
              {Array.from({ length: 4 }, (_, index) => (
                <div
                  key={index}
                  className="h-24 animate-pulse rounded-xl border border-slate-100 bg-slate-50"
                />
              ))}
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
              <AlertCircle className="h-10 w-10 text-red-400" />
              <h3 className="mt-4 text-lg font-bold text-slate-900">
                Could not load support tickets
              </h3>
              <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                Please retry in a moment.
              </p>
              <button
                type="button"
                onClick={refetch}
                className="mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-dashboard-rider px-4 text-sm font-semibold text-white transition hover:bg-dashboard-rider-dark"
              >
                <RefreshCw className="h-4 w-4" />
                Retry
              </button>
            </div>
          ) : tickets.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
              <Inbox className="h-12 w-12 text-green-300" />
              <h3 className="mt-4 text-lg font-bold text-slate-900">
                No support conversations yet
              </h3>
              <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                Start a ticket and your conversation history will appear here.
              </p>
              <button
                type="button"
                onClick={() => setIsCreateOpen(true)}
                className="mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-dashboard-rider px-4 text-sm font-semibold text-white transition hover:bg-dashboard-rider-dark"
              >
                <Plus className="h-4 w-4" />
                New Ticket
              </button>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {tickets.map((ticket) => {
                const submitted = formatDate(ticket.createdAt);
                const lastMessage = getLastMessage(ticket);

                return (
                  <button
                    key={ticket.id}
                    type="button"
                    onClick={() => setSelectedId(ticket.id)}
                    className="flex w-full flex-col gap-4 p-5 text-left transition hover:bg-slate-50 md:flex-row md:items-center md:justify-between"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="truncate text-base font-bold text-slate-900">
                          {ticket.subject}
                        </h4>
                        <span
                          className={cn(
                            "inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold",
                            statusStyles[ticket.status] ||
                              "border-slate-100 bg-slate-50 text-slate-600",
                          )}
                        >
                          {formatStatus(ticket.status)}
                        </span>
                      </div>
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
                        {lastMessage
                          ? `${lastMessage.isAdmin ? "Support" : "You"}: ${lastMessage.message}`
                          : "No messages yet."}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center justify-between gap-4 md:justify-end">
                      <div className="text-left md:text-right">
                        <p className="text-sm font-semibold text-slate-700">
                          {submitted.date}
                        </p>
                        <p className="text-xs text-slate-400">{submitted.time}</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-slate-300" />
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </section>
      </div>

      <ContactSupportModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />

      {selectedId && (
        <div className="fixed inset-0 z-[100] flex justify-end bg-slate-950/50">
          <button
            type="button"
            className="hidden flex-1 lg:block"
            onClick={() => setSelectedId(null)}
            aria-label="Close support conversation"
          />
          <aside className="flex h-full w-full max-w-xl flex-col bg-white shadow-xl">
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-slate-100 bg-white p-6">
              <div className="min-w-0">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-dashboard-rider">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <h3 className="truncate text-xl font-bold text-slate-900">
                  {selectedTicket?.subject || "Support Conversation"}
                </h3>
                {selectedTicket && (
                  <p className="mt-1 text-xs text-slate-500">
                    Opened {formatDate(selectedTicket.createdAt).date}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                className="rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                aria-label="Close conversation"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {isDetailLoading && !selectedTicket ? (
              <div className="grid flex-1 place-items-center text-dashboard-rider">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : selectedTicket ? (
              <>
                <div className="border-b border-slate-100 px-6 py-4">
                  <span
                    className={cn(
                      "inline-flex rounded-full border px-3 py-1.5 text-xs font-semibold",
                      statusStyles[selectedTicket.status] ||
                        "border-slate-100 bg-slate-50 text-slate-600",
                    )}
                  >
                    {formatStatus(selectedTicket.status)}
                  </span>
                </div>

                <div className="flex-1 space-y-4 overflow-y-auto p-6">
                  {selectedTicket.messages.length === 0 ? (
                    <p className="py-10 text-center text-sm text-slate-400">
                      No messages yet.
                    </p>
                  ) : (
                    selectedTicket.messages.map((message) => {
                      const sent = formatDate(message.createdAt);
                      return (
                        <div
                          key={message.id}
                          className={cn("flex", message.isAdmin ? "justify-start" : "justify-end")}
                        >
                          <div
                            className={cn(
                              "max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-6",
                              message.isAdmin
                                ? "rounded-bl-md bg-slate-100 text-slate-700"
                                : "rounded-br-md bg-dashboard-rider text-white",
                            )}
                          >
                            <p>{message.message}</p>
                            <p
                              className={cn(
                                "mt-1.5 text-[10px]",
                                message.isAdmin ? "text-slate-400" : "text-green-100",
                              )}
                            >
                              {message.isAdmin ? "Support" : "You"} - {sent.date} {sent.time}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                <div className="border-t border-slate-100 bg-white p-6">
                  <textarea
                    value={replyText}
                    onChange={(event) => setReplyText(event.target.value)}
                    placeholder="Type your reply..."
                    rows={3}
                    className="w-full resize-none rounded-xl border border-slate-200 p-4 text-sm text-slate-700 outline-none transition focus:border-dashboard-rider focus:ring-2 focus:ring-green-500/20"
                  />
                  <div className="mt-3 flex justify-end">
                    <button
                      type="button"
                      onClick={handleReply}
                      disabled={isReplying || !replyText.trim()}
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-dashboard-rider px-5 text-sm font-semibold text-white transition hover:bg-dashboard-rider-dark disabled:opacity-50"
                    >
                      {isReplying ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                      Send Reply
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="grid flex-1 place-items-center p-6 text-center text-sm text-slate-500">
                Ticket not found.
              </div>
            )}
          </aside>
        </div>
      )}
    </>
  );
}
