import { TrendingUp } from "lucide-react";

import { ProgressBar } from "../common/ProgressBar";
import { DashboardCard } from "../layout/DashboardCard";

type LaunchProgressProps = {
  completedModules: number;
  motivationalMessage: string;
  percentageCompleted: number;
  title: string;
  totalModules: number;
};

export function LaunchProgress({
  completedModules,
  motivationalMessage,
  percentageCompleted,
  title,
  totalModules,
}: LaunchProgressProps) {
  return (
    <DashboardCard as="section">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3">
          <span className="grid size-11 place-items-center rounded-md bg-cyan-50 text-cyan-700">
            <TrendingUp aria-hidden="true" className="size-5" />
          </span>
          <div>
            <h2 className="text-lg font-bold text-slate-950">{title}</h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">{motivationalMessage}</p>
          </div>
        </div>
        <div className="text-left md:text-right">
          <p className="text-3xl font-bold text-slate-950">{percentageCompleted}%</p>
          <p className="text-sm font-semibold text-slate-500">
            {completedModules} of {totalModules} Modules Complete
          </p>
        </div>
      </div>
      <ProgressBar className="mt-5" value={percentageCompleted} />
    </DashboardCard>
  );
}
