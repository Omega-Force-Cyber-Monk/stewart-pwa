import { CheckCircle2, Circle, CircleDot } from "lucide-react";

import { PipelineStatusBadge } from "./PipelineStatusBadge";
import type { PipelineStatus, PipelineStep } from "../../features/dashboard/dfyPipelineTypes";
import { cn } from "../../lib/cn";

type PipelineStepCardProps = {
  step: PipelineStep;
  stepNumber: number;
  status: PipelineStatus;
};

export function PipelineStepCard({ status, step, stepNumber }: PipelineStepCardProps) {
  const StatusIcon =
    status === "completed" ? CheckCircle2 : status === "active" ? CircleDot : Circle;

  return (
    <article
      className={cn(
        "rounded-lg border bg-white p-4 shadow-sm transition",
        status === "active" && "border-cyan-300 ring-2 ring-cyan-100",
        status === "completed" && "border-emerald-200",
        status === "pending" && "border-slate-200",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={cn(
            "grid size-10 shrink-0 place-items-center rounded-full text-sm font-bold",
            status === "completed" && "bg-emerald-50 text-emerald-700",
            status === "active" && "bg-cyan-50 text-cyan-800",
            status === "pending" && "bg-slate-100 text-slate-500",
          )}
        >
          {stepNumber}
        </span>
        <PipelineStatusBadge status={status} />
      </div>
      <StatusIcon
        aria-hidden="true"
        className={cn(
          "mt-5 size-5",
          status === "completed" && "text-emerald-600",
          status === "active" && "text-cyan-700",
          status === "pending" && "text-slate-300",
        )}
      />
      <h3 className="mt-3 text-base font-bold text-slate-950">{step.title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>
    </article>
  );
}
