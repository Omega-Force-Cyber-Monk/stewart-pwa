import { X, CheckCircle2, AlertCircle, Info, HelpCircle, Loader2 } from "lucide-react";
import { cn } from "../../lib/cn";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: "success" | "error" | "info" | "confirm";
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  isLoading?: boolean;
}

export function AlertModal({
  isOpen,
  onClose,
  title,
  message,
  type = "info",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  isLoading = false,
}: AlertModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-[2px] animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-[420px] shadow-2xl p-6 sm:p-8 relative zoom-in-95 animate-in duration-200 text-center flex flex-col items-center">
        {/* Close button (only if not a mandatory confirmation loading) */}
        {!isLoading && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Icon based on type */}
        <div className="mb-5 shrink-0">
          {type === "success" && (
            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center text-green-500">
              <CheckCircle2 className="w-10 h-10" />
            </div>
          )}
          {type === "error" && (
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-500">
              <AlertCircle className="w-10 h-10" />
            </div>
          )}
          {type === "info" && (
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
              <Info className="w-10 h-10" />
            </div>
          )}
          {type === "confirm" && (
            <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
              <HelpCircle className="w-10 h-10" />
            </div>
          )}
        </div>

        {/* Text Details */}
        <h3 className="text-[18px] font-bold text-slate-900 mb-2 tracking-tight">
          {title}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed mb-6 px-1">
          {message}
        </p>

        {/* Action Buttons */}
        <div className="w-full flex flex-col sm:flex-row gap-3">
          {type === "confirm" ? (
            <>
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="flex-1 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 px-4 py-2.5 rounded-xl text-sm font-bold transition-all disabled:opacity-50"
              >
                {cancelText}
              </button>
              <button
                type="button"
                onClick={onConfirm}
                disabled={isLoading}
                className="flex-1 bg-[#22c55e] hover:bg-[#1ea951] text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                {confirmText}
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className={cn(
                "w-full px-6 py-2.5 rounded-xl text-sm font-bold transition-all text-white",
                type === "success" && "bg-green-600 hover:bg-green-700",
                type === "error" && "bg-red-600 hover:bg-red-700",
                type === "info" && "bg-[#22c55e] hover:bg-[#1ea951]"
              )}
            >
              Okay
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
