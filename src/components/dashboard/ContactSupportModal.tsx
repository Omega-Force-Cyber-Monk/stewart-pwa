import { useState } from "react";
import { MessageCircle, Loader2, CheckCircle2 } from "lucide-react";
import { useCreateRiderSupportTicketMutation } from "../../store/api/Support/support.api";

interface ContactSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactSupportModal({ isOpen, onClose }: ContactSupportModalProps) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [createTicket, { isLoading, isSuccess, isError }] =
    useCreateRiderSupportTicketMutation();

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!subject.trim() || !message.trim()) return;
    try {
      await createTicket({ subject: subject.trim(), message: message.trim() }).unwrap();
      setSubject("");
      setMessage("");
    } catch {
      // error surfaced via isError state below
    }
  };

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

          {isSuccess ? (
            <div className="flex flex-col items-center gap-3 py-6 text-center">
              <CheckCircle2 className="w-12 h-12 text-green-500" />
              <p className="text-[15px] font-semibold text-slate-900">Support ticket submitted</p>
              <p className="text-sm text-slate-500">Our team will get back to you shortly.</p>
              <button
                onClick={() => { onClose(); }}
                className="mt-2 px-6 py-3 rounded-xl bg-[#2ea043] hover:bg-[#238636] text-white font-bold text-[15px] transition-colors"
              >
                Done
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-bold text-slate-900">Subject</label>
                <input 
                  type="text" 
                  placeholder="Type help subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-[14px] text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-bold text-slate-900">Details</label>
                <input 
                  type="text" 
                  placeholder="Type message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-[14px] text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                />
              </div>

              {isError && (
                <p className="text-sm text-red-500 font-medium">
                  Failed to submit. Please try again.
                </p>
              )}
            </div>
          )}

          {!isSuccess && (
            <div className="flex items-center gap-4 mt-2">
              <button 
                onClick={onClose}
                disabled={isLoading}
                className="flex-1 py-3.5 rounded-xl border border-red-400 text-red-500 font-bold text-[15px] hover:bg-red-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmit}
                disabled={isLoading || !subject.trim() || !message.trim()}
                className="flex-1 py-3.5 rounded-xl bg-[#2ea043] hover:bg-[#238636] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-[15px] transition-colors inline-flex items-center justify-center gap-2"
              >
                {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
