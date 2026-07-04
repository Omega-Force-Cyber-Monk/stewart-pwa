import { Clock3, PackageCheck, Workflow } from "lucide-react";

import { DashboardCard } from "../layout/DashboardCard";
import { ResponsiveGrid } from "../layout/ResponsiveGrid";

type ProjectSummaryProps = {
  currentStage: string;
  estimatedCompletion: string;
  purchasedPackage: string;
};

export function ProjectSummary({
  currentStage,
  estimatedCompletion,
  purchasedPackage,
}: ProjectSummaryProps) {
  const summaryItems = [
    {
      icon: Workflow,
      label: "Current Stage",
      value: currentStage,
    },
    {
      icon: Clock3,
      label: "Estimated Completion",
      value: estimatedCompletion,
    },
    {
      icon: PackageCheck,
      label: "Purchased Package",
      value: purchasedPackage,
    },
  ];

  return (
    <DashboardCard as="section">
      <div>
        <p className="text-sm font-bold uppercase tracking-wide text-cyan-700">
          Project Status
        </p>
        <h2 className="mt-2 text-2xl font-bold text-slate-950">
          Done-For-You delivery pipeline
        </h2>
      </div>

      <ResponsiveGrid className="mt-5" columns={3} gap="sm">
        {summaryItems.map((item) => {
          const Icon = item.icon;

          return (
            <article className="rounded-lg border border-slate-200 bg-slate-50 p-4" key={item.label}>
              <Icon aria-hidden="true" className="size-5 text-cyan-700" />
              <p className="mt-3 text-sm font-semibold text-slate-500">{item.label}</p>
              <p className="mt-1 text-base font-bold text-slate-950">{item.value}</p>
            </article>
          );
        })}
      </ResponsiveGrid>
    </DashboardCard>
  );
}
