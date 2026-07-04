import { Clock, PlayCircle } from "lucide-react";

import { Button } from "../common/Button";
import { DashboardCard } from "../layout/DashboardCard";
import { ModuleStatusBadge } from "./ModuleStatusBadge";
import { ResourceList } from "./ResourceList";
import type {
  DiyModule,
  ModuleStatus,
  ModuleStatusLabelMap,
} from "../../features/dashboard/dashboardTypes";

type ModuleCardProps = {
  module: DiyModule;
  status: ModuleStatus;
  statusLabels: ModuleStatusLabelMap;
  onCycleStatus: (moduleId: string) => void;
};

const actionLabels: ModuleStatusLabelMap = {
  not_started: "Start Module",
  in_progress: "Mark Complete",
  complete: "Reset Module",
};

export function ModuleCard({
  module,
  onCycleStatus,
  status,
  statusLabels,
}: ModuleCardProps) {
  return (
    <DashboardCard as="article" className="flex min-h-[330px] flex-col" hover>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-slate-950">{module.title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">{module.description}</p>
        </div>
        <ModuleStatusBadge label={statusLabels[status]} status={status} />
      </div>

      <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-500">
        <Clock aria-hidden="true" className="size-4" />
        {module.duration}
      </p>

      <div className="mt-5">
        <ResourceList moduleTitle={module.title} resources={module.resources} />
      </div>

      <div className="mt-auto pt-5">
        <Button
          aria-label={`${actionLabels[status]}: ${module.title}`}
          className="w-full"
          onClick={() => onCycleStatus(module.id)}
          variant={status === "complete" ? "secondary" : "primary"}
        >
          <PlayCircle aria-hidden="true" className="size-4" />
          {actionLabels[status]}
        </Button>
      </div>
    </DashboardCard>
  );
}
