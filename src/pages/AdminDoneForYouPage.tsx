import { Eye, Filter, Loader2, Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { DfyStatusBadge } from "../components/dfy/DfyStatusBadge";
import { calculateDfyProgress, formatDate } from "../components/dfy/dfyUtils";
import { formatCategory } from "../lib/formatCategory";
import { useGetAdminDfyOrdersQuery } from "../store/api/DoneForYou/dfy.api";

const PAGE_SIZE = 12;
const statuses = ["PENDING", "IN_PROGRESS", "IN_REVIEW", "READY", "PUBLISHED"] as const;

export default function AdminDoneForYouPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const { data, isLoading, isError, refetch } = useGetAdminDfyOrdersQuery({
    page,
    limit: PAGE_SIZE,
    search: search.trim() || undefined,
    status: status || undefined,
  });
  const orders = data?.orders ?? [];
  const pagination = data?.pagination;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Done For You Fulfillment</h2>
          <p className="mt-1 text-sm text-slate-500">Track production status, deliverables, templates, and publishing for DFY customers.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(event) => { setSearch(event.target.value); setPage(1); }}
              placeholder="Search orders"
              className="h-10 rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-dashboard-admin focus:ring-1 focus:ring-dashboard-admin"
            />
          </label>
          <label className="relative block">
            <Filter className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <select
              value={status}
              onChange={(event) => { setStatus(event.target.value); setPage(1); }}
              className="h-10 cursor-pointer rounded-lg border border-slate-200 bg-white pl-9 pr-8 text-sm text-slate-900 outline-none focus:border-dashboard-admin focus:ring-1 focus:ring-dashboard-admin [color-scheme:light]"
            >
              <option value="" className="bg-white text-slate-900">All statuses</option>
              {statuses.map((item) => (
                <option key={item} value={item} className="bg-white text-slate-900">
                  {item.replaceAll("_", " ")}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        {isLoading ? (
          <div className="grid place-items-center py-20"><Loader2 className="h-8 w-8 animate-spin text-dashboard-admin" /></div>
        ) : isError ? (
          <div className="grid place-items-center gap-3 py-20 text-sm text-slate-500">
            <p>Unable to load DFY orders.</p>
            <button
              type="button"
              onClick={() => refetch()}
              className="cursor-pointer rounded-lg bg-dashboard-admin px-4 py-2 font-semibold text-white hover:bg-dashboard-admin-dark"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-blue-50 text-xs font-semibold uppercase tracking-wide text-dashboard-admin">
                <tr>
                  <th className="px-5 py-4">Customer</th>
                  <th className="px-5 py-4">Business</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Audience</th>
                  <th className="px-5 py-4">Progress</th>
                  <th className="px-5 py-4">Purchased</th>
                  <th className="px-5 py-4">Updated</th>
                  <th className="px-5 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.length === 0 ? (
                  <tr><td colSpan={8} className="px-5 py-12 text-center text-slate-500">No DFY orders found.</td></tr>
                ) : orders.map((order) => {
                  const progress = calculateDfyProgress(order.deliverables.map((item) => ({ ...item, title: item.key, description: null, displayOrder: 0, assets: [] })));
                  return (
                    <tr key={order.id} className="hover:bg-slate-50">
                      <td className="px-5 py-4">
                        <p className="font-semibold text-slate-900">{order.user.name || order.user.email}</p>
                        <p className="text-xs text-slate-500">{order.user.email}</p>
                      </td>
                      <td className="px-5 py-4 text-slate-700">{order.business.businessName}</td>
                      <td className="px-5 py-4"><DfyStatusBadge status={order.status} /></td>
                      <td className="px-5 py-4 text-slate-600">{formatCategory(order.audience)}</td>
                      <td className="px-5 py-4 text-slate-600">{progress}%</td>
                      <td className="px-5 py-4 text-slate-600">{formatDate(order.createdAt)}</td>
                      <td className="px-5 py-4 text-slate-600">{formatDate(order.updatedAt)}</td>
                      <td className="px-5 py-4 text-right">
                        <Link
                          to={`/admin/done-for-you/${order.id}`}
                          className="cursor-pointer inline-flex items-center gap-1 rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-dashboard-admin hover:bg-blue-100"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          View
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-slate-100 px-5 py-4 text-sm text-slate-500">
            <span>Page {pagination.page} of {pagination.totalPages}</span>
            <div className="flex gap-2">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage((value) => Math.max(1, value - 1))}
                className="cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Previous
              </button>
              <button
                type="button"
                disabled={page >= pagination.totalPages}
                onClick={() => setPage((value) => Math.min(pagination.totalPages, value + 1))}
                className="cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
