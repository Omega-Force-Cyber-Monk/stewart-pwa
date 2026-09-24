import { Check, Copy, Download, ExternalLink, FileText, Link as LinkIcon, Play } from "lucide-react";
import { useState } from "react";
import type { DfyAsset } from "../../store/api/DoneForYou/dfy.type";
import { copyToClipboard } from "../../utils/clipboard";
import { assetUrl, downloadAsset, isImageAsset, isVideoAsset } from "./dfyUtils";

interface DfyAssetGalleryProps {
  assets: DfyAsset[];
  onDelete?: (asset: DfyAsset) => void;
  admin?: boolean;
}

export function DfyAssetGallery({ assets, onDelete, admin = false }: DfyAssetGalleryProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (assets.length === 0) {
    return <p className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">No assets available yet.</p>;
  }

  const copyText = async (asset: DfyAsset) => {
    const text = asset.textContent || asset.linkUrl || asset.fileUrl || "";
    if (await copyToClipboard(text)) {
      setCopiedId(asset.id);
      window.setTimeout(() => setCopiedId(null), 1600);
    }
  };

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {assets.map((asset) => {
        const url = assetUrl(asset);
        const canCopy = Boolean(asset.textContent || asset.linkUrl);
        return (
          <article key={asset.id} className="min-w-0 rounded-lg border border-slate-200 bg-white p-3">
            {isImageAsset(asset) && url ? (
              <img src={url} alt={asset.title} className="aspect-video w-full rounded-md bg-slate-100 object-cover" />
            ) : isVideoAsset(asset) && url ? (
              <video controls preload="metadata" className="aspect-video w-full rounded-md bg-slate-950">
                <source src={url} type={asset.mimeType || "video/mp4"} />
                <track kind="captions" />
              </video>
            ) : (
              <div className="grid aspect-video place-items-center rounded-md bg-slate-100 text-slate-500">
                {asset.assetType === "LINK" ? <LinkIcon className="h-8 w-8" /> : asset.assetType === "TEXT" ? <Copy className="h-8 w-8" /> : <FileText className="h-8 w-8" />}
              </div>
            )}
            <div className="mt-3 min-w-0">
              <h4 className="truncate text-sm font-semibold text-slate-900">{asset.title}</h4>
              {asset.textContent && <p className="mt-2 line-clamp-4 whitespace-pre-wrap rounded-md bg-slate-50 p-3 text-xs leading-5 text-slate-600">{asset.textContent}</p>}
              <div className="mt-3 flex flex-wrap gap-2">
                {url && (
                  <a href={url} target="_blank" rel="noopener noreferrer" className="cursor-pointer inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50">
                    {isVideoAsset(asset) ? <Play className="h-3.5 w-3.5" /> : <ExternalLink className="h-3.5 w-3.5" />}
                    Open
                  </a>
                )}
                {url && (
                  <button type="button" onClick={() => downloadAsset(asset)} className="cursor-pointer inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50">
                    <Download className="h-3.5 w-3.5" />
                    Download
                  </button>
                )}
                {canCopy && (
                  <button type="button" onClick={() => copyText(asset)} className="cursor-pointer inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50">
                    {copiedId === asset.id ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                    {copiedId === asset.id ? "Caption copied" : "Copy"}
                  </button>
                )}
                {admin && onDelete && (
                  <button type="button" onClick={() => onDelete(asset)} className="cursor-pointer inline-flex items-center rounded-md border border-red-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50">
                    Remove
                  </button>
                )}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

