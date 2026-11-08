import { useEffect } from "react";
import { AppShell } from "./components/layout/AppShell";
import { InstallPrompt } from "./components/pwa/InstallPrompt";
import { OfflineBanner } from "./components/pwa/OfflineBanner";
import { PWAUpdatePrompt } from "./components/pwa/PWAUpdatePrompt";
import { AbandonedCheckoutPrompt } from "./components/pwa/AbandonedCheckoutPrompt";
import { MarketingExitIntent } from "./components/marketing/exit-intent/MarketingExitIntent";
import { AppRouter } from "./routes/AppRouter";
import { resolveBusinessHost } from "./lib/businessHost";
import { useAppDispatch, useAppSelector } from "./hooks/storeHooks";
import { hydrateCredentials, logOut } from "./store/features/auth/authSlice";
import { ProductAnalytics } from "./components/marketing/ProductAnalytics";
import { LanguageProvider } from './i18n/LanguageProvider';
import { useLocation } from 'react-router-dom';

export default function App() {
  const dispatch = useAppDispatch();
  const { accessToken, user } = useAppSelector((state) => state.auth);
  const location = useLocation();
  const defaultLanguage = user?.driverProfile?.category === 'SPANISH' || location.pathname === '/spanish' || new URLSearchParams(location.search).get('lang') === 'es' ? 'es' : 'en';
  const isTenantHost =
    resolveBusinessHost(
      window.location.hostname,
      import.meta.env.VITE_PUBLIC_BUSINESS_DOMAIN || "quittheapp.com",
    ).kind === "tenant";

  useEffect(() => {
    let syncTimer: number | undefined;
    const readSettledAuthState = () => {
      const nextAccessToken = localStorage.getItem("accessToken");
      const nextRefreshToken = localStorage.getItem("refreshToken");
      const nextUser = localStorage.getItem("user");

      if (!nextAccessToken || !nextRefreshToken || !nextUser) {
        dispatch(logOut());
        return;
      }

      try {
        dispatch(
          hydrateCredentials({
            accessToken: nextAccessToken,
            refreshToken: nextRefreshToken,
            user: JSON.parse(nextUser),
          }),
        );
      } catch {
        dispatch(logOut());
      }
    };
    const syncAuthFromStorage = (event: StorageEvent) => {
      if (!["accessToken", "refreshToken", "user"].includes(event.key ?? "")) {
        return;
      }

      window.clearTimeout(syncTimer);
      syncTimer = window.setTimeout(readSettledAuthState, 50);
    };

    window.addEventListener("storage", syncAuthFromStorage);
    return () => {
      window.clearTimeout(syncTimer);
      window.removeEventListener("storage", syncAuthFromStorage);
    };
  }, [dispatch]);

  return (
    <LanguageProvider key={user?.id ?? 'visitor'} defaultLanguage={defaultLanguage} storageKey={`qta-language:${user?.id ?? 'visitor'}`}>
      {!isTenantHost && <ProductAnalytics />}
      <OfflineBanner />
      <AppShell>
        <AppRouter />
      </AppShell>
      <PWAUpdatePrompt />
      {!isTenantHost && accessToken && <InstallPrompt />}
      {!isTenantHost && <AbandonedCheckoutPrompt />}
      {!isTenantHost && <MarketingExitIntent />}
    </LanguageProvider>
  );
}
