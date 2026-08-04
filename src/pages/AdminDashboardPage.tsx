import { User, Wallet, RefreshCw, Eye, Trash2 } from "lucide-react";
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

const revenueData = [
  { name: "Mon", value: 0 },
  { name: "Tue", value: 0 },
  { name: "Wed", value: 0 },
  { name: "Thu", value: 0 },
  { name: "Fri", value: 0 },
  { name: "Sat", value: 0 },
  { name: "Sun", value: 0 },
];

const recentDrivers = [
  {
    id: "#di0001",
    name: "Eleanor Pena",
    email: "pena@email.com",
    area: "Orlando, FL",
    date: "Jul 14, 2026",
    time: "10:30AM",
    status: "Pending",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&q=80",
  },
  {
    id: "#di0002",
    name: "Kathryn Murphy",
    email: "urphy@email.com",
    area: "Orlando, FL",
    date: "Jul 14, 2026",
    time: "10:30AM",
    status: "Approved",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&q=80",
  },
  {
    id: "#di0003",
    name: "Theresa Webb",
    email: "theresa@email.com",
    area: "Orlando, FL",
    date: "Jul 14, 2026",
    time: "10:30AM",
    status: "Under Review",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&q=80",
  },
];

type Activity = {
  id: number;
  user: string;
  action: string;
  time: string;
  initials: string;
  color: string;
};

const activities: Activity[] = [];

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    Pending: "bg-yellow-50 text-yellow-600",
    Approved: "bg-green-50 text-green-600",
    "Under Review": "bg-blue-50 text-blue-600",
  };

  const dotStyles: Record<string, string> = {
    Pending: "bg-yellow-500",
    Approved: "bg-green-500",
    "Under Review": "bg-blue-500",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
        styles[status]
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full", dotStyles[status])} />
      {status}
    </span>
  );
};

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col xl:flex-row gap-8">
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
              <h3 className="text-3xl font-bold text-slate-800">0</h3>
              <div className="h-8 w-8 rounded-full bg-pink-200/50 flex items-center justify-center">
                <User className="h-4 w-4 text-pink-500" />
              </div>
            </div>
            <p className="text-sm font-medium text-slate-600">Total Drivers</p>
          </div>

          <div className="bg-[#f3e8ff] rounded-2xl p-6 flex flex-col justify-between border border-purple-100 shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-3xl font-bold text-slate-800">$0</h3>
              <div className="h-8 w-8 rounded-full bg-purple-200/50 flex items-center justify-center">
                <Wallet className="h-4 w-4 text-purple-500" />
              </div>
            </div>
            <p className="text-sm font-medium text-slate-600">Total Revenue</p>
          </div>
        </div>

        {/* Monthly Revenue Chart */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800">Monthly Revenue</h3>
            <span className="text-xl font-bold text-[#1a56ff]">$0</span>
          </div>
          <div className="h-[250px] w-full">
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
          </div>
        </div>

        {/* Recent Driver Registrations */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 p-6 border-b border-slate-50">
            <h3 className="text-lg font-bold text-slate-800">Recent Driver Registrations</h3>
            <button className="text-sm font-medium text-[#1a56ff] hover:underline">
              View All
            </button>
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
                {recentDrivers.map((driver, index) => (
                  <tr key={index} className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-700">{driver.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={driver.avatar} alt={driver.name} className="w-8 h-8 rounded-full object-cover" />
                        <span className="font-medium text-slate-800">{driver.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{driver.email}</td>
                    <td className="px-6 py-4 text-slate-600">{driver.area}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-slate-800 font-medium">{driver.date}</span>
                        <span className="text-slate-500 text-xs">{driver.time}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={driver.status} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button className="text-green-500 hover:text-green-600 transition-colors p-1">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-red-400 hover:text-red-500 transition-colors p-1">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Right Column - Platform Activity */}
      <div className="xl:w-[350px] flex-shrink-0">
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm h-full flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800">Platform Activity</h3>
            <button className="text-slate-400 hover:text-slate-600 transition-colors">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 space-y-6">
            {activities.length === 0 ? (
              <p className="text-sm text-slate-500">No recent platform activity</p>
            ) : (
              activities.map((activity, index) => (
                <div key={index} className="flex gap-4 group">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-sm transition-transform group-hover:scale-105",
                    activity.color
                  )}>
                    {activity.initials}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-700 leading-snug">
                      <span className="font-semibold text-slate-900">{activity.user}</span> {activity.action}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
