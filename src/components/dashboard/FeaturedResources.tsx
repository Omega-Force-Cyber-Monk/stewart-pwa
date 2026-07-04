import { ResourceCard } from "./ResourceCard";
import { DashboardCard } from "../layout/DashboardCard";
import { ResponsiveGrid } from "../layout/ResponsiveGrid";
import type { ResourceItem } from "../../features/dashboard/resourcesTypes";

type FeaturedResourcesProps = {
  resources: ResourceItem[];
  onOpenResource: (resource: ResourceItem) => void;
};

export function FeaturedResources({ onOpenResource, resources }: FeaturedResourcesProps) {
  if (resources.length === 0) return null;

  return (
    <DashboardCard as="section" variant="surface">
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-bold text-slate-950">Featured Resources</h3>
        <p className="text-sm text-slate-600">
          Start with the assets most drivers use early in the launch process.
        </p>
      </div>
      <ResponsiveGrid className="mt-5" columns={4} gap="sm">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} onOpenResource={onOpenResource} resource={resource} />
        ))}
      </ResponsiveGrid>
    </DashboardCard>
  );
}
