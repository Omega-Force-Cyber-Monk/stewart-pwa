import { useState } from "react";
import {
  Plus,
  FolderSearch,
  FileText,
  Printer,
  Mail,
  ClipboardCheck,
  FileBadge,
  Loader2,
  Trash2,
  ExternalLink,
  Edit2,
  Download,
} from "lucide-react";
import { cn } from "../lib/cn";
import { Link } from "react-router-dom";
import {
  useGetAdminResourceCategoriesQuery,
  useGetAdminResourcesQuery,
  useDeleteAdminResourceMutation,
} from "../store/api/Admin/admin.api";
import type { Resource } from "../store/api/Admin/admin.type";
import { useConfirmDialog } from "../hooks/useConfirmDialog";
import { useAppSelector } from "../hooks/storeHooks";

const iconMap: Record<string, typeof FolderSearch> = {
  "folder-search": FolderSearch,
  "file-text": FileText,
  printer: Printer,
  "mail-open": Mail,
  mail: Mail,
  "file-spreadsheet": FileText,
  "file-up": FileBadge,
  "clipboard-check": ClipboardCheck,
  default: FileText,
};

const colorMap: Record<string, { bg: string; border: string; text: string }> = {
  blue: { bg: "bg-blue-50", border: "border-blue-100", text: "text-blue-500" },
  green: { bg: "bg-green-50", border: "border-green-100", text: "text-green-500" },
  purple: { bg: "bg-fuchsia-50", border: "border-fuchsia-100", text: "text-fuchsia-500" },
  yellow: { bg: "bg-amber-50", border: "border-amber-100", text: "text-amber-500" },
  teal: { bg: "bg-teal-50", border: "border-teal-100", text: "text-teal-500" },
  indigo: { bg: "bg-purple-50", border: "border-purple-100", text: "text-purple-500" },
  cyan: { bg: "bg-cyan-50", border: "border-cyan-100", text: "text-cyan-500" },
  slate: { bg: "bg-slate-50", border: "border-slate-200", text: "text-slate-500" },
  default: { bg: "bg-gray-50", border: "border-gray-100", text: "text-gray-500" },
};

const getColorKey = (cardColor: string | null | undefined) => {
  if (!cardColor) return "default";
  const map: Record<string, string> = {
    "#ECFDF5": "green",
    "#EFF6FF": "blue",
    "#FAF5FF": "purple",
    "#FFFBEB": "yellow",
    "#F0FDFA": "teal",
    "#F5F3FF": "indigo",
    "#ECFEFF": "cyan",
  };
  return map[cardColor.toUpperCase()] || "default";
};

