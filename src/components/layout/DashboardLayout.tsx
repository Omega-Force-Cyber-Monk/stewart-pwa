import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Rocket,
  CalendarDays,
  CreditCard,
  Users,
  RefreshCcw,
  ShieldCheck,
  Package,
  Globe,
  BookOpen,
  User,
  Receipt,
  LogOut,
  Menu,
  X,
  Bell,
} from "lucide-react";
import { cn } from "../../lib/cn";

const sidebarNavItems = [
  {
    title: "Launch Tools",
    items: [
      { name: "Booking System™", icon: CalendarDays, path: "/booking-system" },
      {
        name: "Referral Card System™",
        icon: CreditCard,
        path: "/referral-card",
      },
      { name: "Client Acquisition Center™", icon: Users, path: "/acquisition" },
      { name: "Repeat Rider Engine™", icon: RefreshCcw, path: "/repeat-rider" },
      { name: "Direct Booking Trust Center™", icon: ShieldCheck, path: "/trust" },
      { name: "Launch Essentials", icon: Package, path: "/essentials" },
      { name: "Selling Page™", icon: Globe, path: "/selling-page" },
      { name: "Resources & Guides", icon: BookOpen, path: "/resources" },
    ],
  },
  {
    title: "Account",
    items: [
      { name: "My Profile", icon: User, path: "/profile" },
      { name: "Billing & Orders", icon: Receipt, path: "/billing" },
    ],
  },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export function DashboardLayout({ children, title = "Dashboard Overview" }: DashboardLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden">
      {/* ---------------- Mobile Sidebar Overlay ---------------- */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleMobileMenu}
        />
      )}

      {/* ---------------- Sidebar ---------------- */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-[#0a1128] text-white transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 overflow-y-auto",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="p-6 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold tracking-tighter">
            Quit<span className="text-blue-500">The</span>App
          </Link>
          <button
            className="lg:hidden text-slate-300"
            onClick={toggleMobileMenu}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-4 px-4 space-y-1">
          <Link
            to="/dashboard"
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              location.pathname === "/dashboard"
                ? "bg-[#22c55e] text-white"
                : "text-slate-300 hover:bg-white/10 hover:text-white",
            )}
          >
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Link>

          <Link
            to="/launch-dashboard"
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              location.pathname === "/launch-dashboard"
                ? "bg-[#22c55e] text-white"
                : "text-slate-300 hover:bg-white/10 hover:text-white",
            )}
          >
            <Rocket className="h-5 w-5" />
            Launch Dashboard™
          </Link>

          {sidebarNavItems.map((section, idx) => (
            <div key={idx} className="pt-6">
              <h4 className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                {section.title}
              </h4>
              <div className="space-y-1">
                {section.items.map((item, i) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={i}
                      to={item.path}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        isActive
                          ? "bg-[#22c55e]/10 text-[#22c55e]"
                          : "text-slate-300 hover:bg-white/10 hover:text-white"
                      )}
                    >
                      <item.icon className="h-[18px] w-[18px]" />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="pt-6 pb-8">
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-[#f42661] bg-[#f42661]/10 hover:bg-[#f42661]/20 transition-colors">
              <LogOut className="h-[18px] w-[18px]" />
              Log Out
            </button>
          </div>
        </nav>
      </aside>

      {/* ---------------- Main Content ---------------- */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="flex-shrink-0 h-16 bg-[#0a1128] lg:bg-white lg:border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 z-10 shadow-sm lg:shadow-none">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-white" onClick={toggleMobileMenu}>
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-lg font-semibold text-white lg:text-slate-800 hidden sm:block">
              {title}
            </h1>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <button className="relative text-white lg:text-slate-500 hover:text-slate-300 lg:hover:text-slate-700">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                2
              </span>
            </button>

            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <div className="text-sm font-medium text-white lg:text-slate-900">
                  Eleanor Pena
                </div>
                <div className="text-xs text-slate-300 lg:text-slate-500">
                  Women Driver
                </div>
              </div>
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="User avatar"
                className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover border border-slate-200"
              />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">{children}</div>
      </main>
    </div>
  );
}
