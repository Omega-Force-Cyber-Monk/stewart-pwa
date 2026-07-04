import { Languages } from "lucide-react";

import { useAppDispatch } from "../../app/hooks";
import { toggleLocale } from "../../features/appFlow/appFlowSlice";
import { useTranslation } from "../../features/localization/useTranslation";
import { cn } from "../../lib/cn";

export function LanguageToggle() {
  const dispatch = useAppDispatch();
  const { locale, t } = useTranslation();

  return (
    <button
      aria-label={t.common.toggleLanguage}
      className="fixed right-4 top-4 z-50 inline-flex min-h-10 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
      onClick={() => dispatch(toggleLocale())}
      type="button"
    >
      <Languages aria-hidden="true" className="size-4 text-cyan-700" />
      <span
        className={cn(
          "rounded px-1.5 py-0.5",
          locale === "en" && "bg-cyan-600 text-white",
        )}
      >
        EN
      </span>
      <span className="text-slate-300">|</span>
      <span
        className={cn(
          "rounded px-1.5 py-0.5",
          locale === "es" && "bg-cyan-600 text-white",
        )}
      >
        ES
      </span>
    </button>
  );
}
