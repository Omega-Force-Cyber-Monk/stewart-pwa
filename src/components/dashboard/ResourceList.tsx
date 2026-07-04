import { FileText } from "lucide-react";
import { useState } from "react";

type ResourceListProps = {
  moduleTitle: string;
  resources: string[];
};

export function ResourceList({ moduleTitle, resources }: ResourceListProps) {
  const [openedResource, setOpenedResource] = useState<string | null>(null);

  const handleResourceClick = (resource: string) => {
    setOpenedResource(resource);
  };

  return (
    <div>
      <ul className="flex flex-wrap gap-2" aria-label={`${moduleTitle} resources`}>
        {resources.map((resource) => (
          <li key={resource}>
            <button
              aria-pressed={openedResource === resource}
              className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-slate-700 transition hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
              onClick={() => handleResourceClick(resource)}
              type="button"
            >
              <FileText aria-hidden="true" className="size-3.5" />
              {resource}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
