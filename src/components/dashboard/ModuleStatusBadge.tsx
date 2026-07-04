import type { ModuleStatus } from "../../features/dashboard/dashboardTypes";
import { cn } from "../../lib/cn";

type ModuleStatusBadgeProps = {
  label: string;
  status: ModuleStatus;
};

const statusClassNames: Record<ModuleStatus, string> = {
  not_started: "border-slate-200 bg-slate-100 text-slate-700",
  in_progress: "border-amber-200 bg-amber-50 text-amber-800",
  complete: "border-emerald-200 bg-emerald-50 text-emerald-700",
};

export function ModuleStatusBadge({ label, status }: ModuleStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex min-h-7 items-center rounded-md border px-2.5 text-xs font-bold",
        statusClassNames[status],
      )}
    >
      {label}
    </span>
  );
}
