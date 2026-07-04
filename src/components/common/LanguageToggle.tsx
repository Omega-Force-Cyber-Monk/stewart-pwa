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
      className="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-pink-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500"
      onClick={() => dispatch(toggleLocale())}
      type="button"
    >
      <Languages aria-hidden="true" className="size-4 text-pink-500" />
      <span
        className={cn(
          "rounded px-1.5 py-0.5",
          locale === "en" && "bg-pink-500 text-white",
        )}
      >
        EN
      </span>
      <span className="text-slate-300">|</span>
      <span
        className={cn(
          "rounded px-1.5 py-0.5",
          locale === "es" && "bg-pink-500 text-white",
        )}
      >
        ES
      </span>
    </button>
  );
}
