import {
  CalendarDays,
  ClipboardCheck,
  FileText,
  LayoutTemplate,
  MessageSquareText,
  NotebookTabs,
} from "lucide-react";

import { Button } from "../common/Button";
import { DashboardCard } from "../layout/DashboardCard";
import type { ResourceItem, ResourceType } from "../../features/dashboard/resourcesTypes";

type ResourceCardProps = {
  resource: ResourceItem;
  onOpenResource: (resource: ResourceItem) => void;
};

const typeIcons: Record<ResourceType, typeof FileText> = {
  template: LayoutTemplate,
  guide: FileText,
  checklist: ClipboardCheck,
  script: MessageSquareText,
  calendar: CalendarDays,
  worksheet: NotebookTabs,
};

export function ResourceCard({ onOpenResource, resource }: ResourceCardProps) {
  const Icon = typeIcons[resource.type];

  return (
    <DashboardCard as="article" className="flex min-h-[280px] flex-col" hover>
      <div className="flex items-start justify-between gap-4">
        <span className="grid size-11 shrink-0 place-items-center rounded-md bg-cyan-50 text-cyan-700">
          <Icon aria-hidden="true" className="size-5" />
        </span>
        {resource.featured && (
          <span className="rounded-md border border-amber-200 bg-amber-50 px-2 py-1 text-xs font-bold text-amber-800">
            Featured
          </span>
        )}
      </div>

      <h3 className="mt-4 text-lg font-bold text-slate-950">{resource.title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{resource.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-700">
          {resource.category}
        </span>
        <span className="rounded-md border border-cyan-200 bg-cyan-50 px-2.5 py-1 text-xs font-bold capitalize text-cyan-800">
          {resource.type}
        </span>
      </div>

      <div className="mt-auto pt-5">
        <Button
          aria-label={`Open resource: ${resource.title}`}
          className="w-full"
          onClick={() => onOpenResource(resource)}
          variant="secondary"
        >
          Open Resource
        </Button>
      </div>
    </DashboardCard>
  );
}
