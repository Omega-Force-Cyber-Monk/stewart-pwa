import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { logOut } from "../store/features/auth/authSlice";
import { useLogoutUserMutation } from "../store/api/Auth/auth.api";
import { ChevronDown, LogOut, LayoutDashboard, Settings, CreditCard, ShieldCheck } from "lucide-react";

interface ProfileDropdownProps {
  openPricingModal?: () => void;
}

export function ProfileDropdown({ openPricingModal }: ProfileDropdownProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { accessToken, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [logoutUser] = useLogoutUserMutation();

  // Click outside listener for profile dropdown
  useEffect(() => {
    if (!dropdownOpen) return;
    const handleClose = () => setDropdownOpen(false);
    window.addEventListener("click", handleClose);
    return () => window.removeEventListener("click", handleClose);
  }, [dropdownOpen]);

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
    } catch (e) {
      console.error("Logout failed:", e);
    }
    dispatch(logOut());
    setDropdownOpen(false);
  };

  if (!accessToken) return null;

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setDropdownOpen(!dropdownOpen);
        }}
        className="cursor-pointer flex items-center gap-1.5 focus:outline-none transition animate-fade-in"
      >
        <div className="size-9 rounded-full bg-cyan-400/10 flex items-center justify-center border border-[#04B5A3]/40 hover:bg-cyan-400/20 transition">
          <span className="text-sm font-bold text-cyan-400 uppercase">
            {user?.email?.charAt(0) || "U"}
          </span>
        </div>
        <ChevronDown className="size-4 text-slate-400" />
      </button>

      {dropdownOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute right-0 mt-2 w-52 rounded-lg bg-[#12143A] border border-[#00E5FF33] py-2 shadow-2xl z-50 text-left animate-fade-in text-slate-200"
        >
          <div className="px-4 py-2 border-b border-brand-border/30">
            <p className="text-xs text-slate-400">Signed in as</p>
            <p className="text-sm font-semibold text-slate-200 truncate">
              {user?.email}
            </p>
          </div>

          <div className="py-1">
            {user?.role === "admin" ? (
              <Link
                to="/admin"
                onClick={() => setDropdownOpen(false)}
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-200 hover:bg-[#04B5A3]/10 hover:text-white transition"
              >
                <ShieldCheck className="size-4 text-cyan-400" />
                Admin Dashboard
              </Link>
            ) : user?.status === "active" ? (
              <Link
                to="/dashboard"
                onClick={() => setDropdownOpen(false)}
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-200 hover:bg-[#04B5A3]/10 hover:text-white transition"
              >
                <LayoutDashboard className="size-4 text-cyan-400" />
                Dashboard
              </Link>
            ) : (
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  if (openPricingModal) {
                    openPricingModal();
                  } else {
                    window.location.href = "/?showPricing=true";
                  }
                }}
                className="w-full text-left flex items-center gap-2 px-4 py-2.5 text-sm text-slate-200 hover:bg-[#04B5A3]/10 hover:text-white transition"
              >
                <CreditCard className="size-4 text-cyan-400" />
                Complete Checkout
              </button>
            )}
            <Link
              to={user?.role === "admin" ? "/admin/settings" : "/profile"}
              onClick={() => setDropdownOpen(false)}
              className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-200 hover:bg-[#04B5A3]/10 hover:text-white transition"
            >
              <Settings className="size-4 text-cyan-400" />
              {user?.role === "admin" ? "Admin Settings" : "Profile & Settings"}
            </Link>
          </div>

          <div className="border-t border-brand-border/30 pt-1 mt-1">
            <button
              onClick={handleLogout}
              className="w-full text-left flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition"
            >
              <LogOut className="size-4 text-red-400" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