export default function AdminResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [stepFilter, setStepFilter] = useState("");
  const [search, setSearch] = useState("");

  const { data: categoriesData, isLoading: isLoadingCategories } = useGetAdminResourceCategoriesQuery({
    active: true,
  });

  const { data: resourcesData, isLoading: isLoadingResources, isError, refetch } = useGetAdminResourcesQuery({
    categoryId: selectedCategory || undefined,
    step: stepFilter || undefined,
    search: search || undefined,
    limit: 100,
  });

  const [deleteResource] = useDeleteAdminResourceMutation();
  const { openConfirm, confirmDialog, showAlert, alertDialog } = useConfirmDialog();

  const categories = categoriesData?.categories ?? [];
  const resources = resourcesData?.resources ?? [];

  const handleDelete = (resource: Resource) => {
    openConfirm(
      {
        title: "Delete Resource",
        message: `Delete resource "${resource.name}"?`,
        confirmText: "Yes, delete",
      },
      async () => {
        try {
          await deleteResource(resource.id).unwrap();
        } catch (err) {
          console.error("Failed to delete resource:", err);
          showAlert({ title: "Error", message: "Failed to delete resource.", type: "error" });
        }
      }
    );
  };

  const { accessToken } = useAppSelector((state) => state.auth);

  const handlePreview = async (resourceId: string) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/resources/${resourceId}/file`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!res.ok) throw new Error("Failed to load preview");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    } catch (err) {
      console.error(err);
      showAlert({ title: "Error", message: "Failed to load file preview.", type: "error" });
    }
  };

  const handleDownload = async (resource: Resource) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/resources/${resource.id}/file`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!res.ok) throw new Error("Failed to download file");

      const disposition = res.headers.get("Content-Disposition");
      let filename = resource.title || resource.name || "download";
      if (disposition && disposition.indexOf("filename=") !== -1) {
        const matches = /filename="([^"]+)"/.exec(disposition);
        if (matches != null && matches[1]) {
          filename = matches[1];
        }
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      showAlert({ title: "Error", message: "Failed to download resource.", type: "error" });
    }
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* Top Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-shrink-0">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 flex-1 min-w-0 scrollbar-hide">
          <select
            value={stepFilter}
            onChange={(e) => setStepFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm text-slate-700"
          >
            <option value="">All steps</option>
            <option value="CUSTOMER_ACQUISITION">Customer Acquisition</option>
            <option value="BRAND_AND_TRUST">Brand & Trust</option>
          </select>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search resources..."
            className="px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm w-full sm:w-64"
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Sidebar Panel */}
        <div className="w-full lg:w-72 flex-shrink-0 flex flex-col bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-800">Resource Section</h3>
            <p className="text-sm text-slate-500 mt-1">Manage the resources and content available in this section.</p>
          </div>

          <div className="space-y-3 flex-1">
            <button
              onClick={() => setSelectedCategory("")}
              className={cn(
                "w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors text-left",
                !selectedCategory
                  ? "bg-[#1a56ff] text-white shadow-md shadow-blue-500/20"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              )}
            >
              <span>All Categories</span>
              {isLoadingCategories && <Loader2 className="w-4 h-4 animate-spin" />}
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors text-left",
                  selectedCategory === cat.id
                    ? "bg-[#1a56ff] text-white shadow-md shadow-blue-500/20"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                )}
              >
                <span>{cat.name}</span>
                <span className={cn("text-xs", selectedCategory === cat.id ? "text-blue-100" : "text-slate-400")}>
                  {cat._count?.resources ?? 0}
                </span>
              </button>
            ))}
          </div>

          <Link
            to="/admin/resources/add"
            className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#111315] text-white font-medium hover:bg-black transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            Add More
          </Link>
        </div>

        {/* Right Content Panel */}
        <div className="flex-1 flex flex-col bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          {isLoadingResources ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-8 h-8 text-[#1a56ff] animate-spin" />
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <p className="text-sm text-slate-500">Failed to load resources.</p>
              <button onClick={refetch} className="px-4 py-2 rounded-lg bg-[#1a56ff] text-white text-sm font-medium hover:bg-blue-700">
                Retry
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {resources.length === 0 ? (
                <div className="col-span-full flex flex-col items-center justify-center py-16 gap-3">
                  <p className="text-sm text-slate-400">No resources found.</p>
                  <Link to="/admin/resources/add" className="text-sm font-medium text-[#1a56ff] hover:underline">
                    Add your first resource
                  </Link>
                </div>
              ) : (
                resources.map((resource) => {
                  const Icon = iconMap[resource.iconKey || "default"] || FileText;
                  const styles = colorMap[getColorKey(resource.cardColor)];
                  return (
                    <div
                      key={resource.id}
                      className={cn(
                        "flex flex-col items-center text-center p-6 rounded-2xl border transition-transform hover:-translate-y-1 hover:shadow-md",
                        styles.bg,
                        styles.border
                      )}
                    >
                      <Icon className={cn("w-8 h-8 mb-4", styles.text)} />
                      <h4 className="font-bold text-slate-800 text-sm mb-2">{resource.title || resource.name}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                        {resource.description}
                      </p>
                      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 mt-5">
                        <button
                          onClick={() => handlePreview(resource.id)}
                          className="text-[#1a56ff] hover:text-blue-700 hover:underline text-[13px] font-medium flex items-center gap-1 transition-colors"
                          title="Preview Resource"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          View
                        </button>
                        <div className="w-px h-3.5 bg-slate-200"></div>
                        <Link
                          to={`/admin/resources/edit/${resource.id}`}
                          className="text-slate-600 hover:text-slate-900 hover:underline text-[13px] font-medium flex items-center gap-1 transition-colors"
                          title="Edit Resource"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          Edit
                        </Link>
                        <div className="w-px h-3.5 bg-slate-200"></div>
                        <button
                          onClick={() => handleDownload(resource)}
                          className="text-emerald-600 hover:text-emerald-700 hover:underline text-[13px] font-medium flex items-center gap-1 transition-colors"
                          title="Download Resource"
                        >
                          <Download className="w-3.5 h-3.5" />
                          Download
                        </button>
                        <div className="w-px h-3.5 bg-slate-200"></div>
                        <button
                          onClick={() => handleDelete(resource)}
                          className="text-red-500 hover:text-red-600 hover:underline text-[13px] font-medium flex items-center gap-1 transition-colors"
                          title="Delete Resource"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>

      {/* Sweet-alert style modals */}
      {confirmDialog}
      {alertDialog}
    </div>
  );
}
