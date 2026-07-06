import { ArrowRight, Menu, RotateCcw, X } from "lucide-react";
import { type ReactNode, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { LanguageToggle } from "../common/LanguageToggle";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { clearPersistedState } from "../../app/persistStore";
import logoWeb from "../../assets/logoWeb.png";
import {
  resetDemo,
  selectApprovalStatus,
  selectHasPurchased,
  selectOnboardingCompleted,
} from "../../features/appFlow/appFlowSlice";
import { useTranslation } from "../../features/localization/useTranslation";
import { cn } from "../../lib/cn";
import { PageContainer } from "./PageContainer";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const hasPurchased = useAppSelector(selectHasPurchased);
  const onboardingCompleted = useAppSelector(selectOnboardingCompleted);
  const approvalStatus = useAppSelector(selectApprovalStatus);
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const canResetDemo =
    hasPurchased || onboardingCompleted || approvalStatus !== "not_submitted";
  const baseNavItems = [
    { label: t.navigation.home, to: "/women" },
    { label: t.navigation.whatsIncluded, to: "/women#whats-included" },
    { label: t.navigation.pricing, to: "/women#pricing" },
    { label: t.navigation.successStories, to: "/women#success-stories" },
    { label: t.navigation.faq, to: "/women#faq" },
    { label: t.navigation.contact, to: "/women#contact" },
    // { label: t.navigation.admin, to: "/admin" },
  ];
  const navItems = baseNavItems;

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

  const openCheckoutFromNav = () => {
    setIsMenuOpen(false);
    navigate("/women#pricing", {
      state: { checkoutRequestId: Date.now() },
    });
  };

  const handleResetDemo = () => {
    dispatch(resetDemo());
    clearPersistedState();
    setIsMenuOpen(false);
    navigate("/women", { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
        <PageContainer
          className="flex min-h-[64px] items-center justify-between gap-4 py-3"
          size="landing"
        >
          <div className="flex min-w-0 items-center">
            <Link
              aria-label={t.common.homeLabel}
              className="flex min-h-11 min-w-0 cursor-pointer items-center rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500"
              to="/women"
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
              aria-label={t.common.primaryNavigation}
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
            <button
              className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full bg-pink-500 px-5 text-sm font-bold text-white shadow-sm transition hover:bg-pink-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500"
              onClick={openCheckoutFromNav}
              type="button"
            >
              {t.navigation.startedBusiness}
              <ArrowRight aria-hidden="true" className="size-4" />
            </button>
          </div>

          <button
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? t.navigation.closeMenu : t.navigation.openMenu}
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
            <PageContainer className="grid gap-3 py-4" size="landing">
              <nav aria-label={t.common.mobileNavigation} className="grid gap-1">
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
                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full bg-pink-500 px-5 text-sm font-bold text-white shadow-sm transition hover:bg-pink-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500"
                    onClick={openCheckoutFromNav}
                    type="button"
                  >
                    {t.navigation.startedBusiness}
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </button>
                </div>
              </div>
            </PageContainer>
          </div>
        )}
      </header>
      {children}
      {canResetDemo && (
        <button
          aria-label={t.common.resetDemo}
          className="fixed bottom-5 right-5 z-50 inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full border border-pink-200 bg-white px-4 text-sm font-bold text-slate-800 shadow-lg shadow-slate-950/10 transition hover:-translate-y-0.5 hover:border-pink-300 hover:bg-pink-50 hover:text-pink-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500 sm:bottom-6 sm:right-6"
          onClick={handleResetDemo}
          type="button"
        >
          <RotateCcw aria-hidden="true" className="size-4" />
          <span className="hidden sm:inline">{t.common.resetDemo}</span>
        </button>
      )}
    </div>
  );
}
