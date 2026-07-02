import { Check } from "lucide-react";
import { motion } from "motion/react";

type PurchaseSuccessAnimationProps = {
  preparingWorkspaceLabel: string;
  successMessage: string;
  successTitle: string;
};

export function PurchaseSuccessAnimation({
  preparingWorkspaceLabel,
  successMessage,
  successTitle,
}: PurchaseSuccessAnimationProps) {
  return (
    <div className="grid min-h-[360px] place-items-center p-8 text-center">
      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        className="grid size-20 place-items-center rounded-full bg-emerald-600 text-white"
        initial={{ opacity: 0, scale: 0.7 }}
        transition={{ duration: 0.25 }}
      >
        <motion.div
          animate={{ pathLength: 1 }}
          initial={{ pathLength: 0 }}
          transition={{ delay: 0.15, duration: 0.35 }}
        >
          <Check aria-hidden="true" className="size-10" />
        </motion.div>
      </motion.div>
      <div>
        <motion.h2
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 text-2xl font-bold text-slate-950"
          initial={{ opacity: 0, y: 8 }}
          transition={{ delay: 0.2 }}
        >
          {successTitle}
        </motion.h2>
        <motion.p
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-slate-600"
          initial={{ opacity: 0, y: 8 }}
          transition={{ delay: 0.28 }}
        >
          {successMessage}
        </motion.p>
        <motion.p
          animate={{ opacity: 1 }}
          className="mt-4 text-sm font-semibold text-cyan-700"
          initial={{ opacity: 0 }}
          transition={{ delay: 0.36 }}
        >
          {preparingWorkspaceLabel}
        </motion.p>
      </div>
    </div>
  );
}
