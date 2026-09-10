import { Loader2, ShieldCheck } from "lucide-react";

interface LoadingScreenProps {
  title?: string;
  message?: string;
}

export function LoadingScreen({
  title = "Loading your workspace",
  message = "Checking your account, payment, and launch access.",
}: LoadingScreenProps) {
  return (
    <div className="grid min-h-screen place-items-center bg-dashboard-canvas px-4">
      <div className="w-full max-w-md rounded-2xl border border-green-100 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-green-50 text-dashboard-rider">
          <div className="relative">
            <ShieldCheck className="h-8 w-8" />
            <Loader2 className="absolute -right-2 -top-2 h-4 w-4 animate-spin text-green-600" />
          </div>
        </div>
        <h1 className="text-xl font-bold text-slate-900">{title}</h1>
        <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-slate-500">{message}</p>
        <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-dashboard-rider" />
        </div>
      </div>
    </div>
  );
}
