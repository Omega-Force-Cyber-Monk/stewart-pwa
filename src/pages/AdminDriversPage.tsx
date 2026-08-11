import { useState } from "react";
import { Eye, Trash2, MoreVertical, Filter, ChevronLeft, ChevronRight, Loader2, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../lib/cn";
import {
  useGetAdminDriversQuery,
  useDeleteDriverMutation,
  useUpdateDriverAccountStatusMutation,
} from "../store/api/Admin/admin.api";
import type { Driver } from "../store/api/Admin/admin.type";
import { useConfirmDialog } from "../hooks/useConfirmDialog";

const PAGE_SIZE = 10;

const statusStyles: Record<string, string> = {
  active: "bg-green-50 text-green-600",
  pending: "bg-yellow-50 text-yellow-600",
  suspended: "bg-red-50 text-red-600",
};

const verificationStyles: Record<string, string> = {
  APPROVED: "bg-green-50 text-green-600",
  PENDING: "bg-yellow-50 text-yellow-600",
  UNDER_REVIEW: "bg-blue-50 text-blue-600",
  REJECTED: "bg-red-50 text-red-600",
};

const getProgressLabel = (setup?: Driver["setup"] | null) => {
  if (!setup) return "Setup Not Started";
  if (setup.percentage >= 100) return "Launch Ready";
  if (setup.percentage === 0) return "Setup Not Started";
  return `${setup.percentage}% Complete`;
};

const formatDate = (iso: string) => {
  try {
    const d = new Date(iso);
    return {
      date: d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      time: d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
    };
  } catch {
    return { date: iso, time: "" };
  }
};

export default function AdminDriversPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [verificationFilter, setVerificationFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const { data, isLoading, isError, refetch } = useGetAdminDriversQuery({
    page,
    limit: PAGE_SIZE,
    search: search || undefined,
    status: statusFilter || undefined,
    verificationStatus: verificationFilter || undefined,
  });

  const [deleteDriver] = useDeleteDriverMutation();
  const [updateAccountStatus, { isLoading: isUpdatingStatus }] = useUpdateDriverAccountStatusMutation();
  const { openConfirm, confirmDialog, showAlert, alertDialog } = useConfirmDialog();

  const handleDelete = (driver: Driver) => {
    openConfirm(
      {
        title: "Delete Driver",
        message: `Are you sure you want to permanently delete ${driver.user.name || driver.user.email}?`,
        confirmText: "Yes, delete",
      },
      async () => {
        try {
          await deleteDriver(driver.id).unwrap();
          refetch();
        } catch (err) {
          console.error("Failed to delete driver:", err);
          showAlert({ title: "Error", message: "Failed to delete driver.", type: "error" });
        }
      }
    );
  };

  const handleToggleStatus = (driver: Driver) => {
    const next = driver.user.status === "suspended" ? "active" : "suspended";
    openConfirm(
      {
        title: "Change Account Status",
        message: `Change ${driver.user.name || driver.user.email} to "${next}"?`,
        confirmText: "Yes, change it",
      },
      async () => {
        try {
          await updateAccountStatus({ id: driver.id, status: next }).unwrap();
        } catch (err) {
          console.error("Failed to update driver status:", err);
          showAlert({ title: "Error", message: "Failed to update driver status.", type: "error" });
        }
      }
    );
  };

  const drivers = data?.drivers ?? [];
  const pagination = data?.pagination;

  return (
    <div className="flex flex-col space-y-6 flex-1">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Driver Management</h2>
        <p className="text-slate-500 text-sm mt-1">
          Monitor driver registrations, account status, service areas, launch progress, and platform activity from one place.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col">
        {/* Table Header Controls */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 p-6 border-b border-slate-50">
          <h3 className="text-lg font-bold text-slate-800">All Drivers</h3>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search drivers..."
                className="pl-9 pr-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm w-full sm:w-56"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors text-sm",
                showFilters || statusFilter || verificationFilter
                  ? "bg-[#1a56ff] text-white"
                  : "bg-[#f0f4ff] text-[#1a56ff] hover:bg-blue-100"
              )}
            >
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>

        {/* Filter Row */}
        {showFilters && (
          <div className="flex flex-col sm:flex-row gap-3 px-6 pb-6">
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
              className="px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm text-slate-700"
            >
              <option value="">All account statuses</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
            </select>
            <select
              value={verificationFilter}
              onChange={(e) => { setVerificationFilter(e.target.value); setPage(1); }}
              className="px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm text-slate-700"
            >
              <option value="">All verification statuses</option>
              <option value="PENDING">Pending</option>
              <option value="UNDER_REVIEW">Under Review</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
        )}

        {/* Table Content */}
        <div className="overflow-x-auto flex-1 p-6 pt-0">
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-8 h-8 text-[#1a56ff] animate-spin" />
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <p className="text-sm text-slate-500">Failed to load drivers.</p>
              <button onClick={refetch} className="px-4 py-2 rounded-lg bg-[#1a56ff] text-white text-sm font-medium hover:bg-blue-700">
                Retry
              </button>
            </div>
          ) : (
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-[#1a56ff] bg-[#f0f4ff] font-medium">
                <tr>
                  <th className="px-6 py-4 rounded-tl-lg">Driver ID</th>
                  <th className="px-6 py-4">Driver Name</th>
                  <th className="px-6 py-4">Email Address</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Service Area</th>
                  <th className="px-6 py-4">Registration Date</th>
                  <th className="px-6 py-4">Verification</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Launch Progress</th>
                  <th className="px-6 py-4 text-center rounded-tr-lg">Action</th>
                </tr>
              </thead>
              <tbody>
                {drivers.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="px-6 py-10 text-center text-slate-400 text-sm">
                      No drivers found.
                    </td>
                  </tr>
                ) : (
                  drivers.map((driver) => {
                    const reg = formatDate(driver.createdAt || driver.user.createdAt || "");
                    return (
                      <tr key={driver.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-slate-700">{driver.driverCode}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {driver.avatarUrl ? (
                              <img src={driver.avatarUrl} alt={driver.user.name || ""} className="w-8 h-8 rounded-full object-cover" />
                            ) : (
                              <span className="w-8 h-8 rounded-full bg-[#f0f4ff] text-[#1a56ff] flex items-center justify-center text-xs font-bold">
                                {(driver.user.name || driver.user.email || "?").slice(0, 2).toUpperCase()}
                              </span>
                            )}
                            <span className="font-medium text-slate-800">{driver.user.name || "—"}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-slate-600">{driver.user.email}</td>
                        <td className="px-6 py-4 text-slate-600">{driver.category}</td>
                        <td className="px-6 py-4 text-slate-600">{driver.serviceArea?.cityArea || "—"}</td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-slate-800 font-medium">{reg.date}</span>
                            {reg.time && <span className="text-slate-500 text-xs">{reg.time}</span>}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={cn(
                            "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium",
                            verificationStyles[driver.verificationStatus] || "bg-slate-50 text-slate-600"
                          )}>
                            {driver.verificationStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={cn(
                            "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium",
                            statusStyles[driver.user.status] || "bg-slate-50 text-slate-600"
                          )}>
                            {driver.user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-600">{getProgressLabel(driver.setup)}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-3">
                            <Link
                              to={`/admin/drivers/${driver.id}`}
                              title="View Driver"
                              className="text-green-500 hover:text-green-600 transition-colors block"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>
                            <button
                              title={driver.user.status === "suspended" ? "Activate Account" : "Suspend Account"}
                              disabled={isUpdatingStatus}
                              onClick={() => handleToggleStatus(driver)}
                              className="text-slate-400 hover:text-slate-600 transition-colors disabled:opacity-50"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>
                            <button
                              title="Delete Driver"
                              onClick={() => handleDelete(driver)}
                              className="text-red-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Table Footer / Pagination */}
        {pagination && pagination.total > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 border-t border-slate-50 bg-white">
            <span className="text-sm text-slate-500">
              Showing {drivers.length} of {pagination.total} drivers
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 bg-slate-50 hover:bg-slate-100 transition-colors disabled:opacity-40"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: Math.max(1, pagination.totalPages) }, (_, i) => i + 1)
                .slice(0, 5)
                .map((n) => (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    className={cn(
                      "w-8 h-8 flex items-center justify-center rounded-lg font-medium text-sm transition-colors",
                      page === n ? "text-white bg-[#1a56ff]" : "text-slate-600 bg-slate-50 hover:bg-slate-100"
                    )}
                  >
                    {n}
                  </button>
                ))}
              <button
                onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                disabled={page >= pagination.totalPages}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 bg-slate-50 hover:bg-slate-100 transition-colors disabled:opacity-40"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Sweet-alert style modals */}
      {confirmDialog}
      {alertDialog}
    </div>
  );
}
