import { AlertTriangle, Loader2, PackageCheck } from "lucide-react";
import { useState } from "react";
import { DfyAssetGallery } from "../components/dfy/DfyAssetGallery";
import { DfyLockedState } from "../components/dfy/DfyLockedState";
import { DfyProgress } from "../components/dfy/DfyProgress";
import { DfyStatusBadge } from "../components/dfy/DfyStatusBadge";
import { LogoStyleSelector } from "../components/dfy/LogoStyleSelector";
import { MasterBrandCard } from "../components/dfy/MasterBrandCard";
import { calculateDfyProgress, customerStatus, formatDate } from "../components/dfy/dfyUtils";
import { Button } from "../components/common/Button";
import { DashboardCard } from "../components/layout/DashboardCard";
import { useCreateRiderCheckoutSessionMutation } from "../store/api/Payment/payment.api";
import { useGetCustomerDoneForYouQuery, useSelectDoneForYouLogoStyleMutation } from "../store/api/DoneForYou/dfy.api";

export default function DoneForYouMarketingKitPage() {
  const { data, isLoading, isError, refetch } = useGetCustomerDoneForYouQuery();
  const [selectLogoStyle, { isLoading: isSelectingLogo }] = useSelectDoneForYouLogoStyleMutation();
  const [createCheckout, { isLoading: isStartingCheckout }] = useCreateRiderCheckoutSessionMutation();
  const [upgradeError, setUpgradeError] = useState("");
  const [logoFeedback, setLogoFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const startUpgrade = async () => {
    setUpgradeError("");
    try {
      const result = await createCheckout({
        items: [{ productId: "addon", quantity: 1 }],
        successUrl: `${window.location.origin}/payment/success?session_id={CHECKOUT_SESSION_ID}&plan=addon`,
        cancelUrl: window.location.href,
      }).unwrap();
      if (result.checkoutUrl) window.location.href = result.checkoutUrl;
    } catch {
      setUpgradeError("Unable to start checkout. Please try again.");
    }
  };

  if (isLoading) {
    return <div className="grid min-h-80 place-items-center text-dashboard-rider"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  if (isError || !data) {
    return (
      <DashboardCard className="text-center">
        <AlertTriangle className="mx-auto h-8 w-8 text-amber-500" />
        <h2 className="mt-3 text-lg font-semibold text-slate-900">Unable to load your kit</h2>
        <p className="mt-1 text-sm text-slate-500">Please retry in a moment.</p>
        <Button onClick={() => refetch()} className="mt-4 bg-dashboard-rider hover:bg-dashboard-rider-dark">Retry</Button>
      </DashboardCard>
    );
  }

  if (!data.order) {
    if (data.access.ownsDoneForYou) {
      return (
        <DashboardCard className="text-center">
          <PackageCheck className="mx-auto h-9 w-9 text-dashboard-rider" />
          <h2 className="mt-3 text-xl font-bold text-slate-900">Your Done For You kit is being prepared</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500">We found your DFY ownership. Your fulfillment dashboard will appear here as soon as the backend order is ready.</p>
        </DashboardCard>
      );
    }
    return <DfyLockedState onUpgrade={startUpgrade} isLoading={isStartingCheckout} error={upgradeError} />;
  }

  const order = data.order;
  const progress = calculateDfyProgress(order.deliverables);
  const readyCount = order.deliverables.filter((item) => customerStatus(item.status) === "Ready").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-dashboard-rider">Done For You Marketing Kit</p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">{customerStatus(order.status)}</h2>
          <p className="mt-1 text-sm text-slate-500">Your production dashboard for finished brand, video, social, and response assets.</p>
        </div>
        <DfyStatusBadge status={order.status} customerFacing />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <DashboardCard className="space-y-5">
            <div className="flex items-start gap-3">
              <span className="rounded-lg bg-green-50 p-2 text-dashboard-rider"><PackageCheck className="h-5 w-5" /></span>
              <div className="min-w-0">
                <h3 className="font-semibold text-slate-900">Package status</h3>
                <p className="mt-1 text-sm text-slate-500">{readyCount} of {order.deliverables.length} deliverables ready</p>
              </div>
            </div>
            <DfyProgress value={progress} />
            <div className="grid gap-3 text-sm sm:grid-cols-3">
              <div className="rounded-lg bg-slate-50 p-3"><p className="text-slate-500">Audience</p><p className="mt-1 font-semibold text-slate-900">{order.business.themeKey || order.audience}</p></div>
              <div className="rounded-lg bg-slate-50 p-3"><p className="text-slate-500">Business</p><p className="mt-1 font-semibold text-slate-900">{order.business.name}</p></div>
              <div className="rounded-lg bg-slate-50 p-3"><p className="text-slate-500">Published</p><p className="mt-1 font-semibold text-slate-900">{formatDate(order.publishedAt)}</p></div>
            </div>
          </DashboardCard>

          <LogoStyleSelector
            brand={order.brand}
            logoStyles={data.logoStyles}
            isLoading={isSelectingLogo}
            feedback={logoFeedback}
            onSelect={async (logoStyleKey) => {
              setLogoFeedback(null);
              try {
                await selectLogoStyle({ logoStyleKey }).unwrap();
                setLogoFeedback({ type: "success", message: "Logo style saved." });
              } catch {
                setLogoFeedback({ type: "error", message: "Unable to save that logo style. Please try again." });
              }
            }}
          />

          <section className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Deliverables</h3>
              <p className="mt-1 text-sm text-slate-500">Assets appear here after the team publishes them.</p>
            </div>
            {order.deliverables.map((deliverable) => (
              <DashboardCard key={deliverable.id} className="space-y-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h4 className="font-semibold text-slate-900">{deliverable.title}</h4>
                    {deliverable.description && <p className="mt-1 text-sm text-slate-500">{deliverable.description}</p>}
                  </div>
                  <DfyStatusBadge status={String(deliverable.status)} customerFacing />
                </div>
                <DfyAssetGallery assets={deliverable.assets} />
              </DashboardCard>
            ))}
          </section>
        </div>
        <aside className="space-y-6">
          <MasterBrandCard brand={order.brand} businessName={order.business.name} />
          <DashboardCard>
            <h3 className="text-sm font-semibold text-slate-900">Need help?</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">Questions about your production assets can go through Support from your dashboard.</p>
          </DashboardCard>
        </aside>
      </div>
    </div>
  );
}
