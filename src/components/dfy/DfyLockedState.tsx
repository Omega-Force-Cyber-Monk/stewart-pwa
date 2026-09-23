import { Lock, Sparkles } from "lucide-react";
import { Button } from "../common/Button";
import { DashboardCard } from "../layout/DashboardCard";

interface DfyLockedStateProps {
  onUpgrade: () => void;
  isLoading?: boolean;
  error?: string;
}

export function DfyLockedState({ onUpgrade, isLoading = false, error }: DfyLockedStateProps) {
  return (
    <DashboardCard className="overflow-hidden p-0">
      <div className="grid gap-0 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="bg-slate-950 p-6 text-white sm:p-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
            <Lock className="h-6 w-6" />
          </div>
          <h2 className="mt-5 text-2xl font-bold tracking-tight">Done For You Marketing Kit</h2>
          <p className="mt-3 text-sm leading-6 text-slate-300">Upgrade your Launch Kit and let the production team prepare your marketing assets, videos, templates, and brand kit.</p>
          <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-400">Upgrade price</p>
            <p className="mt-1 text-3xl font-black">$99</p>
            <p className="mt-1 text-sm text-slate-300">Add to your $295 Launch Kit</p>
          </div>
        </div>
        <div className="p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-dashboard-rider">What you receive</p>
          <ul className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
            {[
              "Custom Brand Identity Kit",
              "Personalized Selling Page",
              "QR / Referral assets",
              "Acuity-related fulfillment",
              "Three personalized launch videos",
              "Social Media Starter Content",
              "Text / Customer Response Templates",
              "Publish-ready delivery dashboard",
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-dashboard-rider" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          {error && <p className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          <Button onClick={onUpgrade} isLoading={isLoading} className="mt-6 bg-dashboard-rider hover:bg-dashboard-rider-dark">
            YES, DO IT FOR ME +$99
          </Button>
        </div>
      </div>
    </DashboardCard>
  );
}
