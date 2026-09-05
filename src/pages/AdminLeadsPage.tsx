import { useState } from "react";
import { ChevronLeft, ChevronRight, Download, Eye, Loader2, Search, Trash2, X } from "lucide-react";
import { AdminStatusChip, DataTable } from "../components/admin/DataTable";
import { useConfirmDialog } from "../hooks/useConfirmDialog";
import { cn } from "../lib/cn";
import {
  useDeleteAdminLeadMutation,
  useGetAdminLeadQuery,
  useGetAdminLeadsQuery,
  useLazyExportAdminLeadsQuery,
  useUpdateAdminLeadStatusMutation,
} from "../store/api/Admin/admin.api";
import type { Lead } from "../store/api/Admin/admin.type";

const PAGE_SIZE = 10;
const statuses = ["NEW", "CONTACTED", "CONVERTED", "SPAM"] as const;
const sources = ["main", "senior", "women", "couple", "spanish"] as const;

type LeadStatus = (typeof statuses)[number];

type Filters = {
  page: number;
  limit: number;
  search?: string;
  sourcePage?: string;
  status?: string;
  from?: string;
  to?: string;
};

const formatDate = (value: string | null | undefined) => {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });
};

const value = (item: unknown) => item === null || item === undefined || item === "" ? "—" : String(item);

