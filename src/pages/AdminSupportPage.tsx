import { formatCategory } from "../lib/formatCategory";
import { useState } from "react";
import { Eye, Trash2, ChevronLeft, ChevronRight, Loader2, X, Send, Search } from "lucide-react";
import { cn } from "../lib/cn";
import {
  useGetAdminTicketsQuery,
  useGetAdminTicketQuery,
  useReplyToAdminTicketMutation,
  useUpdateAdminTicketStatusMutation,
  useDeleteAdminTicketMutation,
} from "../store/api/Admin/admin.api";
import type { TicketListItem } from "../store/api/Admin/admin.type";
import { useConfirmDialog } from "../hooks/useConfirmDialog";

const PAGE_SIZE = 10;

const categoryTabs = [
  { name: "All", value: "" },
  { name: "Women Focused", value: "WOMEN" },
  { name: "Couples", value: "COUPLE" },
  { name: "Drivers 50+", value: "FIFTY_PLUS" },
  { name: "Main", value: "STANDARD" },
  { name: "Spanish", value: "SPANISH" },
];

const statusStyles: Record<string, string> = {
  PENDING: "bg-amber-50 text-amber-600 border border-amber-100",
  UNDER_REVIEW: "bg-blue-50 text-blue-600 border border-blue-100",
  COMPLETED: "bg-green-50 text-green-600 border border-green-100",
};

const statusDotStyles: Record<string, string> = {
  PENDING: "bg-amber-500",
  UNDER_REVIEW: "bg-blue-500",
  COMPLETED: "bg-green-500",
};

const formatDate = (iso: string) => {
  try {
    const d = new Date(iso);
    return {
      date: d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      time: d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
    };
  } catch {
    return { date: iso, time: "" };
  }
};

