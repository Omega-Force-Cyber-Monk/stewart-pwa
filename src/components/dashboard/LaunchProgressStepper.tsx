import { Check, ArrowRight, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/cn";
import { useGetSetupStateQuery, useGetLaunchReadinessQuery } from "../../store/api/Business/business.api";

const steps = [
  "Buyer Info",
  "Business Info",
  "Service Area",
  "Referral Card",
  "Acquire",
  "Brand & Trust",
  "Launch Ready",
  "Final Confirm",
];

interface LaunchProgressStepperProps {
  showFooter?: boolean;
  currentStep?: number;
}

export function LaunchProgressStepper({ showFooter = true, currentStep }: LaunchProgressStepperProps) {
  const { data: setupData } = useGetSetupStateQuery();
  const { data: launchReadyData } = useGetLaunchReadinessQuery();

  // Resolve steps: if prop is provided, use it. Otherwise pull dynamically.
  const stepVal = currentStep !== undefined ? currentStep : (setupData?.data?.progress?.currentStep || 1);
  const percentage = setupData?.data?.progress?.percentage ?? launchReadyData?.percentage ?? 0;

  return (
    <div className={cn(
      "bg-white",
      showFooter ? "rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm" : "p-4 md:px-8 py-8"
    )}>
      {/* Stepper Header */}
      <div className="relative mb-8 md:mb-12">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-200 -translate-y-1/2 hidden md:block"></div>
        <div className="flex flex-col md:flex-row justify-between relative z-10 gap-6 md:gap-0">
          {steps.map((step, index) => {
            const isCompleted = index < (stepVal - 1);
            const isCurrent = index === (stepVal - 1);

            return (
              <div key={index} className="flex md:flex-col items-center gap-4 md:gap-2 relative">
                {/* Connecting line for mobile */}
                {index < steps.length - 1 && (
                  <div className="absolute left-[15px] top-8 bottom-[-24px] w-[2px] bg-slate-200 md:hidden z-[-1]" />
                )}
                
                <div
                  className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-semibold bg-white",
                    isCompleted
                      ? "border-green-500 bg-green-500 text-white"
                      : isCurrent
                      ? "border-slate-300 text-slate-700 bg-slate-100"
                      : "border-slate-200 text-slate-400"
                  )}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : index + 1}
                </div>
                <span
                  className={cn(
                    "text-xs font-semibold text-center mt-1",
                    isCompleted || isCurrent ? "text-slate-800" : "text-slate-400"
                  )}
                >
                  {step}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stepper Footer / Action */}
      {showFooter && (
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pt-6 border-t border-slate-100 gap-6 md:gap-0">
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              You're making great progress!
            </h3>
            <p className="text-sm text-slate-500 mb-4">
              Complete the next section to keep your business launch moving forward.
            </p>
            <Link 
              to="/launch-dashboard"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#22c55e] hover:bg-[#1ea951] text-white text-sm font-bold rounded-lg transition-colors"
            >
              Continue Launch Setup
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="text-right flex flex-col items-end gap-2 shrink-0">
            <div>
              <div className="text-sm font-bold text-slate-900">Launch Progress</div>
              <div className="text-sm font-bold text-[#22c55e]">{percentage}% Complete</div>
            </div>
            <Link
              to={`/book/${setupData?.data?.business?.slug || "default-business"}`}
              target="_blank"
              className="mt-1 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              View Personalize Website
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
