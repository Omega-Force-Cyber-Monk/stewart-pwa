import { Bus } from "lucide-react";
import { type ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";

import { useTranslation } from "../../features/localization/useTranslation";
import { cn } from "../../lib/cn";

type AppShellProps = {
  children: ReactNode;
};

const navItems = [
  { label: "Standard", to: "/standard" },
  { label: "Women", to: "/women" },
  { label: "Seniors", to: "/seniors" },
  { label: "Couples", to: "/couples" },
  { label: "Dashboard", to: "/dashboard" },
];

export function AppShell({ children }: AppShellProps) {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between">
          <Link className="flex items-center gap-3" to="/standard">
            <span className="grid size-10 place-items-center rounded-md bg-cyan-600 text-white">
              <Bus aria-hidden="true" className="size-5" />
            </span>
            <span>
              <span className="block text-base font-bold">{t.common.appName}</span>
              <span className="block text-xs text-slate-500">Transportation launch system</span>
            </span>
          </Link>

          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <nav className="flex gap-1 overflow-x-auto">
              {navItems.map((item) => (
                <NavLink
                  className={({ isActive }) =>
                    cn(
                      "whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950",
                      isActive && "bg-slate-900 text-white hover:bg-slate-900 hover:text-white",
                    )
                  }
                  key={item.to}
                  to={item.to}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