export default function AdminSupportPage() {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [notifyEmail, setNotifyEmail] = useState(true);

  const { data, isLoading, isError, refetch } = useGetAdminTicketsQuery({
    page,
    limit: PAGE_SIZE,
    status: statusFilter || undefined,
    category: categoryFilter || undefined,
    search: search || undefined,
  });

  const { data: detailData, isFetching: isDetailLoading } = useGetAdminTicketQuery(selectedId ?? "", {
    skip: !selectedId,
  });

  const [replyToTicket, { isLoading: isReplying }] = useReplyToAdminTicketMutation();
  const [updateStatus, { isLoading: isUpdatingStatus }] = useUpdateAdminTicketStatusMutation();
  const [deleteTicket, { isLoading: isDeleting }] = useDeleteAdminTicketMutation();

  const tickets = data?.tickets ?? [];
  const pagination = data?.pagination;
  const ticket = detailData?.ticket;
  const { openConfirm, confirmDialog, showAlert, alertDialog } = useConfirmDialog();

  const handleReply = async () => {
    if (!selectedId || !replyText.trim()) return;
    try {
      await replyToTicket({
        id: selectedId,
        message: replyText.trim(),
        notifyEmail,
      }).unwrap();
      setReplyText("");
    } catch (err) {
      console.error("Failed to reply:", err);
      showAlert({ title: "Error", message: "Failed to send reply.", type: "error" });
    }
  };

  const handleStatusChange = async (status: string) => {
    if (!selectedId) return;
    try {
      await updateStatus({ id: selectedId, status }).unwrap();
    } catch (err) {
      console.error("Failed to update status:", err);
      showAlert({ title: "Error", message: "Failed to update ticket status.", type: "error" });
    }
  };

  const handleDelete = (ticket: TicketListItem) => {
    openConfirm(
      {
        title: "Delete Ticket",
        message: "Delete this support ticket?",
        confirmText: "Yes, delete",
      },
      async () => {
        try {
          await deleteTicket(ticket.id).unwrap();
        } catch (err) {
          console.error("Failed to delete ticket:", err);
          showAlert({ title: "Error", message: "Failed to delete ticket.", type: "error" });
        }
      }
    );
  };

  return (
    <>
      <div className="flex flex-col space-y-6 flex-1">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Support Messages</h2>
          <p className="text-slate-500 text-sm mt-1">
            View and manage support requests submitted by drivers.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
          {categoryTabs.map((tab) => (
            <button
              key={tab.value || "all"}
              onClick={() => { setCategoryFilter(tab.value); setPage(1); }}
              className={cn(
                "px-6 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap",
                categoryFilter === tab.value
                  ? "border border-blue-200 text-blue-600 bg-blue-50/50"
                  : "border border-slate-200 text-slate-600 bg-white hover:bg-slate-50"
              )}
            >
              {tab.name}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col">
          <div className="flex flex-col sm:flex-row flex-wrap sm:items-center justify-between p-6 gap-4 border-b border-slate-50">
            <h3 className="text-lg font-bold text-slate-800">Support Tickets</h3>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                  placeholder="Search tickets..."
                  className="pl-9 pr-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm w-full sm:w-56"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                className="px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm text-slate-700"
              >
                <option value="">All statuses</option>
                <option value="PENDING">Pending</option>
                <option value="UNDER_REVIEW">Under Review</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto flex-1 p-6 pt-0">
            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-8 h-8 text-[#1a56ff] animate-spin" />
              </div>
            ) : isError ? (
              <div className="flex flex-col items-center justify-center py-16 gap-3">
                <p className="text-sm text-slate-500">Failed to load support tickets.</p>
                <button onClick={refetch} className="px-4 py-2 rounded-lg bg-[#1a56ff] text-white text-sm font-medium hover:bg-blue-700">
                  Retry
                </button>
              </div>
            ) : (
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-[#1a56ff] bg-[#f0f4ff] font-medium">
                  <tr>
                    <th className="px-6 py-4 rounded-tl-lg">Support ID</th>
                    <th className="px-6 py-4">Driver Name</th>
                    <th className="px-6 py-4">Driver Category</th>
                    <th className="px-6 py-4">Subject</th>
                    <th className="px-6 py-4">Date Submitted</th>
                    <th className="px-6 py-4 text-center">Status</th>
                    <th className="px-6 py-4 text-center rounded-tr-lg">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-10 text-center text-slate-400 text-sm">
                        No support tickets found.
                      </td>
                    </tr>
                  ) : (
                    tickets.map((ticket) => {
                      const submitted = formatDate(ticket.createdAt);
                      return (
                        <tr key={ticket.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 font-medium text-slate-700">{ticket.id}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <span className="w-8 h-8 rounded-full bg-[#f0f4ff] text-[#1a56ff] flex items-center justify-center text-xs font-bold">
                                {(ticket.rider.name || ticket.rider.email || "?").slice(0, 2).toUpperCase()}
                              </span>
                              <span className="font-medium text-slate-800">{ticket.rider.name || ticket.rider.email}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-slate-600">
                            {formatCategory(ticket.rider.driverProfile?.category)}
                          </td>
                          <td className="px-6 py-4 text-slate-600">{ticket.subject}</td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <span className="text-slate-800 font-medium">{submitted.date}</span>
                              <span className="text-slate-500 text-xs">{submitted.time}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <div className="flex justify-center">
                              <span className={cn(
                                "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium",
                                statusStyles[ticket.status] || "bg-slate-50 text-slate-600"
                              )}>
                                <span className={cn("w-1.5 h-1.5 rounded-full", statusDotStyles[ticket.status] || "bg-slate-500")} />
                                {ticket.status}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center gap-3">
                              <button
                                onClick={() => setSelectedId(ticket.id)}
                                className="text-green-500 hover:text-green-600 transition-colors"
                                title="View Conversation"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(ticket)}
                                disabled={isDeleting}
                                className="text-red-500 hover:text-red-600 transition-colors disabled:opacity-50"
                                title="Delete Ticket"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            )}
          </div>

          {/* Table Footer / Pagination */}
          {pagination && pagination.total > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 border-t border-slate-50 bg-white">
              <span className="text-sm text-slate-500">
                Showing {tickets.length} of {pagination.total} tickets
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 bg-slate-50 hover:bg-slate-100 transition-colors disabled:opacity-40"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {Array.from({ length: Math.max(1, pagination.totalPages) }, (_, i) => i + 1)
                  .slice(0, 5)
                  .map((n) => (
                    <button
                      key={n}
                      onClick={() => setPage(n)}
                      className={cn(
                        "w-8 h-8 flex items-center justify-center rounded-lg font-medium text-sm transition-colors",
                        page === n ? "text-white bg-[#1a56ff]" : "text-slate-600 bg-slate-50 hover:bg-slate-100"
                      )}
                    >
                      {n}
                    </button>
                  ))}
                <button
                  onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                  disabled={page >= pagination.totalPages}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 bg-slate-50 hover:bg-slate-100 transition-colors disabled:opacity-40"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Conversation Drawer */}
      {selectedId && (
        <div className="fixed inset-0 z-[100] bg-black/50 flex justify-end">
          <div className="bg-white w-full max-w-xl h-full overflow-y-auto flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100 sticky top-0 bg-white z-10">
              <div>
                <h3 className="text-xl font-bold text-slate-800">{ticket?.subject || "Support Conversation"}</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {ticket?.rider?.name || ticket?.rider?.email || ""}
                  {ticket?.business ? ` · ${ticket.business.businessName || ""}` : ""}
                </p>
              </div>
              <button onClick={() => setSelectedId(null)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {isDetailLoading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-8 h-8 text-[#1a56ff] animate-spin" />
              </div>
            ) : ticket ? (
              <>
                {/* Status controls */}
                <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium text-slate-500 mr-1">Status:</span>
                  {["PENDING", "UNDER_REVIEW", "COMPLETED"].map((s) => (
                    <button
                      key={s}
                      onClick={() => handleStatusChange(s)}
                      disabled={isUpdatingStatus || ticket.status === s}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-xs font-medium transition-colors border",
                        ticket.status === s
                          ? statusStyles[s] || "bg-slate-50 text-slate-600"
                          : "border-slate-200 text-slate-600 hover:bg-slate-50"
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>

                {/* Messages */}
                <div className="flex-1 p-6 space-y-4 overflow-y-auto">
                  {ticket.messages.length === 0 ? (
                    <p className="text-sm text-slate-400 text-center py-8">No messages yet.</p>
                  ) : (
                    ticket.messages.map((msg) => (
                      <div key={msg.id} className={cn("flex", msg.isAdmin ? "justify-end" : "justify-start")}>
                        <div className={cn(
                          "max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                          msg.isAdmin
                            ? "bg-[#1a56ff] text-white rounded-br-md"
                            : "bg-slate-100 text-slate-700 rounded-bl-md"
                        )}>
                          <p>{msg.message}</p>
                          <p className={cn("text-[10px] mt-1.5", msg.isAdmin ? "text-blue-100" : "text-slate-400")}>
                            {msg.isAdmin ? "Admin" : "Driver"} · {formatDate(msg.createdAt).date} {formatDate(msg.createdAt).time}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Reply box */}
                <div className="p-6 border-t border-slate-100 sticky bottom-0 bg-white">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your reply..."
                    rows={3}
                    className="w-full p-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors resize-none text-slate-700 text-sm"
                  />
                  <div className="flex items-center justify-between mt-3">
                    <label className="flex items-center gap-2 text-sm text-slate-600">
                      <input
                        type="checkbox"
                        checked={notifyEmail}
                        onChange={(e) => setNotifyEmail(e.target.checked)}
                        className="rounded border-slate-300"
                      />
                      Notify driver by email
                    </label>
                    <button
                      onClick={handleReply}
                      disabled={isReplying || !replyText.trim()}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#22c55e] hover:bg-[#16a34a] text-white font-semibold transition-colors text-sm disabled:opacity-50"
                    >
                      {isReplying ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                      Send Reply
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="p-6 text-sm text-slate-500">Ticket not found.</div>
            )}
          </div>
        </div>
      )}

      {/* Sweet-alert style modals */}
      {confirmDialog}
      {alertDialog}
    </>
  );
}
