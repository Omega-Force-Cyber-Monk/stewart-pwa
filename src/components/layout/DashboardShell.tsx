import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  BookOpen,
  CalendarDays,
  CreditCard,
  Globe,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  Menu,
  Receipt,
  Settings,
  Upload,
  User,
  Users,
  X,
} from "lucide-react";
import { cn } from "../../lib/cn";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import { logOut } from "../../store/features/auth/authSlice";
import { useLogoutUserMutation } from "../../store/api/Auth/auth.api";
import { useGetRiderDashboardQuery } from "../../store/api/Business/business.api";
import { LogoutModal } from "../admin/LogoutModal";

export type DashboardShellVariant = "rider" | "admin";

type NavigationItem = {
  name: string;
  path: string;
  icon: typeof LayoutDashboard;
};

const riderSections: Array<{ title: string; items: NavigationItem[] }> = [
  {
    title: "Launch Tools",
    items: [
      { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
      { name: "Booking & Referral Card", path: "/booking-referral-card", icon: CalendarDays },
      { name: "Selling Page", path: "/selling-page", icon: Globe },
      { name: "Resources & Guide", path: "/resources-guide", icon: BookOpen },
    ],
  },
  {
    title: "Account",
    items: [
      { name: "Payment & Billing", path: "/payment-billing", icon: Receipt },
      { name: "Profile & Settings", path: "/profile-settings", icon: User },
    ],
  },
];

const adminSections: Array<{ title: string; items: NavigationItem[] }> = [
  {
    title: "",
    items: [
      { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
      { name: "Drivers Management", path: "/admin/drivers", icon: Users },
      { name: "Resources Upload", path: "/admin/resources-upload", icon: Upload },
      { name: "Billings", path: "/admin/billings", icon: CreditCard },
      { name: "Support", path: "/admin/support", icon: LifeBuoy },
      { name: "Settings", path: "/admin/settings", icon: Settings },
    ],
  },
];

interface DashboardShellProps {
  children: React.ReactNode;
  title?: string;
  variant: DashboardShellVariant;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase() || "U";
}

export function DashboardShell({ children, title = "Dashboard Overview", variant }: DashboardShellProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [logoutUser] = useLogoutUserMutation();
  const { user, accessToken } = useAppSelector((state) => state.auth);
  const riderDashboard = useGetRiderDashboardQuery(undefined, { skip: variant !== "rider" || !accessToken });

  useEffect(() => {
    if (variant !== "rider" || !accessToken || riderDashboard.isLoading) return;
    if (riderDashboard.error && location.pathname !== "/launch-dashboard") {
      navigate("/?showPricing=true", { replace: true });
    }
  }, [accessToken, location.pathname, navigate, riderDashboard.error, riderDashboard.isLoading, variant]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const sections = variant === "rider" ? riderSections : adminSections;
  const displayName = user?.name || user?.email || (variant === "admin" ? "Admin" : "Driver");
  const category = user?.driverProfile?.category || (variant === "admin" ? "Admin" : "Driver");
  const isRider = variant === "rider";
  const accent = isRider ? "#22c55e" : "#2563eb";

  const handleLogout = async () => {
    setIsLogoutModalOpen(false);
    try {
      await logoutUser().unwrap();
    } catch {
      // Local credentials must be cleared even if the server is unavailable.
    }
    dispatch(logOut());
    navigate(isRider ? "/" : "/login", { replace: true });
  };

  return (
    <div className="flex h-[100dvh] w-full overflow-hidden bg-dashboard-canvas font-sans">
      {isMobileMenuOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          className="fixed inset-0 z-40 bg-slate-950/50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 shrink-0 flex-col overflow-y-auto bg-dashboard-sidebar text-white transition-transform duration-300 lg:static lg:translate-x-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between px-6 py-7">
          <Link to={isRider ? "/dashboard" : "/admin"} className="text-2xl font-bold tracking-tight">
            Quit<span className="text-blue-500">The</span>App
          </Link>
          <button type="button" className="text-slate-300 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu">
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 space-y-5 px-4">
          {sections.map((section) => (
            <div key={section.title || "main"}>
              {section.title && <h2 className="mb-2 border-b border-white/20 px-2 pb-2 text-[11px] font-medium text-slate-400">{section.title}</h2>}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const active = item.path === "/admin" || item.path === "/dashboard"
                    ? location.pathname === item.path
                    : location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                        active ? "text-white" : "text-slate-300 hover:bg-white/10 hover:text-white",
                      )}
                      style={active ? { backgroundColor: accent } : undefined}
                    >
                      <item.icon className="h-[18px] w-[18px]" />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
        <div className="mt-auto p-4">
          <button
            type="button"
            onClick={() => setIsLogoutModalOpen(true)}
            className="flex w-full items-center gap-3 rounded-lg bg-red-500/20 px-3 py-2.5 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/30"
          >
            <LogOut className="h-[18px] w-[18px]" />
            Log Out
          </button>
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="flex h-16 shrink-0 items-center justify-between bg-dashboard-navy px-4 text-white shadow-sm sm:px-6">
          <div className="flex items-center gap-3">
            <button type="button" className="lg:hidden" onClick={() => setIsMobileMenuOpen(true)} aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="text-base font-semibold sm:text-lg">{title}</h1>
          </div>
          <Link to={isRider ? "/profile-settings" : "/admin/settings"} className="flex items-center gap-3 rounded-lg px-2 py-1 hover:bg-white/10">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold leading-tight">{displayName}</p>
              <p className="text-[11px] text-slate-300">{category}</p>
            </div>
            {user?.avatarUrl ? (
              <img src={user.avatarUrl} alt="" className="h-9 w-9 rounded-full object-cover" />
            ) : (
              <span className="grid h-9 w-9 place-items-center rounded-full bg-blue-600 text-xs font-bold">{getInitials(displayName)}</span>
            )}
          </Link>
        </header>
        <main className="min-w-0 flex-1 overflow-x-hidden overflow-y-auto bg-dashboard-canvas">
          <div className="mx-auto w-full max-w-[1400px] p-4 sm:p-6 lg:p-8">{children}</div>
        </main>
      </div>
      <LogoutModal isOpen={isLogoutModalOpen} onClose={() => setIsLogoutModalOpen(false)} onConfirm={handleLogout} />
    </div>
  );
}
