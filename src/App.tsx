import { AppShell } from "./components/layout/AppShell";
import { LanguageToggle } from "./components/common/LanguageToggle";
import { PWAUpdatePrompt } from "./components/pwa/PWAUpdatePrompt";
import { AppRouter } from "./routes/AppRouter";

export default function App() {
  return (
    <>
      <LanguageToggle />
      <AppShell>
        <AppRouter />
      </AppShell>
      <PWAUpdatePrompt />
    </>
  );
}
