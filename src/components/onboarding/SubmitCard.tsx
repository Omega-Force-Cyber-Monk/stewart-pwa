import { ArrowRight } from "lucide-react";

import { DashboardCard } from "../layout/DashboardCard";
import { UploadPreview } from "./UploadPreview";
import type { DriverProfile } from "../../features/appFlow/appFlowTypes";

type SummaryLabels = {
  emptyValue: string;
  headshot: string;
  name: string;
  preferredDomain: string;
  regionalAirports: string;
  targetMarket: string;
};

type SubmitCardProps = {
  buttonLabel: string;
  labels: SummaryLabels;
  profile: DriverProfile;
  title: string;
};

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-100 py-3 last:border-b-0">
      <span className="text-sm font-semibold text-slate-500">{label}</span>
      <span className="text-right text-sm font-bold text-slate-950">{value}</span>
    </div>
  );
}

export function SubmitCard({ buttonLabel, labels, profile, title }: SubmitCardProps) {
  const valueOrEmpty = (value: string | undefined) => value?.trim() || labels.emptyValue;

  return (
    <DashboardCard as="section" className="sticky top-28">
      <h2 className="text-lg font-bold text-slate-950">{title}</h2>
      <div className="mt-5 flex items-center gap-4">
        <UploadPreview emptyLabel={labels.headshot} imageUrl={profile.headshotPreviewUrl} />
        <div>
          <p className="text-sm font-semibold text-slate-500">{labels.headshot}</p>
          <p className="mt-1 text-sm text-slate-700">
            {profile.headshotPreviewUrl ? labels.headshot : labels.emptyValue}
          </p>
        </div>
      </div>
      <div className="mt-5">
        <SummaryRow label={labels.name} value={valueOrEmpty(profile.fullName)} />
        <SummaryRow label={labels.targetMarket} value={valueOrEmpty(profile.targetCity)} />
        <SummaryRow label={labels.regionalAirports} value={valueOrEmpty(profile.regionalAirports)} />
        <SummaryRow label={labels.preferredDomain} value={valueOrEmpty(profile.preferredDomain)} />
      </div>
      <button
        className="mt-5 inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950"
        type="submit"
      >
        {buttonLabel}
        <ArrowRight aria-hidden="true" className="size-4" />
      </button>
    </DashboardCard>
  );
}
