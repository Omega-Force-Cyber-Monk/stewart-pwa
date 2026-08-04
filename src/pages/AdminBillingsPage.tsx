import { useState } from "react";
import { Eye, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../lib/cn";
import { BillingDetailsModal } from "../components/admin/BillingDetailsModal";

const topTabs = [
  { name: "Women Focused", active: true },
  { name: "Couples", active: false },
  { name: "Drivers 50+", active: false },
  { name: "Main", active: false },
  { name: "Spanish", active: false },
];

const billingsData = [
  {
    id: "TX-1001",
    name: "Sarah Johnson",
    category: "Women Focused",
    type: "DIY System",
    amount: "$495",
    method: "Stripe",
    date: "Jul 14, 2026",
    time: "10:30AM",
    status: "Paid",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&q=80",
  },
  {
    id: "TX-1002",
    name: "Wanda Maximoff",
    category: "Women Focused",
    type: "We Do It for You Upgrade",
    amount: "$199",
    method: "Stripe",
    date: "Jul 14, 2026",
    time: "10:30AM",
    status: "Paid",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&q=80",
  },
  {
    id: "TX-1003",
    name: "Karen Starr",
    category: "Women Focused",
    type: "DIY System",
    amount: "$495",
    method: "Stripe",
    date: "Jul 14, 2026",
    time: "10:30AM",
    status: "Paid",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&q=80",
  },
  {
    id: "TX-1004",
    name: "Diana Prince",
    category: "Women Focused",
    type: "DIY System",
    amount: "$495",
    method: "Stripe",
    date: "Jul 14, 2026",
    time: "10:30AM",
    status: "Paid",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&q=80",
  },
  {
    id: "TX-1005",
    name: "Natasha Romanoff",
    category: "Women Focused",
    type: "DIY System",
    amount: "$495",
    method: "Stripe",
    date: "Jul 14, 2026",
    time: "10:30AM",
    status: "Paid",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop&q=80",
  },
  {
    id: "TX-1006",
    name: "Barbara Gordon",
    category: "Women Focused",
    type: "DIY System",
    amount: "$495",
    method: "Stripe",
    date: "Jul 14, 2026",
    time: "10:30AM",
    status: "Paid",
    avatar: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=150&h=150&fit=crop&q=80",
  },
  {
    id: "TX-1007",
    name: "Paula Irving",
    category: "Women Focused",
    type: "DIY System",
    amount: "$495",
    method: "Stripe",
    date: "Jul 14, 2026",
    time: "10:30AM",
    status: "Paid",
    avatar: "https://images.unsplash.com/photo-1508214751196-bfd1434259a4?w=150&h=150&fit=crop&q=80",
  },
  {
    id: "TX-1008",
    name: "Harleen Quinzel",
    category: "Women Focused",
    type: "DIY System",
    amount: "$495",
    method: "Stripe",
    date: "Jul 14, 2026",
    time: "10:30AM",
    status: "Paid",
    avatar: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=150&h=150&fit=crop&q=80",
  },
  {
    id: "TX-1009",
    name: "Carol Danvers",
    category: "Women Focused",
    type: "We Do It for You Upgrade",
    amount: "$199",
    method: "Stripe",
    date: "Jul 14, 2026",
    time: "10:30AM",
    status: "Paid",
    avatar: "https://images.unsplash.com/photo-1509839862600-309617c037f4?w=150&h=150&fit=crop&q=80",
  },
  {
    id: "TX-1010",
    name: "Lois Lane",
    category: "Women Focused",
    type: "We Do It for You Upgrade",
    amount: "$199",
    method: "Stripe",
    date: "Jul 14, 2026",
    time: "10:30AM",
    status: "Paid",
    avatar: "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?w=150&h=150&fit=crop&q=80",
  },
  {
    id: "TX-1011",
    name: "Pepper Potts",
    category: "Women Focused",
    type: "We Do It for You Upgrade",
    amount: "$199",
    method: "Stripe",
    date: "Jul 14, 2026",
    time: "10:30AM",
    status: "Paid",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&h=150&fit=crop&q=80",
  },
];

export default function AdminBillingsPage() {
  const [selectedBilling, setSelectedBilling] = useState<any | null>(null);

  return (
    <>
      <div className="flex flex-col space-y-6 flex-1">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Billing Overview</h2>
            <p className="text-slate-500 text-sm mt-1">
              Track all one-time payments and add-on purchases made by drivers.
            </p>
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-bold text-slate-800">$0</h2>
            <p className="text-slate-500 text-sm">Total Revenue</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col">
          {/* Table Header Controls */}
          <div className="flex flex-col sm:flex-row flex-wrap sm:items-center justify-between p-6 gap-4 border-b border-slate-50">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
              {topTabs.map((tab, idx) => (
                <button
                  key={idx}
                  className={cn(
                    "px-6 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap",
                    tab.active 
                      ? "border border-blue-200 text-blue-600 bg-blue-50/50" 
                      : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                  )}
                >
                  {tab.name}
                </button>
              ))}
            </div>
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
                  <th className="px-6 py-4 rounded-tl-lg">Transaction ID</th>
                  <th className="px-6 py-4">Driver Name</th>
                  <th className="px-6 py-4">Driver Category</th>
                  <th className="px-6 py-4">Purchased Product</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Payment Method</th>
                  <th className="px-6 py-4">Purchase Date</th>
                  <th className="px-6 py-4">Payment Status</th>
                  <th className="px-6 py-4 text-center rounded-tr-lg">Action</th>
                </tr>
              </thead>
              <tbody>
                {billingsData.map((billing, index) => (
                  <tr key={index} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-700">{billing.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={billing.avatar} alt={billing.name} className="w-8 h-8 rounded-full object-cover" />
                        <span className="font-medium text-slate-800">{billing.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{billing.category}</td>
                    <td className="px-6 py-4 text-slate-600">{billing.type}</td>
                    <td className="px-6 py-4 font-medium text-slate-800">{billing.amount}</td>
                    <td className="px-6 py-4 text-slate-600">{billing.method}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-slate-800 font-medium">{billing.date}</span>
                        <span className="text-slate-500 text-xs">{billing.time}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-green-50 text-green-600 border border-green-100">
                        {billing.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button 
                        onClick={() => setSelectedBilling(billing)}
                        className="text-green-500 hover:text-green-600 transition-colors"
                      >
                        <Eye className="w-4 h-4 mx-auto" />
                      </button>
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

      <BillingDetailsModal 
        isOpen={!!selectedBilling} 
        onClose={() => setSelectedBilling(null)} 
        data={selectedBilling} 
      />
    </>
  );
}
