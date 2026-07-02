import { CheckCircle2, CircleDot } from "lucide-react";

type FormProgressProps = {
  completedLabel: string;
  currentLabel: string;
  purchaseLabel: string;
  setupLabel: string;
};

export function FormProgress({
  completedLabel,
  currentLabel,
  purchaseLabel,
  setupLabel,
}: FormProgressProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
        <div className="flex items-center gap-3">
          <CheckCircle2 aria-hidden="true" className="size-6 text-emerald-600" />
          <div>
            <p className="font-bold text-slate-950">{purchaseLabel}</p>
            <p className="text-sm text-emerald-700">{completedLabel}</p>
          </div>
        </div>
        <div className="hidden h-px w-16 bg-slate-200 sm:block" />
        <div className="flex items-center gap-3">
          <CircleDot aria-hidden="true" className="size-6 text-cyan-700" />
          <div>
            <p className="font-bold text-slate-950">{setupLabel}</p>
            <p className="text-sm text-cyan-700">{currentLabel}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
