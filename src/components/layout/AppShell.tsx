import { ArrowRight, Menu, X } from "lucide-react";
import { type ReactNode, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { LanguageToggle } from "../common/LanguageToggle";
import { useAppSelector } from "../../app/hooks";
import logoWeb from "../../assets/logoWeb.png";
import { selectOnboardingCompleted } from "../../features/appFlow/appFlowSlice";
import { cn } from "../../lib/cn";
import { PageContainer } from "./PageContainer";

type AppShellProps = {
  children: ReactNode;
};

const baseNavItems = [
  { label: "Home", to: "/standard" },
  { label: "What's Included", to: "/standard#benefits" },
  { label: "Success Stories", to: "/standard#success-stories" },
  { label: "FAQ", to: "/standard#faq" },
  { label: "Contact", to: "/standard#contact" },
];

export function AppShell({ children }: AppShellProps) {
  const location = useLocation();
  const onboardingCompleted = useAppSelector(selectOnboardingCompleted);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = onboardingCompleted
    ? [...baseNavItems, { label: "Dashboard", to: "/dashboard" }]
    : baseNavItems;

  useEffect(() => {
    if (!location.hash) return;

    window.requestAnimationFrame(() => {
      document.querySelector(location.hash)?.scrollIntoView({ behavior: "smooth" });
    });
  }, [location]);

  const isActiveLink = (to: string) => {
    const [pathname, hash = ""] = to.split("#");

    if (hash) {
      return location.pathname === pathname && location.hash === `#${hash}`;
    }

    return location.pathname === pathname && !location.hash;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
        <PageContainer className="flex min-h-[64px] items-center justify-between gap-4 py-3">
          <div className="flex min-w-0 items-center">
            <Link
              aria-label="QuitTheApp home"
              className="flex min-h-11 min-w-0 cursor-pointer items-center rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500"
              to="/standard"
            >
              <img
                alt="QuitTheApp"
                className="h-9 w-auto shrink-0 object-contain sm:h-10"
                src={logoWeb}
              />
            </Link>
          </div>

          <div className="hidden min-w-0 items-center gap-5 lg:flex">
            <nav
              aria-label="Primary navigation"
              className="flex items-center gap-1"
            >
              {navItems.map((item) => (
                <Link
                  className={cn(
                    "inline-flex min-h-10 cursor-pointer items-center whitespace-nowrap rounded-md px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-pink-50 hover:text-pink-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500",
                    isActiveLink(item.to) && "text-pink-600",
                  )}
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <LanguageToggle />
            <Link
              className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full bg-pink-500 px-5 text-sm font-bold text-white shadow-sm transition hover:bg-pink-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500"
              to="/standard#pricing"
            >
              Started The Business
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>

          <button
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="inline-grid size-11 cursor-pointer place-items-center rounded-md border border-slate-200 bg-white text-slate-800 transition hover:bg-pink-50 hover:text-pink-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500 lg:hidden"
            onClick={() => setIsMenuOpen((current) => !current)}
            type="button"
          >
            {isMenuOpen ? (
              <X aria-hidden="true" className="size-5" />
            ) : (
              <Menu aria-hidden="true" className="size-5" />
            )}
          </button>
        </PageContainer>

        {isMenuOpen && (
          <div className="border-t border-slate-200 bg-white lg:hidden">
            <PageContainer className="grid gap-3 py-4">
              <nav aria-label="Mobile navigation" className="grid gap-1">
                {navItems.map((item) => (
                  <Link
                    className={cn(
                      "flex min-h-11 cursor-pointer items-center rounded-md px-3 text-sm font-semibold text-slate-700 transition hover:bg-pink-50 hover:text-pink-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500",
                      isActiveLink(item.to) && "bg-pink-50 text-pink-600",
                    )}
                    key={item.to}
                    onClick={() => setIsMenuOpen(false)}
                    to={item.to}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="flex flex-col gap-3 border-t border-slate-100 pt-3 sm:flex-row sm:items-center sm:justify-between">
                <LanguageToggle />
                <Link
                  className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full bg-pink-500 px-5 text-sm font-bold text-white shadow-sm transition hover:bg-pink-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500"
                  onClick={() => setIsMenuOpen(false)}
                  to="/standard#pricing"
                >
                  Started The Business
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </div>
            </PageContainer>
          </div>
        )}
      </header>
      {children}
    </div>
  );
}
