import { X } from "lucide-react";
import { type ReactNode, useId } from "react";

import { cn } from "../../lib/cn";
import { Button } from "./Button";

type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title: string;
  className?: string;
};

export function Modal({ children, className, isOpen, onClose, title }: ModalProps) {
  const titleId = useId();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/45 px-4">
      <section
        aria-labelledby={titleId}
        aria-modal="true"
        className={cn("w-full max-w-lg rounded-lg bg-white p-5 shadow-xl outline-none", className)}
        role="dialog"
      >
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-slate-950" id={titleId}>{title}</h2>
          <Button
            aria-label="Close modal"
            className="size-9 px-0"
            onClick={onClose}
            variant="ghost"
          >
            <X aria-hidden="true" className="size-4" />
          </Button>
        </div>
        <div className="mt-4">{children}</div>
      </section>
    </div>
  );
}
