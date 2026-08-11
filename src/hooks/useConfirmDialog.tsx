import { useState, useCallback } from "react";
import { AlertModal } from "../components/ui/AlertModal";

interface ConfirmOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

interface AlertOptions {
  title: string;
  message: string;
  type?: "success" | "error" | "info";
}

interface ConfirmState extends ConfirmOptions {
  isOpen: boolean;
  isLoading: boolean;
  onConfirm: () => void | Promise<void>;
}

interface AlertState extends AlertOptions {
  isOpen: boolean;
  type: "success" | "error" | "info";
}

/**
 * Sweet-alert-style confirm/alert modal backed by the existing AlertModal.
 * Replaces window.confirm / window.alert in admin pages.
 */
export function useConfirmDialog() {
  const [confirm, setConfirm] = useState<ConfirmState | null>(null);
  const [alert, setAlert] = useState<AlertState | null>(null);

  const openConfirm = useCallback(
    (options: ConfirmOptions, onConfirm: () => void | Promise<void>) => {
      setConfirm({
        isOpen: true,
        isLoading: false,
        title: options.title,
        message: options.message,
        confirmText: options.confirmText,
        cancelText: options.cancelText,
        onConfirm,
      });
    },
    []
  );

  const closeConfirm = useCallback(() => setConfirm(null), []);

  const runConfirm = useCallback(async () => {
    if (!confirm) return;
    setConfirm((prev) => (prev ? { ...prev, isLoading: true } : prev));
    try {
      await confirm.onConfirm();
      setConfirm(null);
    } catch (err) {
      console.error("Confirm action failed:", err);
      setConfirm(null);
    }
  }, [confirm]);

  const showAlert = useCallback((options: AlertOptions) => {
    setAlert({ isOpen: true, type: options.type || "info", ...options });
  }, []);

  const closeAlert = useCallback(() => setAlert(null), []);

  return {
    openConfirm,
    closeConfirm,
    runConfirm,
    showAlert,
    closeAlert,
    confirmDialog: confirm ? (
      <AlertModal
        isOpen={confirm.isOpen}
        onClose={closeConfirm}
        title={confirm.title}
        message={confirm.message}
        type="confirm"
        confirmText={confirm.confirmText}
        cancelText={confirm.cancelText}
        onConfirm={runConfirm}
        isLoading={confirm.isLoading}
      />
    ) : null,
    alertDialog: alert ? (
      <AlertModal
        isOpen={alert.isOpen}
        onClose={closeAlert}
        title={alert.title}
        message={alert.message}
        type={alert.type}
      />
    ) : null,
  };
}
