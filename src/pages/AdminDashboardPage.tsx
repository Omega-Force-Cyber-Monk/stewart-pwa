import { User, Wallet, Eye, Trash2 } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { cn } from "../lib/cn";
import { useGetAdminDashboardQuery } from "../store/api/Admin/admin.api";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    active: "bg-green-50 text-green-600",
    pending: "bg-yellow-50 text-yellow-600",
    suspended: "bg-red-50 text-red-600",
    APPROVED: "bg-green-50 text-green-600",
    PENDING: "bg-yellow-50 text-yellow-600",
    UNDER_REVIEW: "bg-blue-50 text-blue-600",
    REJECTED: "bg-red-50 text-red-600",
  };

  const dotStyles: Record<string, string> = {
    active: "bg-green-500",
    pending: "bg-yellow-500",
    suspended: "bg-red-500",
    APPROVED: "bg-green-500",
    PENDING: "bg-yellow-500",
    UNDER_REVIEW: "bg-blue-500",
    REJECTED: "bg-red-500",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
        styles[status] || "bg-slate-50 text-slate-600"
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full", dotStyles[status] || "bg-slate-500")} />
      {status}
    </span>
  );
};

const formatDate = (iso: string) => {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return iso;
  }
};

const formatMoney = (total: number) =>
  `$${total.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;

export default function AdminDashboardPage() {
  const { data, isLoading, isError, refetch } = useGetAdminDashboardQuery();

  const revenueData =
    data?.monthlyRevenue?.map((bucket) => ({
      name: bucket.label,
      value: bucket.total,
    })) ?? [];

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#1a56ff] animate-spin" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
        <p className="text-slate-500 text-sm">
          Failed to load the dashboard. Check that you're signed in as an admin and the API is reachable.
        </p>
        <button
          onClick={refetch}
          className="px-4 py-2 rounded-lg bg-[#1a56ff] text-white font-medium hover:bg-blue-700 transition-colors text-sm"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Left Column - Main Content */}
      <div className="flex-1 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Platform Overview</h2>
          <p className="text-slate-500 text-sm mt-1">
            Monitor drivers, bookings, customer activity, and platform performance from one place.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-[#ffe4f1] rounded-2xl p-6 flex flex-col justify-between border border-pink-100 shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-3xl font-bold text-slate-800">{data.totalDrivers}</h3>
              <div className="h-8 w-8 rounded-full bg-pink-200/50 flex items-center justify-center">
                <User className="h-4 w-4 text-pink-500" />
              </div>
            </div>
            <p className="text-sm font-medium text-slate-600">Total Drivers</p>
          </div>

          <div className="bg-[#f3e8ff] rounded-2xl p-6 flex flex-col justify-between border border-purple-100 shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-3xl font-bold text-slate-800">{formatMoney(data.totalRevenue.total)}</h3>
              <div className="h-8 w-8 rounded-full bg-purple-200/50 flex items-center justify-center">
                <Wallet className="h-4 w-4 text-purple-500" />
              </div>
            </div>
            <p className="text-sm font-medium text-slate-600">Platform Sales Revenue</p>
          </div>
        </div>

        {/* Monthly Revenue Chart */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800">Monthly Revenue</h3>
            <span className="text-xl font-bold text-[#1a56ff]">{formatMoney(data.totalRevenue.total)}</span>
          </div>
          <div className="h-[250px] w-full">
            {revenueData.length === 0 ? (
              <div className="h-full flex items-center justify-center text-sm text-slate-400">
                No revenue data yet
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis
                    dataKey="name"
                    axisLine={true}
                    tickLine={false}
                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    dot={{ r: 4, fill: "white", stroke: "#8b5cf6", strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Recent Driver Registrations */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 p-6 border-b border-slate-50">
            <h3 className="text-lg font-bold text-slate-800">Recent Driver Registrations</h3>
            <Link to="/admin/drivers" className="text-sm font-medium text-[#1a56ff] hover:underline">
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-[#1a56ff] bg-[#f0f4ff] font-medium">
                <tr>
                  <th className="px-6 py-4 rounded-tl-lg">Driver ID</th>
                  <th className="px-6 py-4">Driver Name</th>
                  <th className="px-6 py-4">Email Address</th>
                  <th className="px-6 py-4">Service Area</th>
                  <th className="px-6 py-4">Registration Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center rounded-tr-lg">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.recentDrivers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-slate-400 text-sm">
                      No recent driver registrations
                    </td>
                  </tr>
                ) : (
                  data.recentDrivers.map((driver) => (
                    <tr key={driver.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-700">{driver.driverCode}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-full bg-[#f0f4ff] text-[#1a56ff] flex items-center justify-center text-xs font-bold">
                            {(driver.name || driver.email || "?").slice(0, 2).toUpperCase()}
                          </span>
                          <span className="font-medium text-slate-800">{driver.name || "—"}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{driver.email}</td>
                      <td className="px-6 py-4 text-slate-600">{driver.serviceArea || "—"}</td>
                      <td className="px-6 py-4">
                        <span className="text-slate-800 font-medium">{formatDate(driver.registrationDate)}</span>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={driver.status} />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            to={`/admin/drivers/${driver.id}`}
                            className="text-green-500 hover:text-green-600 transition-colors p-1"
                            title="View Driver"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <button className="text-red-400 hover:text-red-500 transition-colors p-1" title="Delete Driver">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
