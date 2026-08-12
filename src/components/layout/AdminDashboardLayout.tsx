import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Upload,
  Receipt,
  LifeBuoy,
  Settings,
  LogOut,
  Menu,
  X,
  ClipboardList,
  UserCog,
} from "lucide-react";
import { cn } from "../../lib/cn";
import { LogoutModal } from "../admin/LogoutModal";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import { logOut } from "../../store/features/auth/authSlice";
import { useLogoutUserMutation } from "../../store/api/Auth/auth.api";

const sidebarNavItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { name: "Driver Management", icon: Users, path: "/admin/drivers" },
  { name: "User Management", icon: UserCog, path: "/admin/users" },
  { name: "Resource Management", icon: Upload, path: "/admin/resources" },
  { name: "Checklist Items", icon: ClipboardList, path: "/admin/checklist-items" },
  { name: "Billing", icon: Receipt, path: "/admin/billings" },
  { name: "Support", icon: LifeBuoy, path: "/admin/support" },
  { name: "Settings", icon: Settings, path: "/admin/settings" },
];

export function AdminDashboardLayout({
  children,
  title = "Dashboard Overview",
}: {
  children: React.ReactNode;
  title?: string;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [logoutUser] = useLogoutUserMutation();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleLogout = async () => {
    setIsLogoutModalOpen(false);
    try {
      await logoutUser().unwrap();
    } catch (e) {
      console.error("Logout failed:", e);
    }
    dispatch(logOut());
    navigate("/login");
  };

  return (
    <div className="flex h-[100dvh] w-full bg-[#f8fafc] font-sans overflow-hidden">
      {/* ---------------- Mobile Overlay ---------------- */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleMobileMenu}
        />
      )}

      {/* ---------------- Sidebar ---------------- */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-[#111315] transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 overflow-y-auto flex flex-col",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="p-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-white tracking-tight">
              Quit<span className="text-[#1a56ff]">The</span>App
            </span>
          </Link>
          <button className="lg:hidden text-slate-400 hover:text-white" onClick={toggleMobileMenu}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {sidebarNavItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-[#1a56ff] text-white"
                    : "text-slate-300 hover:bg-white/5 hover:text-white",
                )}
              >
                <item.icon
                  className={cn(
                    "h-5 w-5",
                    isActive ? "text-white" : "text-slate-400",
                  )}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mt-auto">
          <button 
            onClick={() => setIsLogoutModalOpen(true)}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-white bg-[#ef4444] hover:bg-red-600 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Log Out
          </button>
        </div>
      </aside>

      {/* ---------------- Main Content Wrapper ---------------- */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="flex-shrink-0 h-20 flex items-center justify-between px-6 z-10 bg-[#111315] border-b border-white/5">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-white hover:text-slate-300 transition-colors" onClick={toggleMobileMenu}>
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-semibold text-white hidden sm:block tracking-tight">
              {title}
            </h1>
          </div>

          <div className="flex items-center gap-6">
            
            <div className="flex items-center gap-3 border-l border-slate-700 pl-6">
              <div className="flex flex-col items-end hidden sm:flex">
                <span className="text-sm font-semibold text-white">{user?.name || "Admin"}</span>
                <span className="text-xs text-slate-400 font-medium capitalize">{user?.role || "admin"}</span>
              </div>
              <div className="h-10 w-10 rounded-full bg-[#1a56ff] text-white flex items-center justify-center font-bold shadow-sm border border-slate-800">
                {(user?.name || user?.email || "A").slice(0, 2).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#f8fafc]">
          <div className="container mx-auto px-4 sm:px-6 py-6 h-full">
            {children}
          </div>
        </main>
      </div>

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
}
