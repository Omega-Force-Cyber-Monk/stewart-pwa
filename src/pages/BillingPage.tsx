import { Receipt, Download } from "lucide-react";

export default function BillingPage() {
  const orders = [
    {
      id: "1",
      package: "Launch Package",
      title: "Women-Focused Private Airport Business™",
      orderId: "#QTA-1001",
      date: "Jan 12, 2026",
      amount: "$495.00",
      method: "Visa •••• 4242",
      status: "Paid"
    },
    {
      id: "2",
      package: "Add-Ons",
      title: "Booking Setup Add-on",
      orderId: "#QTA-1002",
      date: "Jan 15, 2026",
      amount: "$199.00",
      method: "Visa •••• 4242",
      status: "Paid"
    }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[24px] font-bold text-slate-900 mb-2">Billing & Orders</h1>
        <p className="text-sm text-slate-500">
          View your payment history, invoices, and receipts for your one-time purchases.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm relative">
            <div className="absolute top-6 sm:top-8 right-6 sm:right-8">
              <span className="bg-green-100 text-green-700 border border-green-200 px-4 py-1.5 rounded-lg text-[12px] font-bold">
                {order.status}
              </span>
            </div>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-green-50 text-green-500 flex items-center justify-center shrink-0 border border-green-100">
                <Receipt className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[13px] font-bold text-green-600 mb-0.5">{order.package}</p>
                <h3 className="text-[16px] font-bold text-slate-900">{order.title}</h3>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 border-t border-slate-100 pt-6">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-slate-400">
                  <Receipt className="w-3.5 h-3.5" />
                  <span className="text-[12px]">Order ID</span>
                </div>
                <span className="text-[14px] font-bold text-slate-800">{order.orderId}</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-slate-400">
                  <Receipt className="w-3.5 h-3.5" />
                  <span className="text-[12px]">Purchase Date</span>
                </div>
                <span className="text-[14px] font-bold text-slate-800">{order.date}</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-slate-400">
                  <Receipt className="w-3.5 h-3.5" />
                  <span className="text-[12px]">Amount</span>
                </div>
                <span className="text-[14px] font-bold text-slate-800">{order.amount}</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-slate-400">
                  <Receipt className="w-3.5 h-3.5" />
                  <span className="text-[12px]">Payment Method</span>
                </div>
                <span className="text-[14px] font-bold text-slate-800">{order.method}</span>
              </div>
            </div>

            <div className="flex justify-end">
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-xl font-bold text-[13px] transition-colors shadow-sm flex items-center gap-2">
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
