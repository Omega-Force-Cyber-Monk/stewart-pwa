import { Download } from "lucide-react";
import type { DfyBrandProfile } from "../../store/api/DoneForYou/dfy.type";
import { DashboardCard } from "../layout/DashboardCard";
import { DfyStatusBadge } from "./DfyStatusBadge";
import { downloadAsset } from "./dfyUtils";

interface MasterBrandCardProps {
  brand: DfyBrandProfile | null;
  businessName?: string;
}

export function MasterBrandCard({ brand, businessName }: MasterBrandCardProps) {
  const logo = brand?.approvedLogo ?? brand?.approvedLogoAsset ?? null;
  return (
    <DashboardCard className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-dashboard-rider">Master Brand Asset</p>
          <h3 className="mt-1 text-lg font-bold text-slate-900">{businessName || "Brand identity"}</h3>
        </div>
        {brand?.approvalStatus && <DfyStatusBadge status={brand.approvalStatus} />}
      </div>
      {logo?.fileUrl ? (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <img src={logo.fileUrl} alt="Approved master brand logo" className="max-h-44 w-full object-contain" />
          <button type="button" onClick={() => downloadAsset(logo)} className="mt-4 cursor-pointer inline-flex items-center gap-2 rounded-lg bg-dashboard-rider px-3 py-2 text-sm font-semibold text-white hover:bg-dashboard-rider-dark transition-colors">
            <Download className="h-4 w-4" />
            Download logo
          </button>
        </div>
      ) : (
        <p className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-5 text-sm text-slate-500">Your finalized logo will appear here after production approval.</p>
      )}
      {brand?.selectedLogoStyle && (
        <p className="text-sm text-slate-600">
          Selected style: <span className="font-semibold text-slate-900">{brand.selectedLogoStyle.name}</span>
        </p>
      )}
    </DashboardCard>
  );
}

