import { UserRound } from "lucide-react";
import { motion } from "motion/react";

type UploadPreviewProps = {
  emptyLabel: string;
  imageUrl?: string;
};

export function UploadPreview({ emptyLabel, imageUrl }: UploadPreviewProps) {
  if (!imageUrl) {
    return (
      <div className="grid aspect-square w-28 place-items-center rounded-lg border border-dashed border-slate-300 bg-slate-50 text-slate-400">
        <UserRound aria-hidden="true" className="size-9" />
        <span className="sr-only">{emptyLabel}</span>
      </div>
    );
  }

  return (
    <motion.img
      alt={emptyLabel}
      animate={{ opacity: 1, scale: 1 }}
      className="aspect-square w-28 rounded-lg object-cover ring-2 ring-cyan-100"
      initial={{ opacity: 0, scale: 0.95 }}
      src={imageUrl}
      transition={{ duration: 0.2 }}
    />
  );
}
