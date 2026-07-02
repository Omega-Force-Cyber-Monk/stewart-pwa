import { AppShell } from "./components/layout/AppShell";
import { PWAUpdatePrompt } from "./components/pwa/PWAUpdatePrompt";
import { AppRouter } from "./routes/AppRouter";

export default function App() {
  return (
    <>
      <AppShell>
        <AppRouter />
      </AppShell>
      <PWAUpdatePrompt />
    </>
  );
}
