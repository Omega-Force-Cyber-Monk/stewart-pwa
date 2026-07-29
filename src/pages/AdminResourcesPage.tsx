import { 
  ChevronDown, 
  Plus, 
  FolderSearch, 
  FileText, 
  Printer, 
  Mail, 
  ClipboardCheck, 
  FileBadge,
  UserCheck
} from "lucide-react";
import { cn } from "../lib/cn";
import { Link } from "react-router-dom";

const topTabs = [
  { name: "Customer Acquisition", active: true },
  { name: "Referral Card System™", active: false },
  { name: "Repeat Rider Engine™", active: false },
  { name: "Direct Booking Trust", active: false },
  { name: "Launch Essentials", active: false },
  { name: "Resources & Guides", active: false },
];

const sideTabs = [
  { name: "Resources Cards", active: true },
  { name: "Launch Checklist Guide", active: false },
];

const resourceCards = [
  {
    title: "Hotel & Local Partner Outreach Kit™",
    description: "Everything you need to confidently approach hotels, medical offices, and local businesses for referral partnerships.",
    icon: FolderSearch,
    color: "blue",
  },
  {
    title: "Partner List Worksheet",
    description: "Organize and track potential referral partners in your area with an easy-to-use planning worksheet.",
    icon: FileText,
    color: "green",
  },
  {
    title: "Front Desk Script",
    description: "Use this ready-made conversation script to confidently introduce your services to hotel front desk staff.",
    icon: Printer,
    color: "purple",
  },
  {
    title: "Hotel Manager Email",
    description: "A professional email template for introducing your transportation services to hotel managers.",
    icon: Mail,
    color: "yellow",
  },
  {
    title: "Local Partner Email",
    description: "Reach out to local businesses with a ready-to-use partnership email template.",
    icon: Mail,
    color: "teal",
  },
  {
    title: "One-Page Partner Flyer",
    description: "A printable one-page flyer that highlights your services and encourages referral partnerships.",
    icon: FileText,
    color: "indigo",
  },
  {
    title: "Partner Tracking Sheet",
    description: "Track visits, follow-ups, referrals, and partner relationships in one organized place.",
    icon: ClipboardCheck,
    color: "cyan",
  },
  {
    title: "Referral Thank-You System",
    description: "Send personalized thank-you messages to strengthen relationships and encourage more referrals.",
    icon: FileBadge,
    color: "slate",
  },
];

const getColorStyles = (color: string) => {
  switch (color) {
    case "blue": return { bg: "bg-blue-50", border: "border-blue-100", text: "text-blue-500", icon: "text-blue-500" };
    case "green": return { bg: "bg-green-50", border: "border-green-100", text: "text-green-500", icon: "text-green-500" };
    case "purple": return { bg: "bg-fuchsia-50", border: "border-fuchsia-100", text: "text-fuchsia-500", icon: "text-fuchsia-500" };
    case "yellow": return { bg: "bg-amber-50", border: "border-amber-100", text: "text-amber-500", icon: "text-amber-500" };
    case "teal": return { bg: "bg-teal-50", border: "border-teal-100", text: "text-teal-500", icon: "text-teal-500" };
    case "indigo": return { bg: "bg-purple-50", border: "border-purple-100", text: "text-purple-500", icon: "text-purple-500" };
    case "cyan": return { bg: "bg-cyan-50", border: "border-cyan-100", text: "text-cyan-500", icon: "text-cyan-500" };
    case "slate": return { bg: "bg-slate-50", border: "border-slate-200", text: "text-slate-500", icon: "text-slate-500" };
    default: return { bg: "bg-gray-50", border: "border-gray-100", text: "text-gray-500", icon: "text-gray-500" };
  }
};

export default function AdminResourcesPage() {
  return (
    <div className="flex flex-col h-full space-y-6 overflow-hidden">
      
      {/* Top Filter Bar */}
      <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide flex-shrink-0">
        <button className="flex items-center gap-2 whitespace-nowrap px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-800 shadow-sm">
          Drivers Category <span className="text-slate-500 font-normal">(Women)</span>
          <ChevronDown className="w-4 h-4 text-slate-400 ml-1" />
        </button>
        
        <div className="flex items-center gap-2">
          {topTabs.map((tab, idx) => (
            <button
              key={idx}
              className={cn(
                "flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                tab.active 
                  ? "bg-[#1a56ff] text-white shadow-sm" 
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              )}
            >
              {tab.active && <UserCheck className="w-4 h-4" />}
              {!tab.active && <span className="w-4 h-4 flex items-center justify-center opacity-50">✦</span>}
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        {/* Left Sidebar Panel */}
        <div className="w-full lg:w-72 flex-shrink-0 flex flex-col bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-800">Page Information</h3>
            <p className="text-sm text-slate-500 mt-1">Manage all information of this page</p>
          </div>
          
          <div className="space-y-3 flex-1">
            {sideTabs.map((tab, idx) => (
              <button
                key={idx}
                className={cn(
                  "w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors text-left",
                  tab.active 
                    ? "bg-[#1a56ff] text-white shadow-md shadow-blue-500/20" 
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                )}
              >
                {tab.name}
              </button>
            ))}
          </div>
          
          <Link to="/admin/resources/add" className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#111315] text-white font-medium hover:bg-black transition-colors text-sm">
            <Plus className="w-4 h-4" />
            Add More
          </Link>
        </div>

        {/* Right Content Panel */}
        <div className="flex-1 flex flex-col bg-white rounded-2xl border border-slate-100 shadow-sm p-6 overflow-hidden">
          <div className="flex-1 overflow-y-auto pr-2">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {resourceCards.map((card, idx) => {
                const styles = getColorStyles(card.color);
                const Icon = card.icon;
                return (
                  <div 
                    key={idx} 
                    className={cn(
                      "flex flex-col items-center text-center p-6 rounded-2xl border transition-transform hover:-translate-y-1 hover:shadow-md cursor-pointer",
                      styles.bg,
                      styles.border
                    )}
                  >
                    <Icon className={cn("w-8 h-8 mb-4", styles.icon)} />
                    <h4 className="font-bold text-slate-800 text-sm mb-2">{card.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-end items-center gap-4 mt-6 pt-6 border-t border-slate-100 flex-shrink-0">
            <button className="px-6 py-2.5 rounded-full border border-[#1a56ff] text-[#1a56ff] font-semibold hover:bg-blue-50 transition-colors text-sm">
              Edit Resources
            </button>
            <button className="px-6 py-2.5 rounded-full bg-[#1a56ff] hover:bg-blue-700 text-white font-semibold shadow-sm transition-colors text-sm flex items-center gap-2">
              Save & Upload
              <span className="font-bold">»</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
