import { AppShell } from "./components/layout/AppShell";
import { InstallPrompt } from "./components/pwa/InstallPrompt";
import { OfflineBanner } from "./components/pwa/OfflineBanner";
import { PWAUpdatePrompt } from "./components/pwa/PWAUpdatePrompt";
import { AbandonedCheckoutPrompt } from "./components/pwa/AbandonedCheckoutPrompt";
import { MarketingExitIntent } from "./components/marketing/exit-intent/MarketingExitIntent";
import { AppRouter } from "./routes/AppRouter";
import { resolveBusinessHost } from "./lib/businessHost";
import { useAppSelector } from "./hooks/storeHooks";

export default function App() {
  const { accessToken } = useAppSelector((state) => state.auth);
  const isTenantHost =
    resolveBusinessHost(
      window.location.hostname,
      import.meta.env.VITE_PUBLIC_BUSINESS_DOMAIN || "quittheapp.com",
    ).kind === "tenant";

  return (
    <>
      <OfflineBanner />
      <AppShell>
        <AppRouter />
      </AppShell>
      <PWAUpdatePrompt />
      {!isTenantHost && accessToken && <InstallPrompt />}
      {!isTenantHost && <AbandonedCheckoutPrompt />}
      {!isTenantHost && <MarketingExitIntent />}
    </>
  );
}
