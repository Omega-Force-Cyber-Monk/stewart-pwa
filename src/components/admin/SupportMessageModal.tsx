import { MessageCircle } from "lucide-react";

interface SupportMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any | null;
}

export function SupportMessageModal({ isOpen, onClose, data }: SupportMessageModalProps) {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h3 className="text-xl font-bold text-slate-800">Support Messages</h3>
          <MessageCircle className="w-6 h-6 text-slate-400" />
        </div>

        {/* Message Content */}
        <div className="p-6 md:p-8 space-y-6">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-bold flex-shrink-0">
              {data.name.substring(0, 2).toUpperCase()}
            </div>
            <div className="pt-2 text-slate-700 text-sm leading-relaxed font-medium">
              Hi, I'm unable to update my profile picture. Could you please help?
            </div>
          </div>

          <div className="pt-2">
            <textarea 
              className="w-full h-32 p-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors resize-none text-slate-700"
              placeholder="Type message"
            ></textarea>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 md:p-8 pt-0 flex flex-col sm:flex-row items-center gap-4">
          <button 
            onClick={onClose}
            className="w-full sm:w-1/2 py-3 px-6 rounded-lg border border-red-500 text-red-500 font-semibold hover:bg-red-50 transition-colors"
          >
            Cancel
          </button>
          <button className="w-full sm:w-1/2 py-3 px-6 rounded-lg bg-[#22c55e] hover:bg-[#16a34a] text-white font-semibold shadow-sm transition-colors">
            Send Reply
          </button>
        </div>
      </div>
    </div>
  );
}
