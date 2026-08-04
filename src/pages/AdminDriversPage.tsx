import { Eye, Trash2, MoreVertical, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const driversList = [
  {
    id: "#di0001",
    name: "Eleanor Pena",
    email: "pena@email.com",
    area: "Orlando, FL",
    date: "Jul 14, 2026",
    time: "10:30AM",
    status: "Pending",
    launchProgress: "25% Complete",
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
    launchProgress: "75% Complete",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&q=80",
  },
  {
    id: "#di0003",
    name: "Kathryn Murphy",
    email: "urphy@email.com",
    area: "Orlando, FL",
    date: "Jul 14, 2026",
    time: "10:30AM",
    status: "Under Review",
    launchProgress: "Launch Ready",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&q=80",
  },
  {
    id: "#di0004",
    name: "Kathryn Murphy",
    email: "urphy@email.com",
    area: "Orlando, FL",
    date: "Jul 14, 2026",
    time: "10:30AM",
    status: "Pending",
    launchProgress: "Setup Not Started",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&q=80",
  },
  {
    id: "#di0005",
    name: "Theresa Webb",
    email: "theresa@email.com",
    area: "Orlando, FL",
    date: "Jul 14, 2026",
    time: "10:30AM",
    status: "Under Review",
    launchProgress: "25% Complete",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&q=80",
  },
  {
    id: "#di0006",
    name: "Theresa Webb",
    email: "theresa@email.com",
    area: "Orlando, FL",
    date: "Jul 14, 2026",
    time: "10:30AM",
    status: "Approved",
    launchProgress: "75% Complete",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&q=80",
  },
  {
    id: "#di0007",
    name: "Theresa Webb",
    email: "theresa@email.com",
    area: "Orlando, FL",
    date: "Jul 14, 2026",
    time: "10:30AM",
    status: "Pending",
    launchProgress: "Setup Not Started",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&q=80",
  },
  {
    id: "#di0008",
    name: "Theresa Webb",
    email: "theresa@email.com",
    area: "Orlando, FL",
    date: "Jul 14, 2026",
    time: "10:30AM",
    status: "Approved",
    launchProgress: "Launch Ready",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&q=80",
  },
  {
    id: "#di0009",
    name: "Theresa Webb",
    email: "theresa@email.com",
    area: "Orlando, FL",
    date: "Jul 14, 2026",
    time: "10:30AM",
    status: "Under Review",
    launchProgress: "25% Complete",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&q=80",
  },
  {
    id: "#di0010",
    name: "Theresa Webb",
    email: "theresa@email.com",
    area: "Orlando, FL",
    date: "Jul 14, 2026",
    time: "10:30AM",
    status: "Pending",
    launchProgress: "75% Complete",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&q=80",
  },
  {
    id: "#di0011",
    name: "Theresa Webb",
    email: "theresa@email.com",
    area: "Orlando, FL",
    date: "Jul 14, 2026",
    time: "10:30AM",
    status: "Approved",
    launchProgress: "Launch Ready",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&q=80",
  },
];

export default function AdminDriversPage() {
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
          <button className="flex items-center gap-2 px-4 py-2 bg-[#f0f4ff] text-[#1a56ff] font-medium rounded-lg hover:bg-blue-100 transition-colors text-sm">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto flex-1 p-6 pt-0">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-[#1a56ff] bg-[#f0f4ff] font-medium">
              <tr>
                <th className="px-6 py-4 rounded-tl-lg">Driver ID</th>
                <th className="px-6 py-4">Driver Name</th>
                <th className="px-6 py-4">Email Address</th>
                <th className="px-6 py-4">Service Area</th>
                <th className="px-6 py-4">Registration Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Launch Progress</th>
                <th className="px-6 py-4 text-center rounded-tr-lg">Action</th>
              </tr>
            </thead>
            <tbody>
              {driversList.map((driver, index) => (
                <tr key={index} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
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
                  <td className="px-6 py-4 text-slate-600">{driver.status}</td>
                  <td className="px-6 py-4 text-slate-600">{driver.launchProgress}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-3">
                      <Link to={`/admin/drivers/${driver.id.replace('#', '')}`} title="View Driver" className="text-green-500 hover:text-green-600 transition-colors block">
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        title="Delete Driver"
                        onClick={() => window.confirm("Are you sure you want to permanently delete this driver account?")}
                        className="text-red-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button title="Change Status" className="text-slate-400 hover:text-slate-600 transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer / Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 border-t border-slate-50 bg-white">
          <span className="text-sm text-slate-500">Showing 11 of 50 drivers</span>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 bg-slate-50 hover:bg-slate-100 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-white bg-[#1a56ff] font-medium text-sm transition-colors">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-600 bg-slate-50 hover:bg-slate-100 font-medium text-sm transition-colors">
              2
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-600 bg-slate-50 hover:bg-slate-100 font-medium text-sm transition-colors">
              3
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-600 bg-slate-50 hover:bg-slate-100 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
