import type { PipelineStatus } from "../../features/dashboard/dfyPipelineTypes";
import { cn } from "../../lib/cn";

type PipelineStatusBadgeProps = {
  status: PipelineStatus;
};

const labels: Record<PipelineStatus, string> = {
  pending: "Upcoming",
  active: "Current",
  completed: "Completed",
};

const classNames: Record<PipelineStatus, string> = {
  pending: "border-slate-200 bg-slate-100 text-slate-600",
  active: "border-cyan-200 bg-cyan-50 text-cyan-800",
  completed: "border-emerald-200 bg-emerald-50 text-emerald-700",
};

export function PipelineStatusBadge({ status }: PipelineStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex min-h-7 items-center rounded-md border px-2.5 text-xs font-bold",
        classNames[status],
      )}
    >
      {labels[status]}
    </span>
  );
}
