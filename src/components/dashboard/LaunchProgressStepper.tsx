import { Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/cn";
import { useGetSetupStateQuery } from "../../store/api/Business/business.api";

const SETUP_STEPS = ["Buyer info", "Business info", "Service Area", "Final confirm"] as const;

interface LaunchProgressStepperProps {
  showFooter?: boolean;
  currentStep?: number;
}

export function LaunchProgressStepper({ showFooter = true, currentStep }: LaunchProgressStepperProps) {
  const { data: setupData } = useGetSetupStateQuery();
  const step = currentStep ?? setupData?.data.progress.currentStep ?? 1;
  const percentage = setupData?.data.progress.percentage ?? 0;

  return (
    <div className={cn("bg-white", showFooter ? "rounded-2xl border border-slate-200 p-6 shadow-sm" : "p-4 md:p-8")}>
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        {SETUP_STEPS.map((label, index) => {
          const number = index + 1;
          const completed = number < step;
          const active = number === step;
          return (
            <div key={label} className="flex flex-1 items-center gap-3 md:flex-col md:gap-2">
              <div className="flex w-full items-center md:w-full">
                <span className={cn("grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 text-xs font-bold", completed ? "border-dashboard-rider bg-dashboard-rider text-white" : active ? "border-slate-300 bg-slate-100 text-slate-700" : "border-slate-200 text-slate-400")}>{completed ? <Check className="h-4 w-4" /> : number}</span>
                {index < SETUP_STEPS.length - 1 && <span className={cn("ml-2 hidden h-px flex-1 border-t border-dashed md:block", completed ? "border-dashboard-rider" : "border-slate-300")} />}
              </div>
              <span className={cn("text-xs font-semibold md:text-center", completed || active ? "text-slate-800" : "text-slate-400")}>{label}</span>
            </div>
          );
        })}
      </div>
      {showFooter && (
        <div className="mt-7 flex flex-col gap-4 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div><p className="font-semibold text-slate-900">You&apos;re making great progress!</p><p className="mt-1 text-sm text-slate-500">Complete the next section to keep your business launch moving forward.</p><Link to="/launch-dashboard" className="mt-4 inline-flex items-center gap-2 rounded-lg bg-dashboard-rider px-5 py-2.5 text-sm font-semibold text-white hover:bg-dashboard-rider-dark">Continue Launch Setup <ArrowRight className="h-4 w-4" /></Link></div>
          <p className="text-sm font-semibold text-dashboard-rider">{percentage}% Complete</p>
        </div>
      )}
    </div>
  );
}
