interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function LogoutModal({ isOpen, onClose, onConfirm }: LogoutModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden flex flex-col p-8 text-center">
        <h3 className="text-2xl font-bold text-slate-800 mb-2">
          Are You Sure You Want to<br />Log Out?
        </h3>
        <p className="text-sm text-slate-500 mb-8">
          We'll be here when you're ready to grow your business again.
        </p>

        <div className="flex items-center gap-4">
          <button 
            onClick={onClose}
            className="w-1/2 py-3 rounded-lg bg-[#ef4444] hover:bg-red-600 text-white font-semibold transition-colors shadow-sm"
          >
            No
          </button>
          <button 
            onClick={onConfirm}
            className="w-1/2 py-3 rounded-lg bg-[#22c55e] hover:bg-green-600 text-white font-semibold transition-colors shadow-sm"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
