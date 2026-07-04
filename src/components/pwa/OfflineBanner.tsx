import { WifiOff } from "lucide-react";

import { PageContainer } from "../layout/PageContainer";
import { useOnlineStatus } from "../../hooks/useOnlineStatus";

export function OfflineBanner() {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div
      aria-live="polite"
      className="sticky top-0 z-40 border-b border-amber-200 bg-amber-50 px-4 py-2 text-amber-950"
      role="status"
    >
      <PageContainer className="flex items-center justify-center gap-2 px-0 text-sm font-semibold">
        <WifiOff aria-hidden="true" className="size-4" />
        <span>You are currently offline. Some features may be unavailable.</span>
      </PageContainer>
    </div>
  );
}
