import { ExternalLink, PackageCheck } from "lucide-react";
import { useState } from "react";

import { Button } from "../common/Button";
import { DashboardCard } from "../layout/DashboardCard";
import { ResponsiveGrid } from "../layout/ResponsiveGrid";
import { DownloadConfirmationModal } from "./DownloadConfirmationModal";
import type { ProjectDeliverable } from "../../features/dashboard/dfyPipelineTypes";
import type { ResourceItem } from "../../features/dashboard/resourcesTypes";

type DeliverablesSectionProps = {
  deliverables: ProjectDeliverable[];
};

const statusLabels: Record<ProjectDeliverable["status"], string> = {
  pending: "Pending",
  ready: "Ready",
};

function createDeliverableResource(deliverable: ProjectDeliverable): ResourceItem {
  return {
    id: deliverable.id,
    title: deliverable.title,
    description: "Placeholder deliverable preview for the DFY launch package.",
    category: "Operations",
    type: "guide",
  };
}

export function DeliverablesSection({ deliverables }: DeliverablesSectionProps) {
  const [selectedDeliverable, setSelectedDeliverable] = useState<ResourceItem | null>(null);

  return (
    <DashboardCard as="section">
      <div>
        <h2 className="text-xl font-bold text-slate-950">Example Deliverables</h2>
        <p className="mt-1 text-sm text-slate-600">
          These placeholder items represent what a completed launch package may include.
        </p>
      </div>

      <ResponsiveGrid className="mt-5" columns={4} gap="sm">
        {deliverables.map((deliverable) => (
          <article
            className="flex min-h-[190px] flex-col rounded-lg border border-slate-200 bg-slate-50 p-4"
            key={deliverable.id}
          >
            <PackageCheck aria-hidden="true" className="size-5 text-cyan-700" />
            <h3 className="mt-3 font-bold text-slate-950">{deliverable.title}</h3>
            <span className="mt-2 w-fit rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-bold text-slate-700">
              {statusLabels[deliverable.status]}
            </span>
            <Button
              className="mt-auto h-9 w-full"
              onClick={() => setSelectedDeliverable(createDeliverableResource(deliverable))}
              variant="secondary"
            >
              <ExternalLink aria-hidden="true" className="size-4" />
              View
            </Button>
          </article>
        ))}
      </ResponsiveGrid>

      <DownloadConfirmationModal
        onClose={() => setSelectedDeliverable(null)}
        resource={selectedDeliverable}
      />
    </DashboardCard>
  );
}
