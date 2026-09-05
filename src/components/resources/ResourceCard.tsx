import {
  BookOpen,
  Download,
  ExternalLink,
  FileText,
  Play,
} from "lucide-react";
import type { BusinessResource, ResourceType } from "../../store/api/Business/business.type";
import { normalizedType } from "./resourceUtils";

interface ResourceCardProps {
  resource: BusinessResource;
  compact?: boolean;
  onAction: (resource: BusinessResource) => void;
}

const typeLabels: Record<ResourceType, string> = {
  video: "Video",
  pdf: "Pdf",
  link: "Link",
  guide: "Guide",
};

export function ResourceCard({ resource, compact = false, onAction }: ResourceCardProps) {
  const type = normalizedType(resource);
  const title = resource.name || resource.title || "Resource";
  const description = resource.description || "Access this resource to keep growing your business.";
  const fileUrl = resource.fileUrl || undefined;
  const icon = type === "video" ? <Play className="h-5 w-5" /> : type === "guide" ? <BookOpen className="h-5 w-5" /> : type === "link" ? <ExternalLink className="h-5 w-5" /> : <FileText className="h-5 w-5" />;
  const actionLabel = type === "video" ? "Open" : type === "pdf" ? "Download" : type === "guide" ? "View Guide" : "Open";

  return (
    <article className={`flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm ${compact ? "min-h-[190px]" : "min-h-[255px]"}`}>
      {type === "video" && fileUrl ? (
        <div className="relative h-32 overflow-hidden bg-slate-900">
          <video src={fileUrl} className="h-full w-full object-cover opacity-75" muted preload="metadata" />
          <span className="absolute inset-0 grid place-items-center text-white"><span className="grid h-11 w-11 place-items-center rounded-full bg-black/50"><Play className="ml-0.5 h-5 w-5 fill-current" /></span></span>
          {resource.durationSec ? <span className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-1 text-[10px] text-white">{Math.floor(resource.durationSec / 60)}:{String(resource.durationSec % 60).padStart(2, "0")}</span> : null}
        </div>
      ) : (
        <div className="flex items-center gap-3 px-4 pt-4">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-blue-50 text-blue-600">{icon}</span>
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-slate-900">{title}</h3>
            <span className={`mt-1 inline-flex rounded-full border px-2 py-0.5 text-[10px] font-medium ${type === "pdf" ? "border-violet-200 bg-violet-50 text-violet-600" : type === "guide" ? "border-orange-200 bg-orange-50 text-orange-600" : "border-cyan-200 bg-cyan-50 text-cyan-700"}`}>{typeLabels[type]}</span>
          </div>
        </div>
      )}
      <div className="flex flex-1 flex-col p-4">
        {type === "video" && <h3 className="mb-1 text-sm font-semibold text-slate-900">{title}</h3>}
        <p className="line-clamp-3 text-xs leading-5 text-slate-500">{description}</p>
        <button type="button" onClick={() => onAction(resource)} className="mt-auto flex w-full items-center justify-center gap-2 rounded-lg bg-dashboard-rider px-3 py-2 text-xs font-semibold text-white transition hover:bg-dashboard-rider-dark">
          {type === "pdf" ? <Download className="h-3.5 w-3.5" /> : type === "link" ? <ExternalLink className="h-3.5 w-3.5" /> : type === "video" ? <Play className="h-3.5 w-3.5" /> : <BookOpen className="h-3.5 w-3.5" />}
          {actionLabel}
        </button>
      </div>
    </article>
  );
}

