import { AppShell } from "./components/layout/AppShell";
import { LanguageToggle } from "./components/common/LanguageToggle";
import { InstallPrompt } from "./components/pwa/InstallPrompt";
import { OfflineBanner } from "./components/pwa/OfflineBanner";
import { PWAUpdatePrompt } from "./components/pwa/PWAUpdatePrompt";
import { AppRouter } from "./routes/AppRouter";

export default function App() {
  return (
    <>
      <LanguageToggle />
      <OfflineBanner />
      <AppShell>
        <AppRouter />
      </AppShell>
      <PWAUpdatePrompt />
      <InstallPrompt />
    </>
  );
}
