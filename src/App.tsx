import { AppShell } from "./components/layout/AppShell";
import { InstallPrompt } from "./components/pwa/InstallPrompt";
import { OfflineBanner } from "./components/pwa/OfflineBanner";
import { PWAUpdatePrompt } from "./components/pwa/PWAUpdatePrompt";
import { AppRouter } from "./routes/AppRouter";
import { useAppSelector } from "./hooks/storeHooks";

export default function App() {
  const { accessToken } = useAppSelector((state) => state.auth);

  return (
    <>
      <OfflineBanner />
      <AppShell>
        <AppRouter />
      </AppShell>
      <PWAUpdatePrompt />
      {accessToken && <InstallPrompt />}
    </>
  );
}
