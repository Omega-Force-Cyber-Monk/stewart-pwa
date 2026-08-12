import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  Loader2,
} from "lucide-react";
import { cn } from "../../lib/cn";
import { useAppDispatch } from "../../hooks/storeHooks";
import { logOut } from "../../store/features/auth/authSlice";
import { useLogoutUserMutation } from "../../store/api/Auth/auth.api";
import { useGetRiderDashboardQuery } from "../../store/api/Business/business.api";

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
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [logoutUser] = useLogoutUserMutation();
  const { data: dashboardData, isLoading, error } = useGetRiderDashboardQuery();

  useEffect(() => {
    if (isLoading) return;

    // 1. If unauthorized/unpaid, redirect to home page to complete payment
    if (error || !dashboardData || !dashboardData.purchase?.baseVariant || dashboardData.purchase?.status !== "paid") {
      navigate("/?showPricing=true", { replace: true });
      return;
    }

    // 2. Guard navigation between /dashboard and /launch-dashboard based on business status
    if (location.pathname === "/dashboard" && dashboardData.business?.status !== "ACTIVE") {
      navigate("/launch-dashboard", { replace: true });
    } else if (location.pathname === "/launch-dashboard" && dashboardData.business?.status === "ACTIVE") {
      navigate("/dashboard", { replace: true });
    }
  }, [dashboardData, isLoading, error, location.pathname, navigate]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
    } catch (e) {
      console.error("Logout failed:", e);
    }
    dispatch(logOut());
    navigate("/", { replace: true });
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#f8fafc]">
        <Loader2 className="w-8 h-8 text-green-500 animate-spin" />
      </div>
    );
  }

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
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-[#f42661] bg-[#f42661]/10 hover:bg-[#f42661]/20 transition-colors"
            >
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
            {/* Nav items can go here */}
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">{children}</div>
      </main>
    </div>
  );
}
