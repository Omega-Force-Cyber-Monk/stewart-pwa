import { Search, Loader2, Play, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ResourceCard } from "../components/resources/ResourceCard";
import { normalizedType } from "../components/resources/resourceUtils";
import { GuideModal } from "../components/resources/GuideModal";
import { useGetBusinessResourcesQuery, useLazyDownloadBusinessResourceQuery } from "../store/api/Business/business.api";
import type { BusinessResource } from "../store/api/Business/business.type";
import { useLanguage } from '../i18n/LanguageProvider';

const filters = ["all", "video", "pdf", "link", "guide"] as const;
type ResourceFilter = (typeof filters)[number];

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export default function ResourcesAndGuidesPage() {
  const { language, setLanguage } = useLanguage();
  const spanish = language === 'es';
  const [downloadError, setDownloadError] = useState(false);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<ResourceFilter>("all");
  const [selectedGuide, setSelectedGuide] = useState<BusinessResource | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<BusinessResource | null>(null);
  const [downloadResource] = useLazyDownloadBusinessResourceQuery();

  useEffect(() => {
    const timeout = window.setTimeout(() => setQuery(search.trim()), 300);
    return () => window.clearTimeout(timeout);
  }, [search]);

  const { currentData: data, isFetching: isLoading, isError } = useGetBusinessResourcesQuery({
    language,
    search: query || undefined,
    type: filter === "all" ? undefined : filter,
    limit: 50,
  });
  const resources = data?.resources ?? [];

  const handleAction = async (resource: BusinessResource) => {
    setDownloadError(false);
    const type = normalizedType(resource);
    if (type === "guide") {
      setSelectedGuide(resource);
      return;
    }
    if (type === "video") {
      setSelectedVideo(resource);
      return;
    }
    if (type === "link") {
      if (resource.linkUrl || resource.fileUrl) window.open(resource.linkUrl || resource.fileUrl || "", "_blank", "noopener,noreferrer");
      return;
    }
    try {
      const blob = await downloadResource(resource.id).unwrap();
      downloadBlob(blob, `${resource.name || resource.title || "resource"}.pdf`);
    } catch {
      setDownloadError(true);
    }
  };

  return (
    <div className="space-y-6" lang={language}>
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">{spanish ? 'Recursos y guías' : 'Resources & Guides'}</h2>
        <p className="mt-1 text-sm text-slate-500">{spanish ? 'Encuentra guías paso a paso, guiones, plantillas y recursos descargables para atraer más clientes y aumentar tus reservas directas.' : 'Access step-by-step guides, scripts, templates, and downloadable resources designed to help you attract more customers and increase direct bookings.'}</p>
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="English / Español">
          {(['en', 'es'] as const).map((value) => <button key={value} type="button" lang={value} aria-pressed={language === value} onClick={() => {
            setLanguage(value);
            setSearch('');
            setQuery('');
            setDownloadError(false);
            setSelectedGuide(null);
            setSelectedVideo(null);
          }} className={`rounded-lg border px-4 py-2 text-sm font-medium ${language === value ? 'border-dashboard-rider bg-dashboard-rider text-white' : 'border-slate-300 bg-white text-slate-700'}`}>{value === 'es' ? 'Español' : 'English'}</button>)}
        </div>
      </div>
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={(event) => setSearch(event.target.value)} aria-label={spanish ? 'Buscar recursos' : 'Search resources'} placeholder={spanish ? 'Buscar recursos' : 'Search all lessons'} className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-12 pr-4 text-sm text-slate-900 outline-none focus:border-dashboard-rider focus:ring-2 focus:ring-green-100 placeholder:text-slate-400" />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-500">{spanish ? 'Mostrando' : 'Showing'} {data?.pagination?.total ?? resources.length} {spanish ? 'recursos' : 'resources'}</p>
        <select value={filter} onChange={(event) => setFilter(event.target.value as ResourceFilter)} className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 outline-none focus:border-dashboard-rider">
          <option value="all">{spanish ? 'Todos los recursos' : 'All resources'}</option>
          {filters.slice(1).map((item) => <option key={item} value={item}>{spanish ? ({ all: 'Todos los recursos', video: 'Video', pdf: 'PDF', link: 'Enlace', guide: 'Guía' })[item] : item[0].toUpperCase() + item.slice(1)}</option>)}
        </select>
      </div>
      {isLoading && <div className="grid place-items-center py-20 text-dashboard-rider"><Loader2 className="h-8 w-8 animate-spin" /></div>}
      {isError && <div role="alert" className="rounded-xl border border-red-100 bg-red-50 p-6 text-center text-sm text-red-700">{spanish ? 'No se pueden cargar los recursos en este momento.' : 'Unable to load resources right now.'}</div>}
      {downloadError && <p role="alert" className="text-sm text-red-700">{spanish ? 'No se pudo descargar el archivo. Inténtalo de nuevo.' : 'Unable to download the file. Please try again.'}</p>}
      {!isLoading && !isError && resources.length === 0 && <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center text-sm text-slate-500">{spanish ? 'No hay recursos que coincidan con tu búsqueda.' : 'No resources match your search.'}</div>}
      {!isLoading && !isError && resources.length > 0 && <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{resources.map((resource) => <ResourceCard key={resource.id} resource={resource} language={language} onAction={handleAction} />)}</div>}
      <GuideModal resource={selectedGuide} onClose={() => setSelectedGuide(null)} />
      {selectedVideo && (
        <div className="fixed inset-0 z-[90] grid place-items-center bg-slate-950/70 p-4" role="dialog" aria-modal="true">
          <div className="w-full max-w-4xl overflow-hidden rounded-xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4"><div><p className="text-xs text-slate-500">Resources &amp; Guide &gt; Video</p><h2 className="font-semibold text-slate-900">{selectedVideo.name || selectedVideo.title}</h2></div><button type="button" onClick={() => setSelectedVideo(null)} aria-label="Close video"><X className="h-5 w-5 text-slate-500" /></button></div>
            <div className="bg-slate-950"><video controls autoPlay className="max-h-[65vh] w-full" src={selectedVideo.fileUrl || undefined}><track kind="captions" /></video></div>
            <div className="space-y-2 p-5"><h3 className="text-lg font-semibold text-slate-900">{selectedVideo.name || selectedVideo.title}</h3><p className="text-sm leading-6 text-slate-600">{selectedVideo.description}</p><span className="inline-flex items-center gap-2 text-xs text-slate-400"><Play className="h-3.5 w-3.5" /> Video resource</span></div>
          </div>
        </div>
      )}
    </div>
  );
}
