import { ExitIntentPopup } from "./ExitIntentPopup";
import { useExitIntentPopup } from "../../../hooks/useExitIntentPopup";

export function MarketingExitIntent() {
  const { open, config, close } = useExitIntentPopup();
  
  if (!open || !config) return null;
  
  return <ExitIntentPopup config={config} onClose={close} />;
}
