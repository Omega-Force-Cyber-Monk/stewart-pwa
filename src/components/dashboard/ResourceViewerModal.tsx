import { useEffect, useRef, useState } from "react";
import { Download, FileText, Image as ImageIcon, Loader2, X } from "lucide-react";
import { useLazyDownloadBusinessResourceQuery } from "../../store/api/Business/business.api";
import type { BusinessResource } from "../../store/api/Business/business.type";

interface ResourceViewerModalProps {
  resource: BusinessResource | null;
  isOpen: boolean;
  onClose: () => void;
  onOpened?: (resource: BusinessResource) => void;
}

type PreviewKind = "pdf" | "image" | "unsupported";

function getFilename(resource: BusinessResource) {
  return resource.fileUrl.split("/").pop() || `${resource.title}.pdf`;
}

function getPreviewKind(resource: BusinessResource, blob: Blob): PreviewKind {
  if (resource.type === "IMAGE" || blob.type.startsWith("image/")) return "image";
  if (resource.type === "PDF_DOCUMENT" || blob.type === "application/pdf") return "pdf";
  return "unsupported";
}

export default function ResourceViewerModal({
  resource,
  isOpen,
  onClose,
  onOpened,
}: ResourceViewerModalProps) {
  const [downloadResource] = useLazyDownloadBusinessResourceQuery();
  const onOpenedRef = useRef(onOpened);
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const [previewKind, setPreviewKind] = useState<PreviewKind>("unsupported");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    onOpenedRef.current = onOpened;
  }, [onOpened]);

  useEffect(() => {
    if (!isOpen || !resource) return;

    let active = true;
    let createdUrl: string | null = null;
    setIsLoading(true);
    setError(null);
    setObjectUrl(null);

    downloadResource(resource.id)
      .unwrap()
      .then((blob) => {
        if (!active) return;
        createdUrl = window.URL.createObjectURL(blob);
        setObjectUrl(createdUrl);
        setPreviewKind(getPreviewKind(resource, blob));
        onOpenedRef.current?.(resource);
      })
      .catch(() => {
        if (active) setError("Unable to open this resource. Please try again.");
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
      if (createdUrl) window.URL.revokeObjectURL(createdUrl);
    };
  }, [downloadResource, isOpen, resource]);

  useEffect(() => {
    if (!isOpen) {
      setObjectUrl(null);
      setError(null);
      setIsLoading(false);
    }
  }, [isOpen]);

  if (!isOpen || !resource) return null;

  const handleDownload = () => {
    if (!objectUrl) return;
    const anchor = document.createElement("a");
    anchor.href = objectUrl;
    anchor.download = getFilename(resource);
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resource-viewer-title"
    >
      <div className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-5 py-4">
          <div className="min-w-0">
            <h2 id="resource-viewer-title" className="truncate text-base font-bold text-slate-900">
              {resource.title}
            </h2>
            <p className="truncate text-xs text-slate-500">{resource.description}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
            aria-label="Close resource viewer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex min-h-[320px] flex-1 items-center justify-center overflow-auto bg-slate-100 p-4 sm:p-6">
          {isLoading && <Loader2 className="h-8 w-8 animate-spin text-green-500" />}
          {!isLoading && error && (
            <div className="text-center">
              <p className="mb-3 text-sm font-medium text-red-600">{error}</p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="text-sm font-semibold text-green-600 hover:text-green-700"
              >
                Try again
              </button>
            </div>
          )}
          {!isLoading && !error && objectUrl && previewKind === "pdf" && (
            <iframe
              src={objectUrl}
              title={resource.title}
              className="h-[68vh] min-h-[320px] w-full rounded-lg border border-slate-200 bg-white"
            />
          )}
          {!isLoading && !error && objectUrl && previewKind === "image" && (
            <img
              src={objectUrl}
              alt={resource.title}
              className="max-h-[68vh] max-w-full rounded-lg object-contain shadow-sm"
            />
          )}
          {!isLoading && !error && objectUrl && previewKind === "unsupported" && (
            <div className="max-w-sm text-center">
              <FileText className="mx-auto mb-3 h-12 w-12 text-blue-500" />
              <p className="text-sm font-semibold text-slate-800">Preview is not available for this file type.</p>
              <p className="mt-1 text-xs text-slate-500">Download the resource to open it on your device.</p>
            </div>
          )}
          {!isLoading && !error && !objectUrl && (
            <ImageIcon className="h-10 w-10 text-slate-300" />
          )}
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-slate-200 px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handleDownload}
            disabled={!objectUrl}
            className="flex items-center gap-2 rounded-lg bg-[#22c55e] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#1ea951] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            Download
          </button>
        </div>
      </div>
    </div>
  );
}
