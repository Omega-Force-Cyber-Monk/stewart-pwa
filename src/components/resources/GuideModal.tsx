import { BookOpen, X } from "lucide-react";
import { useGetGuideQuery } from "../../store/api/Business/business.api";
import type { BusinessResource } from "../../store/api/Business/business.type";

interface GuideModalProps {
  resource: BusinessResource | null;
  onClose: () => void;
}

function sanitizeHtml(value: string) {
  if (typeof window === "undefined") return value.replace(/<script[\s\S]*?<\/script>/gi, "");
  const template = document.createElement("template");
  template.innerHTML = value;
  template.content.querySelectorAll("script,style,iframe,object,embed").forEach((node) => node.remove());
  template.content.querySelectorAll("*").forEach((node) => {
    [...node.attributes].forEach((attribute) => {
      if (attribute.name.toLowerCase().startsWith("on") || attribute.name.toLowerCase() === "style") node.removeAttribute(attribute.name);
    });
  });
  return template.innerHTML;
}

export function GuideModal({ resource, onClose }: GuideModalProps) {
  const { data, isLoading, isError } = useGetGuideQuery(resource?.id ?? "", { skip: !resource });
  if (!resource) return null;
  const guide = data?.data ?? data;
  const title = guide?.name || resource.name || resource.title || "Guide";
  const description = guide?.description || resource.description || "";

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-slate-950/60 p-4" role="dialog" aria-modal="true" aria-labelledby="guide-modal-title">
      <div className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-blue-50 text-blue-600"><BookOpen className="h-5 w-5" /></span>
            <div>
              <h2 id="guide-modal-title" className="text-base font-semibold text-slate-900">{title}</h2>
              <span className="mt-1 inline-flex rounded-full border border-orange-200 bg-orange-50 px-2 py-0.5 text-[10px] font-medium text-orange-600">Guide</span>
            </div>
          </div>
          <button type="button" onClick={onClose} aria-label="Close guide" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"><X className="h-5 w-5" /></button>
        </div>
        {isLoading && <p className="py-10 text-center text-sm text-slate-500">Loading guide…</p>}
        {isError && <p className="py-10 text-center text-sm text-red-600">Unable to load this guide.</p>}
        {!isLoading && !isError && (
          <div className="prose prose-sm mt-5 max-w-none text-slate-600">
            {description && <p>{description}</p>}
            <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(guide?.body || "") }} />
          </div>
        )}
      </div>
    </div>
  );
}
