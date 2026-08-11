import { Receipt, Download, Loader2, Inbox } from "lucide-react";
import { useGetRiderPaymentHistoryQuery } from "../store/api/Payment/payment.api";
import type { PaymentRecord } from "../store/api/Payment/payment.type";

const statusStyles: Record<string, string> = {
  paid: "bg-green-100 text-green-700 border border-green-200",
  pending: "bg-amber-100 text-amber-700 border border-amber-200",
  failed: "bg-red-100 text-red-700 border border-red-200",
  expired: "bg-slate-100 text-slate-600 border border-slate-200",
};

const formatDate = (iso: string) => {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
};

const orderLabel = (payment: PaymentRecord) => {
  const names = payment.items.map((item) => item.name);
  return names.length > 0 ? names.join(" + ") : "Package";
};

export default function BillingPage() {
  const { data, isLoading, isError } = useGetRiderPaymentHistoryQuery();

  const orders = data?.payments ?? [];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[24px] font-bold text-slate-900 mb-2">Billing & Orders</h1>
        <p className="text-sm text-slate-500">
          View your payment history, invoices, and receipts for your one-time purchases.
        </p>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-16 text-slate-400">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      )}

      {!isLoading && isError && (
        <div className="flex flex-col items-center justify-center py-16 text-slate-500 gap-2">
          <Inbox className="w-8 h-8 text-slate-300" />
          <p className="text-sm">Failed to load payment history. Please try again.</p>
        </div>
      )}

      {!isLoading && !isError && orders.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-slate-500 gap-2">
          <Inbox className="w-8 h-8 text-slate-300" />
          <p className="text-sm">No orders yet. Purchase a package to get started.</p>
        </div>
      )}

      <div className="flex flex-col gap-6">
        {orders.map((payment) => (
          <div key={payment.id} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm relative">
            <div className="absolute top-6 sm:top-8 right-6 sm:right-8">
              <span className={`px-4 py-1.5 rounded-lg text-[12px] font-bold capitalize ${statusStyles[payment.status] ?? "bg-slate-100 text-slate-600"}`}>
                {payment.status}
              </span>
            </div>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-green-50 text-green-500 flex items-center justify-center shrink-0 border border-green-100">
                <Receipt className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[13px] font-bold text-green-600 mb-0.5 capitalize">
                  {orderLabel(payment)}
                </p>
                <h3 className="text-[16px] font-bold text-slate-900">
                  Order {payment.id.slice(0, 8).toUpperCase()}
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 border-t border-slate-100 pt-6">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-slate-400">
                  <Receipt className="w-3.5 h-3.5" />
                  <span className="text-[12px]">Order ID</span>
                </div>
                <span className="text-[14px] font-bold text-slate-800">{payment.id.slice(0, 8).toUpperCase()}</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-slate-400">
                  <Receipt className="w-3.5 h-3.5" />
                  <span className="text-[12px]">Purchase Date</span>
                </div>
                <span className="text-[14px] font-bold text-slate-800">{formatDate(payment.createdAt)}</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-slate-400">
                  <Receipt className="w-3.5 h-3.5" />
                  <span className="text-[12px]">Amount</span>
                </div>
                <span className="text-[14px] font-bold text-slate-800">
                  ${((payment.totalAmount ?? 0) / 100).toFixed(2)}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-slate-400">
                  <Receipt className="w-3.5 h-3.5" />
                  <span className="text-[12px]">Payment Method</span>
                </div>
                <span className="text-[14px] font-bold text-slate-800 capitalize">Stripe · {(payment.currency ?? "usd").toUpperCase()}</span>
              </div>
            </div>

            {payment.items.length > 0 && (
              <div className="flex flex-col gap-1 mb-6 border-t border-slate-100 pt-4">
                {payment.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-[13px]">
                    <span className="text-slate-500">{item.name} × {item.quantity}</span>
                    <span className="font-bold text-slate-800">${((item.totalAmount ?? 0) / 100).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-end">
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-xl font-bold text-[13px] transition-colors shadow-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                <Download className="w-4 h-4" />
                Download Invoice
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
