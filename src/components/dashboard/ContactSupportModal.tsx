import { MessageCircle } from "lucide-react";

interface ContactSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactSupportModal({ isOpen, onClose }: ContactSupportModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div 
        className="bg-white rounded-[24px] w-full max-w-[500px] shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 sm:p-8 flex flex-col gap-6">
          
          <div className="flex items-center justify-between">
            <h2 className="text-[20px] font-bold text-slate-900">Need Help?</h2>
            <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600">
              <MessageCircle className="w-5 h-5" />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-bold text-slate-900">Subject</label>
              <input 
                type="text" 
                placeholder="Type help subject"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-[14px] text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-bold text-slate-900">Details</label>
              <input 
                type="text" 
                placeholder="Type message"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-[14px] text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 mt-2">
            <button 
              onClick={onClose}
              className="flex-1 py-3.5 rounded-xl border border-red-400 text-red-500 font-bold text-[15px] hover:bg-red-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={onClose}
              className="flex-1 py-3.5 rounded-xl bg-[#2ea043] hover:bg-[#238636] text-white font-bold text-[15px] transition-colors"
            >
              Submit
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
