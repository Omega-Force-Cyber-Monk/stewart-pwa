import { Bus } from "lucide-react";
import { type ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";

import { LanguageToggle } from "../common/LanguageToggle";
import { useTranslation } from "../../features/localization/useTranslation";
import { cn } from "../../lib/cn";
import { PageContainer } from "./PageContainer";

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
        <PageContainer className="flex flex-col gap-3 py-3 md:flex-row md:items-center md:justify-between md:py-4">
          <div className="flex min-w-0 items-center justify-between gap-3">
            <Link
              className="flex min-h-11 min-w-0 items-center gap-3 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
              to="/standard"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-md bg-cyan-600 text-white">
                <Bus aria-hidden="true" className="size-5" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-base font-bold">{t.common.appName}</span>
                <span className="block truncate text-xs text-slate-500">
                  Transportation launch system
                </span>
              </span>
            </Link>
            <div className="shrink-0 md:hidden">
              <LanguageToggle />
            </div>
          </div>

          <div className="flex min-w-0 flex-col gap-3 md:flex-row md:items-center">
            <nav
              aria-label="Primary navigation"
              className="-mx-1 flex max-w-full gap-1 overflow-x-auto px-1 pb-1 md:mx-0 md:pb-0"
            >
              {navItems.map((item) => (
                <NavLink
                  className={({ isActive }) =>
                    cn(
                      "inline-flex min-h-10 items-center whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600",
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
            <div className="hidden shrink-0 md:block">
              <LanguageToggle />
            </div>
          </div>
        </PageContainer>
      </header>
      {children}
    </div>
  );
}
