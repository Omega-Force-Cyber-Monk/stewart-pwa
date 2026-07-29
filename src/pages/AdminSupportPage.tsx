import { useState } from "react";
import { Eye, Trash2, MoreVertical, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../lib/cn";
import { SupportMessageModal } from "../components/admin/SupportMessageModal";

const topTabs = [
  { name: "Women", active: true },
  { name: "Couple", active: false },
  { name: "50+ Old", active: false },
  { name: "Standard", active: false },
  { name: "Spanish", active: false },
];

const supportData = [
  {
    id: "TX-1001",
    name: "Sarah Johnson",
    category: "Women driver",
    subject: "Unable to Update Landing Page",
    date: "Jul 14, 2026",
    time: "10:30AM",
    status: "Under Review",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&q=80",
  },
  {
    id: "TX-1001",
    name: "Wanda Maximoff",
    category: "Women driver",
    subject: "Booking Setup Question",
    date: "Jul 14, 2026",
    time: "10:30AM",
    status: "Pending",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&q=80",
  },
  {
    id: "TX-1001",
    name: "Karen Starr",
    category: "Women driver",
    subject: "Payment Confirmation",
    date: "Jul 14, 2026",
    time: "10:30AM",
    status: "Pending",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&q=80",
  },
  {
    id: "TX-1001",
    name: "Diana Prince",
    category: "Women driver",
    subject: "Payment Confirmation",
    date: "Jul 14, 2026",
    time: "10:30AM",
    status: "Under Review",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&q=80",
  },
  {
    id: "TX-1001",
    name: "Natasha Romanoff",
    category: "Women driver",
    subject: "Payment Confirmation",
    date: "Jul 14, 2026",
    time: "10:30AM",
    status: "Pending",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop&q=80",
  },
  {
    id: "TX-1001",
    name: "Barbara Gordon",
    category: "Women driver",
    subject: "Payment Confirmation",
    date: "Jul 14, 2026",
    time: "10:30AM",
    status: "Pending",
    avatar: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=150&h=150&fit=crop&q=80",
  },
  {
    id: "TX-1001",
    name: "Paula Irving",
    category: "Women driver",
    subject: "Payment Confirmation",
    date: "Jul 14, 2026",
    time: "10:30AM",
    status: "Completed",
    avatar: "https://images.unsplash.com/photo-1508214751196-bfd1434259a4?w=150&h=150&fit=crop&q=80",
  },
  {
    id: "TX-1001",
    name: "Harleen Quinzel",
    category: "Women driver",
    subject: "Payment Confirmation",
    date: "Jul 14, 2026",
    time: "10:30AM",
    status: "Completed",
    avatar: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=150&h=150&fit=crop&q=80",
  },
  {
    id: "TX-1001",
    name: "Carol Danvers",
    category: "Women driver",
    subject: "Unable to Update Landing Page",
    date: "Jul 14, 2026",
    time: "10:30AM",
    status: "Completed",
    avatar: "https://images.unsplash.com/photo-1509839862600-309617c037f4?w=150&h=150&fit=crop&q=80",
  },
  {
    id: "TX-1001",
    name: "Lois Lane",
    category: "Women driver",
    subject: "Unable to Update Landing Page",
    date: "Jul 14, 2026",
    time: "10:30AM",
    status: "Completed",
    avatar: "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?w=150&h=150&fit=crop&q=80",
  },
  {
    id: "TX-1001",
    name: "Pepper Potts",
    category: "Women driver",
    subject: "Unable to Update Landing Page",
    date: "Jul 14, 2026",
    time: "10:30AM",
    status: "Completed",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&h=150&fit=crop&q=80",
  },
];

const getStatusStyle = (status: string) => {
  switch (status) {
    case "Under Review":
      return "bg-blue-50 text-blue-600 border border-blue-100";
    case "Pending":
      return "bg-amber-50 text-amber-600 border border-amber-100";
    case "Completed":
      return "bg-green-50 text-green-600 border border-green-100";
    default:
      return "bg-slate-50 text-slate-600 border border-slate-200";
  }
};

const getStatusDot = (status: string) => {
  switch (status) {
    case "Under Review":
      return "bg-blue-500";
    case "Pending":
      return "bg-amber-500";
    case "Completed":
      return "bg-green-500";
    default:
      return "bg-slate-500";
  }
};

export default function AdminSupportPage() {
  const [selectedSupport, setSelectedSupport] = useState<any | null>(null);

  return (
    <>
      <div className="flex flex-col h-full space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Support Messages</h2>
          <p className="text-slate-500 text-sm mt-1">
            View and manage support requests submitted by drivers.
          </p>
        </div>

        {/* Top Tabs (Added to match the new screenshot provided) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
          {topTabs.map((tab, idx) => (
            <button
              key={idx}
              className={cn(
                "px-6 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap",
                tab.active 
                  ? "border border-blue-200 text-blue-600 bg-blue-50/50" 
                  : "border border-slate-200 text-slate-600 bg-white hover:bg-slate-50"
              )}
            >
              {tab.name}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col flex-1 overflow-hidden">
          {/* Table Header Controls */}
          <div className="flex flex-wrap items-center justify-between p-6 gap-4 border-b border-slate-50">
            <h3 className="text-lg font-bold text-slate-800">Support ticket</h3>
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
                  <th className="px-6 py-4 rounded-tl-lg">Support ID</th>
                  <th className="px-6 py-4">Driver Name</th>
                  <th className="px-6 py-4">Driver Category</th>
                  <th className="px-6 py-4">Subject</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4 text-center rounded-tr-lg">Action</th>
                </tr>
              </thead>
              <tbody>
                {supportData.map((support, index) => (
                  <tr key={index} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-700">{support.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={support.avatar} alt={support.name} className="w-8 h-8 rounded-full object-cover" />
                        <span className="font-medium text-slate-800">{support.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{support.category}</td>
                    <td className="px-6 py-4 text-slate-600">{support.subject}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-slate-800 font-medium">{support.date}</span>
                        <span className="text-slate-500 text-xs">{support.time}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center">
                        <span className={cn(
                          "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium",
                          getStatusStyle(support.status)
                        )}>
                          <span className={cn("w-1.5 h-1.5 rounded-full", getStatusDot(support.status))} />
                          {support.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-3">
                        <button 
                          onClick={() => setSelectedSupport(support)}
                          className="text-green-500 hover:text-green-600 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-red-500 hover:text-red-600 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button className="text-slate-400 hover:text-slate-600 transition-colors">
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
          <div className="flex items-center justify-between p-6 border-t border-slate-50 bg-white">
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

      <SupportMessageModal 
        isOpen={!!selectedSupport} 
        onClose={() => setSelectedSupport(null)} 
        data={selectedSupport} 
      />
    </>
  );
}
