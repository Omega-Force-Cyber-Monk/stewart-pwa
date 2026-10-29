import { CheckCircle2, Loader2 } from "lucide-react";
import type { DfyBrandProfile, DfyLogoStyle } from "../../store/api/DoneForYou/dfy.type";

interface LogoStyleSelectorProps {
  brand: DfyBrandProfile | null;
  logoStyles: DfyLogoStyle[];
  isLoading?: boolean;
  /** When true, selection is locked (final logo already in production / approved). */
  locked?: boolean;
  onSelect: (key: string) => void | Promise<void>;
  feedback?: { type: "success" | "error"; message: string } | null;
}

export function LogoStyleSelector({
  brand,
  logoStyles,
  isLoading = false,
  locked = false,
  onSelect,
  feedback,
}: LogoStyleSelectorProps) {
  if (logoStyles.length === 0) return null;
  const selectedKey = brand?.selectedLogoStyle?.key;

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-dashboard-rider">
          Choose your logo style
        </p>
        <h3 className="mt-1 text-lg font-bold text-slate-900">
          Pick one of {logoStyles.length} styles
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Four shared styles plus one specialty style for your selling door. Your team will
          personalize the selected artwork with your business name.
        </p>
      </div>
      {feedback && (
        <p
          className={`mt-3 rounded-lg p-3 text-sm ${
            feedback.type === "success"
              ? "bg-emerald-50 text-emerald-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {feedback.message}
        </p>
      )}
      {locked && (
        <p className="mt-3 rounded-lg bg-slate-50 p-3 text-sm text-slate-600">
          Your logo style is locked while your personalized logo and marketing kit are prepared.
        </p>
      )}
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {logoStyles.map((style) => {
          const selected = selectedKey === style.key;
          return (
            <button
              key={style.key}
              type="button"
              onClick={() => onSelect(style.key)}
              disabled={isLoading || locked}
              className={`rounded-lg border p-3 text-left transition disabled:cursor-not-allowed disabled:opacity-70 ${
                selected
                  ? "border-dashboard-rider bg-green-50"
                  : "border-slate-200 bg-white hover:border-green-200"
              }`}
            >
              {style.previewUrl ? (
                <img
                  src={style.previewUrl}
                  alt=""
                  className="aspect-video w-full rounded-md bg-slate-100 object-contain"
                />
              ) : (
                <div className="grid aspect-video place-items-center rounded-md bg-slate-100 text-sm font-semibold text-slate-500">
                  Preview pending
                </div>
              )}
              <span className="mt-3 flex items-center justify-between gap-2 text-sm font-semibold text-slate-900">
                {style.name}
                {isLoading && selected ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : selected ? (
                  <CheckCircle2 className="h-4 w-4 text-dashboard-rider" />
                ) : (
                  <span className="text-xs font-semibold text-dashboard-rider">Select</span>
                )}
              </span>
              {selected && (
                <span className="mt-1 inline-block text-xs font-semibold text-dashboard-rider">
                  Selected
                </span>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
