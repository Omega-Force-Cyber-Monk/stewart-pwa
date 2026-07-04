import { AppShell } from "./components/layout/AppShell";
import { InstallPrompt } from "./components/pwa/InstallPrompt";
import { OfflineBanner } from "./components/pwa/OfflineBanner";
import { AppRouter } from "./routes/AppRouter";

export default function App() {
  return (
    <>
      <OfflineBanner />
      <AppShell>
        <AppRouter />
      </AppShell>
      {/* <PWAUpdatePrompt /> */}
      <InstallPrompt />
    </>
  );
}
