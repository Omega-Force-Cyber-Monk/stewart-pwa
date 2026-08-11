import { useState } from "react";
import { Eye, Filter, ChevronLeft, ChevronRight, Loader2, X, Download, ExternalLink } from "lucide-react";
import { cn } from "../lib/cn";
import {
  useGetAdminPaymentsQuery,
  useGetAdminPaymentQuery,
  useGetAdminPaymentReceiptQuery,
} from "../store/api/Admin/admin.api";
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
  paid: "bg-green-50 text-green-600 border border-green-100",
  pending: "bg-yellow-50 text-yellow-600 border border-yellow-100",
  failed: "bg-red-50 text-red-600 border border-red-100",
  expired: "bg-slate-50 text-slate-600 border border-slate-200",
};

const formatMoney = (total: number, currency = "usd") =>
  `${currency === "usd" ? "$" : ""}${total.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;

const formatDate = (iso: string | null | undefined) => {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return iso;
  }
};

export default function AdminBillingsPage() {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [purchaseTypeFilter, setPurchaseTypeFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { data, isLoading, isError, refetch } = useGetAdminPaymentsQuery({
    page,
    limit: PAGE_SIZE,
    status: statusFilter || undefined,
    purchaseType: purchaseTypeFilter || undefined,
    category: categoryFilter || undefined,
  });

  // Payment detail drawer
  const { data: detailData, isFetching: isDetailLoading } = useGetAdminPaymentQuery(selectedId ?? "", {
    skip: !selectedId,
  });

  // Receipt (only fetched when the drawer is open and the payment has a receipt)
  const { data: receiptData, isFetching: isReceiptLoading } = useGetAdminPaymentReceiptQuery(
    selectedId ?? "",
    {
      skip: !selectedId || !detailData?.payment?.receipt,
    }
  );

  const payments = data?.payments ?? [];
  const pagination = data?.pagination;
  const payment = detailData?.payment;
  const { showAlert, alertDialog } = useConfirmDialog();

  const handleDownloadReceipt = () => {
    if (!payment || !payment.receipt) {
      showAlert({ title: "Receipt Not Available", message: "This payment has no receipt yet.", type: "info" });
      return;
    }
    const url = receiptData?.receiptUrl || payment.receipt.fileUrl;
    if (url) {
      window.open(url, "_blank");
    } else {
      showAlert({ title: "Receipt Not Available", message: "This payment has no receipt yet.", type: "info" });
    }
  };

  return (
    <>
      <div className="flex flex-col space-y-6 flex-1">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Billing Overview</h2>
            <p className="text-slate-500 text-sm mt-1">
              Track all one-time payments and add-on purchases made by drivers.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col">
          {/* Table Header Controls */}
          <div className="flex flex-col sm:flex-row flex-wrap sm:items-center justify-between p-6 gap-4 border-b border-slate-50">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
              {categoryTabs.map((tab) => (
                <button
                  key={tab.value || "all"}
                  onClick={() => { setCategoryFilter(tab.value); setPage(1); }}
                  className={cn(
                    "px-6 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap",
                    categoryFilter === tab.value
                      ? "border border-blue-200 text-blue-600 bg-blue-50/50"
                      : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                  )}
                >
                  {tab.name}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors text-sm",
                showFilters || statusFilter || purchaseTypeFilter
                  ? "bg-[#1a56ff] text-white"
                  : "bg-[#f0f4ff] text-[#1a56ff] hover:bg-blue-100"
              )}
            >
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>

          {/* Filter Row */}
          {showFilters && (
            <div className="flex flex-col sm:flex-row gap-3 px-6 pb-6">
              <select
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                className="px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm text-slate-700"
              >
                <option value="">All payment statuses</option>
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="failed">Failed</option>
                <option value="expired">Expired</option>
              </select>
              <select
                value={purchaseTypeFilter}
                onChange={(e) => { setPurchaseTypeFilter(e.target.value); setPage(1); }}
                className="px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm text-slate-700"
              >
                <option value="">All purchase types</option>
                <option value="SETUP_PAYMENT">Setup Payment</option>
                <option value="ADDON_PAYMENT">Add-on Payment</option>
              </select>
            </div>
          )}

          {/* Table Content */}
          <div className="overflow-x-auto flex-1 p-6 pt-0">
            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-8 h-8 text-[#1a56ff] animate-spin" />
              </div>
            ) : isError ? (
              <div className="flex flex-col items-center justify-center py-16 gap-3">
                <p className="text-sm text-slate-500">Failed to load payments.</p>
                <button onClick={refetch} className="px-4 py-2 rounded-lg bg-[#1a56ff] text-white text-sm font-medium hover:bg-blue-700">
                  Retry
                </button>
              </div>
            ) : (
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-[#1a56ff] bg-[#f0f4ff] font-medium">
                  <tr>
                    <th className="px-6 py-4 rounded-tl-lg">Transaction ID</th>
                    <th className="px-6 py-4">Driver Name</th>
                    <th className="px-6 py-4">Driver Category</th>
                    <th className="px-6 py-4">Purchased Product</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Payment Method</th>
                    <th className="px-6 py-4">Purchase Date</th>
                    <th className="px-6 py-4">Payment Status</th>
                    <th className="px-6 py-4 text-center rounded-tr-lg">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="px-6 py-10 text-center text-slate-400 text-sm">
                        No payments found.
                      </td>
                    </tr>
                  ) : (
                    payments.map((payment) => (
                      <tr key={payment.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-slate-700">{payment.id}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-[#f0f4ff] text-[#1a56ff] flex items-center justify-center text-xs font-bold">
                              {(payment.rider.name || payment.rider.email || "?").slice(0, 2).toUpperCase()}
                            </span>
                            <span className="font-medium text-slate-800">{payment.rider.name || payment.rider.email}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-slate-600">
                          {payment.rider.driverProfile?.category || "—"}
                        </td>
                        <td className="px-6 py-4 text-slate-600">
                          {payment.lineItems?.map((li) => li.name).join(", ") || "—"}
                        </td>
                        <td className="px-6 py-4 font-medium text-slate-800">
                          {formatMoney(payment.amount?.total, payment.amount?.currency)}
                        </td>
                        <td className="px-6 py-4 text-slate-600">Stripe</td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-slate-800 font-medium">{formatDate(payment.createdAt)}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={cn(
                            "inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium capitalize",
                            statusStyles[payment.status] || "bg-slate-50 text-slate-600"
                          )}>
                            {payment.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => setSelectedId(payment.id)}
                            className="text-green-500 hover:text-green-600 transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4 mx-auto" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>

          {/* Table Footer / Pagination */}
          {pagination && pagination.total > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 border-t border-slate-50 bg-white">
              <span className="text-sm text-slate-500">
                Showing {payments.length} of {pagination.total} payments
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

      {/* Payment Detail Drawer */}
      {selectedId && (
        <div className="fixed inset-0 z-[100] bg-black/50 flex justify-end">
          <div className="bg-white w-full max-w-xl h-full overflow-y-auto flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100 sticky top-0 bg-white">
              <h3 className="text-xl font-bold text-slate-800">Billing Details</h3>
              <button onClick={() => setSelectedId(null)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {isDetailLoading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-8 h-8 text-[#1a56ff] animate-spin" />
              </div>
            ) : payment ? (
              <div className="p-6 space-y-6">
                {/* Rider Info */}
                <div className="bg-slate-50 rounded-xl p-5">
                  <h4 className="text-sm font-bold text-slate-700 mb-3">Rider</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-slate-500 block text-xs">Name</span>
                      <span className="font-medium text-slate-800">{payment.rider.name || "—"}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-xs">Email</span>
                      <span className="font-medium text-slate-800 break-all">{payment.rider.email}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-xs">Phone</span>
                      <span className="font-medium text-slate-800">{payment.rider.phone || "—"}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-xs">Driver Code</span>
                      <span className="font-medium text-slate-800">{payment.rider.driverProfile?.driverCode || "—"}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-xs">Category</span>
                      <span className="font-medium text-slate-800">{payment.rider.driverProfile?.category || "—"}</span>
                    </div>
                  </div>
                </div>

                {/* Business */}
                {payment.rider.business && (
                  <div className="bg-slate-50 rounded-xl p-5">
                    <h4 className="text-sm font-bold text-slate-700 mb-3">Business</h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-slate-500 block text-xs">Name</span>
                        <span className="font-medium text-slate-800">{payment.rider.business.businessName}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-xs">Slug</span>
                        <span className="font-medium text-slate-800">{payment.rider.business.slug}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-xs">Status</span>
                        <span className="font-medium text-slate-800">{payment.rider.business.status}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Line Items */}
                <div>
                  <h4 className="text-sm font-bold text-slate-700 mb-3">Products</h4>
                  <div className="border border-slate-100 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50 text-xs text-slate-500">
                        <tr>
                          <th className="px-4 py-2.5 text-left font-medium">Product</th>
                          <th className="px-4 py-2.5 text-center font-medium">Qty</th>
                          <th className="px-4 py-2.5 text-right font-medium">Unit Price</th>
                          <th className="px-4 py-2.5 text-right font-medium">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {payment.lineItems.map((li) => (
                          <tr key={li.id} className="border-t border-slate-50">
                            <td className="px-4 py-3 font-medium text-slate-800">{li.name}</td>
                            <td className="px-4 py-3 text-center text-slate-600">{li.quantity}</td>
                            <td className="px-4 py-3 text-right text-slate-600">{formatMoney(li.unitAmount)}</td>
                            <td className="px-4 py-3 text-right font-semibold text-slate-800">{formatMoney(li.totalAmount)}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="border-t border-slate-100 bg-slate-50">
                          <td colSpan={3} className="px-4 py-3 text-right font-bold text-slate-700">Total</td>
                          <td className="px-4 py-3 text-right font-bold text-slate-800">
                            {formatMoney(payment.amount?.total, payment.amount?.currency)}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>

                {/* Status & Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 rounded-xl p-4">
                    <span className="text-slate-500 block text-xs">Status</span>
                    <span className={cn(
                      "inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium capitalize mt-1",
                      statusStyles[payment.status] || "bg-slate-50 text-slate-600"
                    )}>
                      {payment.status}
                    </span>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4">
                    <span className="text-slate-500 block text-xs">Paid Date</span>
                    <span className="font-medium text-slate-800 text-sm mt-1 block">{formatDate(payment.paidAt)}</span>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4">
                    <span className="text-slate-500 block text-xs">Created</span>
                    <span className="font-medium text-slate-800 text-sm mt-1 block">{formatDate(payment.createdAt)}</span>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4">
                    <span className="text-slate-500 block text-xs">Stripe Session</span>
                    <span className="font-medium text-slate-800 text-sm mt-1 block break-all">
                      {payment.stripeCheckoutSessionId || "—"}
                    </span>
                  </div>
                </div>

                {/* Receipt */}
                <div className="bg-slate-50 rounded-xl p-5">
                  <h4 className="text-sm font-bold text-slate-700 mb-3">Receipt</h4>
                  {payment.receipt ? (
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div>
                        <span className="text-slate-500 block text-xs">Receipt No</span>
                        <span className="font-medium text-slate-800 text-sm">{payment.receipt.receiptNo || "—"}</span>
                      </div>
                      <button
                        onClick={handleDownloadReceipt}
                        disabled={isReceiptLoading}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#22c55e] hover:bg-[#16a34a] text-white font-semibold text-sm disabled:opacity-50"
                      >
                        {isReceiptLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                        Download Receipt
                      </button>
                    </div>
                  ) : (
                    <p className="text-sm text-slate-400">Receipt not available</p>
                  )}
                </div>

                {/* Stripe References (display only) */}
                {(payment.stripePaymentIntentId || payment.checkoutUrl) && (
                  <div className="bg-slate-50 rounded-xl p-5">
                    <h4 className="text-sm font-bold text-slate-700 mb-3">Stripe References</h4>
                    <div className="space-y-2 text-sm">
                      {payment.stripePaymentIntentId && (
                        <div className="flex justify-between gap-4">
                          <span className="text-slate-500 text-xs">Payment Intent</span>
                          <span className="font-medium text-slate-800 text-xs break-all">{payment.stripePaymentIntentId}</span>
                        </div>
                      )}
                      {payment.checkoutUrl && (
                        <a
                          href={payment.checkoutUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 text-[#1a56ff] hover:underline text-xs font-medium"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          View Checkout Session
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-6 text-sm text-slate-500">Payment not found.</div>
            )}
          </div>
        </div>
      )}

      {/* Sweet-alert style modal */}
      {alertDialog}
    </>
  );
}
