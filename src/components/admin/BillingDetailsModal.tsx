import { X } from "lucide-react";

interface BillingDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any | null;
}

export function BillingDetailsModal({ isOpen, onClose, data }: BillingDetailsModalProps) {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4 border-b border-slate-100">
          <h3 className="text-xl font-bold text-slate-800">Billing Details</h3>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* User Info */}
        <div className="p-6 pb-4 border-b border-slate-100 flex items-center gap-4">
          <img 
            src={data.avatar || "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&q=80"} 
            alt={data.name} 
            className="w-14 h-14 rounded-full object-cover"
          />
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-slate-800">{data.name}</h4>
              <span className="text-sm text-slate-400">#0001</span>
            </div>
            <p className="text-sm text-slate-500 mt-0.5">Pena Airport Ride</p>
          </div>
        </div>

        {/* Details List */}
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-500">Transaction ID</span>
            <span className="text-sm font-medium text-slate-800">{data.id}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-500">Driver Name</span>
            <span className="text-sm font-medium text-slate-800">{data.name}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-500">Driver Category</span>
            <span className="text-sm font-medium text-slate-800">{data.category}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-500">Purchased Product</span>
            <span className="text-sm font-medium text-slate-800">{data.type}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-500">Amount</span>
            <span className="text-sm font-medium text-slate-800">{data.amount}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-500">Payment Method</span>
            <span className="text-sm font-medium text-slate-800">{data.method}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-500">Purchase Date</span>
            <span className="text-sm font-medium text-slate-800">{data.date}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-500">Payment Status</span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-green-50 text-green-600 border border-green-100">
              {data.status}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-2 border-t border-slate-100">
          <button className="w-full py-3 rounded-lg bg-[#22c55e] hover:bg-[#16a34a] text-white font-semibold shadow-sm transition-colors text-sm">
            Download Receipt
          </button>
        </div>
      </div>
    </div>
  );
}