export default function LeadsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sourcePage, setSourcePage] = useState("");
  const [status, setStatus] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const filters: Filters = {
    page,
    limit: PAGE_SIZE,
    search: search || undefined,
    sourcePage: sourcePage || undefined,
    status: status || undefined,
    from: from || undefined,
    to: to || undefined,
  };

  const { data, isLoading, isError, refetch } = useGetAdminLeadsQuery(filters);
  const { data: detailData, isFetching: isDetailLoading } = useGetAdminLeadQuery(selectedId ?? "", { skip: !selectedId });
  const [updateLead, { isLoading: isUpdating }] = useUpdateAdminLeadStatusMutation();
  const [deleteLead, { isLoading: isDeleting }] = useDeleteAdminLeadMutation();
  const [exportLeads, { isFetching: isExporting }] = useLazyExportAdminLeadsQuery();
  const { openConfirm, confirmDialog, showAlert, alertDialog } = useConfirmDialog();

  const leads = data?.leads ?? [];
  const pagination = data?.pagination;
  const selectedLead = detailData?.lead;
  const changeFilter = (setter: (next: string) => void, next: string) => { setter(next); setPage(1); };

  const handleStatus = async (lead: Lead, nextStatus: string) => {
    try {
      await updateLead({ id: lead.id, status: nextStatus as LeadStatus }).unwrap();
    } catch (error) {
      console.error("Failed to update lead status:", error);
      showAlert({ title: "Error", message: "Failed to update lead status.", type: "error" });
    }
  };

  const handleDelete = (lead: Lead) => {
    openConfirm({ title: "Delete Lead", message: `Permanently delete the lead from ${lead.city || "this submission"}?`, confirmText: "Yes, delete" }, async () => {
      try {
        await deleteLead(lead.id).unwrap();
        if (selectedId === lead.id) setSelectedId(null);
      } catch (error) {
        console.error("Failed to delete lead:", error);
        showAlert({ title: "Error", message: "Failed to delete lead.", type: "error" });
      }
    });
  };

  const handleExport = async () => {
    try {
      const result = await exportLeads({ search: search || undefined, sourcePage: sourcePage || undefined, status: status || undefined, from: from || undefined, to: to || undefined }).unwrap();
      const blob = result instanceof Blob ? result : new Blob([result as BlobPart], { type: "text/csv;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "admin-leads.csv";
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to export leads:", error);
      showAlert({ title: "Error", message: "Failed to export leads.", type: "error" });
    }
  };

  return (
    <>
      <div className="flex flex-1 flex-col space-y-6">
        <div><h2 className="text-2xl font-bold text-slate-800">Lead Submissions</h2><p className="mt-1 text-sm text-slate-500">Review and manage exit-intent lead submissions.</p></div>
        <DataTable
          headers={["Phone", "City", "Source", "Submitted", "Status", "Actions"]}
          showing={pagination ? `Showing ${leads.length} of ${pagination.total} leads` : undefined}
          actions={<div className="flex w-full flex-col flex-wrap gap-3 sm:flex-row sm:items-center sm:justify-end">
            <div className="relative w-full sm:w-auto"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input value={search} onChange={(event) => changeFilter(setSearch, event.target.value)} placeholder="Search phone or city..." className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none sm:w-56" /></div>
            <select value={sourcePage} onChange={(event) => changeFilter(setSourcePage, event.target.value)} className="w-full sm:w-auto rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"><option value="">All sources</option>{sources.map((source) => <option key={source} value={source}>{source[0].toUpperCase() + source.slice(1)}</option>)}</select>
            <select value={status} onChange={(event) => changeFilter(setStatus, event.target.value)} className="w-full sm:w-auto rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"><option value="">All statuses</option>{statuses.map((item) => <option key={item} value={item}>{item[0] + item.slice(1).toLowerCase()}</option>)}</select>
            <div className="flex w-full gap-3 sm:w-auto">
              <input type="date" value={from} onChange={(event) => changeFilter(setFrom, event.target.value)} aria-label="From date" className="w-full sm:w-auto rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900" />
              <input type="date" value={to} onChange={(event) => changeFilter(setTo, event.target.value)} aria-label="To date" className="w-full sm:w-auto rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900" />
            </div>
            <button onClick={handleExport} disabled={isExporting} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-[#1a56ff] px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"><Download className="h-4 w-4" />{isExporting ? "Exporting..." : "Export CSV"}</button>
          </div>}
        >
          {isLoading ? <tr><td colSpan={6} className="py-16 text-center"><Loader2 className="mx-auto h-7 w-7 animate-spin text-blue-600" /></td></tr> : isError ? <tr><td colSpan={6} className="py-10 text-center text-sm text-slate-500">Failed to load leads. <button onClick={refetch} className="font-medium text-blue-600">Retry</button></td></tr> : leads.length === 0 ? <tr><td colSpan={6} className="py-10 text-center text-sm text-slate-400">No leads found.</td></tr> : leads.map((lead) => <tr key={lead.id} className="hover:bg-slate-50"><td className="whitespace-nowrap px-4 py-3 font-medium text-slate-700">{lead.phone}</td><td className="px-4 py-3 text-slate-600">{lead.city}</td><td className="px-4 py-3 text-slate-600">{lead.sourcePage}</td><td className="whitespace-nowrap px-4 py-3 text-slate-600">{formatDate(lead.submittedAt)}</td><td className="px-4 py-3"><AdminStatusChip status={lead.status} /></td><td className="px-4 py-3"><div className="flex items-center gap-3"><button title="View lead" onClick={() => setSelectedId(lead.id)} className="text-blue-600 hover:text-blue-800"><Eye className="h-4 w-4" /></button><button title="Delete lead" onClick={() => handleDelete(lead)} disabled={isDeleting} className="text-red-500 hover:text-red-700 disabled:opacity-50"><Trash2 className="h-4 w-4" /></button></div></td></tr>)}
        </DataTable>
        {pagination && pagination.totalPages > 1 && <div className="flex items-center justify-center gap-2"><button disabled={page <= 1} onClick={() => setPage((current) => current - 1)} className="rounded-lg bg-slate-100 p-2 disabled:opacity-40"><ChevronLeft className="h-4 w-4" /></button><span className="text-sm text-slate-600">Page {page} of {pagination.totalPages}</span><button disabled={page >= pagination.totalPages} onClick={() => setPage((current) => current + 1)} className="rounded-lg bg-slate-100 p-2 disabled:opacity-40"><ChevronRight className="h-4 w-4" /></button></div>}
      </div>
      {selectedId && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4" role="dialog" aria-modal="true"><div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"><div className="mb-5 flex items-center justify-between"><h3 className="text-xl font-bold text-slate-800">Lead Details</h3><button onClick={() => setSelectedId(null)} aria-label="Close"><X className="h-5 w-5 text-slate-500" /></button></div>{isDetailLoading || !selectedLead ? <Loader2 className="mx-auto my-12 h-7 w-7 animate-spin text-blue-600" /> : <><div className="mb-5 grid gap-4 sm:grid-cols-2">{([ ["Phone", selectedLead.phone], ["City", selectedLead.city], ["Source", selectedLead.sourcePage], ["Status", selectedLead.status], ["Consent version", selectedLead.consentTextVersion], ["Consent time", selectedLead.consentedAt], ["Submitted", selectedLead.submittedAt], ["Updated", selectedLead.updatedAt], ["IP address", selectedLead.ipAddress], ["User agent", selectedLead.userAgent], ["UTM source", selectedLead.utmSource], ["UTM medium", selectedLead.utmMedium], ["UTM campaign", selectedLead.utmCampaign], ["UTM term", selectedLead.utmTerm], ["UTM content", selectedLead.utmContent], ["Referrer", selectedLead.referrer] ] as const).map(([label, item]) => <div key={label}><dt className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</dt><dd className="mt-1 break-words text-sm text-slate-700">{label.includes("time") || label === "Submitted" || label === "Updated" ? formatDate(item) : value(item)}</dd></div>)}</div><div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4"><label className="text-sm font-medium text-slate-600">Update status<select value={selectedLead.status} disabled={isUpdating} onChange={(event) => handleStatus(selectedLead, event.target.value)} className={cn("ml-2 rounded-lg border border-slate-200 px-3 py-2 text-sm", isUpdating && "opacity-50")}>{statuses.map((item) => <option key={item} value={item}>{item[0] + item.slice(1).toLowerCase()}</option>)}</select></label><button onClick={() => handleDelete(selectedLead)} disabled={isDeleting} className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 disabled:opacity-50">Delete</button></div></>}</div></div>}
      {confirmDialog}{alertDialog}
    </>
  );
}
