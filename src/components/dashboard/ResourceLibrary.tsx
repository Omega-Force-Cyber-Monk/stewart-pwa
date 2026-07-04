import { useDeferredValue, useState } from "react";

import { CategoryFilter } from "./CategoryFilter";
import { DownloadConfirmationModal } from "./DownloadConfirmationModal";
import { EmptyState } from "./EmptyState";
import { FeaturedResources } from "./FeaturedResources";
import { ResourceCard } from "./ResourceCard";
import { SearchBar } from "./SearchBar";
import { DashboardCard } from "../layout/DashboardCard";
import { ResponsiveGrid } from "../layout/ResponsiveGrid";
import {
  resourceCategories,
  resources,
  resourceTypes,
} from "../../features/dashboard/resourcesData";
import type {
  ResourceCategory,
  ResourceItem,
  ResourceType,
} from "../../features/dashboard/resourcesTypes";

export function ResourceLibrary() {
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory | "All">("All");
  const [selectedType, setSelectedType] = useState<ResourceType | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedResource, setSelectedResource] = useState<ResourceItem | null>(null);
  const deferredSearchQuery = useDeferredValue(searchQuery.trim().toLowerCase());

  const featuredResources = resources.filter((resource) => resource.featured);
  const filteredResources = resources.filter((resource) => {
    const matchesCategory =
      selectedCategory === "All" || resource.category === selectedCategory;
    const matchesType = selectedType === "All" || resource.type === selectedType;
    const searchableText = `${resource.title} ${resource.description} ${resource.category}`.toLowerCase();
    const matchesSearch =
      deferredSearchQuery.length === 0 || searchableText.includes(deferredSearchQuery);

    return matchesCategory && matchesType && matchesSearch;
  });

  return (
    <DashboardCard as="section" className="mt-10">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-bold uppercase tracking-wide text-cyan-700">
          Resource Toolbox
        </p>
        <h2 className="text-2xl font-bold tracking-normal text-slate-950">
          Business asset library
        </h2>
        <p className="max-w-3xl text-sm leading-6 text-slate-600">
          Browse templates, scripts, guides, and checklists you can use as placeholders
          for your launch workflow. These resources are frontend-only previews.
        </p>
      </div>

      <div className="mt-6 grid gap-5">
        <FeaturedResources
          onOpenResource={setSelectedResource}
          resources={featuredResources}
        />

        <div className="grid gap-5 rounded-lg border border-slate-200 bg-slate-50 p-4">
          <SearchBar
            label="Search resources"
            onChange={setSearchQuery}
            placeholder="Search by title, description, or category"
            value={searchQuery}
          />
          <CategoryFilter
            label="Category"
            onChange={setSelectedCategory}
            options={resourceCategories}
            selectedValue={selectedCategory}
          />
          <CategoryFilter
            label="Resource type"
            onChange={setSelectedType}
            options={resourceTypes}
            selectedValue={selectedType}
          />
        </div>

        {filteredResources.length > 0 ? (
          <ResponsiveGrid columns={3} gap="sm">
            {filteredResources.map((resource) => (
              <ResourceCard
                key={resource.id}
                onOpenResource={setSelectedResource}
                resource={resource}
              />
            ))}
          </ResponsiveGrid>
        ) : (
          <EmptyState
            description="Try changing the category, type, or search text to find another placeholder asset."
            title="No resources found"
          />
        )}
      </div>

      <DownloadConfirmationModal
        onClose={() => setSelectedResource(null)}
        resource={selectedResource}
      />
    </DashboardCard>
  );
}
