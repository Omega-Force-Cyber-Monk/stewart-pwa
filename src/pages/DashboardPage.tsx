import { LaunchProgressStepper } from "../components/dashboard/LaunchProgressStepper";
import { LaunchToolkit } from "../components/dashboard/LaunchToolkit";
import { QuickActions } from "../components/dashboard/QuickActions";

export default function DashboardPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-[28px] font-bold text-slate-900 tracking-tight mb-2">
          Welcome back, Eleanor Pena!
        </h1>
        <p className="text-slate-500 text-[15px]">
          Everything you need to launch and grow your direct booking business.
        </p>
      </div>

      <LaunchProgressStepper />
      <LaunchToolkit />
      <QuickActions />
    </div>
  );
}
