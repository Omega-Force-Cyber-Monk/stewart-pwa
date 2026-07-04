import { CheckCircle2 } from "lucide-react";
import { useState } from "react";

import { Button } from "../common/Button";
import { DashboardCard } from "../layout/DashboardCard";
import { DownloadConfirmationModal } from "./DownloadConfirmationModal";
import type { ResourceItem } from "../../features/dashboard/resourcesTypes";

export function CurrentStageCard() {
  const [selectedResource, setSelectedResource] = useState<ResourceItem | null>(null);

  const deliverablesResource: ResourceItem = {
    id: "dfy-deliverables",
    title: "DFY Launch Deliverables",
    description: "Placeholder modal for completed launch assets.",
    category: "Operations",
    type: "guide",
  };

  return (
    <DashboardCard as="section" variant="success">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3">
          <CheckCircle2 aria-hidden="true" className="mt-1 size-6 text-emerald-700" />
          <div>
            <h2 className="text-xl font-bold text-emerald-950">
              Your business launch package has been completed.
            </h2>
            <p className="mt-1 text-sm leading-6 text-emerald-900">
              Your website, booking system, and launch assets are ready.
            </p>
          </div>
        </div>
        <Button onClick={() => setSelectedResource(deliverablesResource)} variant="secondary">
          View Deliverables
        </Button>
      </div>
      <DownloadConfirmationModal
        onClose={() => setSelectedResource(null)}
        resource={selectedResource}
      />
    </DashboardCard>
  );
}
