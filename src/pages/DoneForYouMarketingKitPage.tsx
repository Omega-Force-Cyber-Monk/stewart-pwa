import { AlertTriangle, Download, Loader2, PackageCheck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { DfyAssetGallery } from "../components/dfy/DfyAssetGallery";
import { DfyLockedState } from "../components/dfy/DfyLockedState";
import { LogoStyleSelector } from "../components/dfy/LogoStyleSelector";
import { Badge } from "../components/common/Badge";
import {
  DFY_CUSTOMER_CAPTIONS_KEY,
  DFY_CUSTOMER_GRAPHICS_KEY,
  DFY_CUSTOMER_VIDEOS_KEY,
  customerJourneyDescription,
  customerJourneyLabel,
  customerJourneyTone,
  downloadAsset,
  findCustomerDeliverable,
  hasApprovedFinalLogo,
  resolveCustomerDfyJourneyStatus,
} from "../components/dfy/dfyUtils";
import { Button } from "../components/common/Button";
import { DashboardCard } from "../components/layout/DashboardCard";
import { useCreateRiderCheckoutSessionMutation } from "../store/api/Payment/payment.api";
import {
  useGetCustomerDoneForYouQuery,
  useSelectDoneForYouLogoStyleMutation,
} from "../store/api/DoneForYou/dfy.api";

export default function DoneForYouMarketingKitPage() {
  const [upgradeError, setUpgradeError] = useState("");
  const [logoFeedback, setLogoFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [pollingInterval, setPollingInterval] = useState(0);

  const { data, isLoading, isError, refetch } = useGetCustomerDoneForYouQuery(
    undefined,
    { pollingInterval },
  );
  const [selectLogoStyle, { isLoading: isSelectingLogo }] =
    useSelectDoneForYouLogoStyleMutation();
  const [createCheckout, { isLoading: isStartingCheckout }] =
    useCreateRiderCheckoutSessionMutation();

  const journey = useMemo(
    () => (data?.order ? resolveCustomerDfyJourneyStatus(data.order) : null),
    [data?.order],
  );

  useEffect(() => {
    if (!journey || journey === "READY") {
      setPollingInterval(0);
      return;
    }
    setPollingInterval(15_000);
  }, [journey]);

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
    return (
      <div className="grid min-h-80 place-items-center text-dashboard-rider">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <DashboardCard className="text-center">
        <AlertTriangle className="mx-auto h-8 w-8 text-amber-500" />
        <h2 className="mt-3 text-lg font-semibold text-slate-900">Unable to load your kit</h2>
        <p className="mt-1 text-sm text-slate-500">Please retry in a moment.</p>
        <Button
          onClick={() => refetch()}
          className="mt-4 bg-dashboard-rider hover:bg-dashboard-rider-dark"
        >
          Retry
        </Button>
      </DashboardCard>
    );
  }

  if (!data.order) {
    if (data.access.ownsDoneForYou) {
      return (
        <DashboardCard className="text-center">
          <PackageCheck className="mx-auto h-9 w-9 text-dashboard-rider" />
          <h2 className="mt-3 text-xl font-bold text-slate-900">
            Your Done For You kit is being set up
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500">
            We found your DFY purchase. This page will unlock as soon as your order is ready for
            logo selection.
          </p>
          <Button
            onClick={() => refetch()}
            className="mt-4 bg-dashboard-rider hover:bg-dashboard-rider-dark"
          >
            Refresh
          </Button>
        </DashboardCard>
      );
    }
    return (
      <DfyLockedState
        onUpgrade={startUpgrade}
        isLoading={isStartingCheckout}
        error={upgradeError}
      />
    );
  }

  const order = data.order;
  const status = journey ?? resolveCustomerDfyJourneyStatus(order);
  const brand = order.brand;
  const selectedStyle = brand?.selectedLogoStyle ?? null;
  const finalLogo = brand?.approvedLogo ?? brand?.approvedLogoAsset ?? null;
  const finalLogoReady = hasApprovedFinalLogo(brand);
  const styleLocked = brand?.approvalStatus === "UPLOADED" || finalLogoReady;
  const graphics = findCustomerDeliverable(order.deliverables, DFY_CUSTOMER_GRAPHICS_KEY);
  const videos = findCustomerDeliverable(order.deliverables, DFY_CUSTOMER_VIDEOS_KEY);
  const captions = findCustomerDeliverable(order.deliverables, DFY_CUSTOMER_CAPTIONS_KEY);
  const showMaterials =
    status === "READY" ||
    Boolean(graphics?.assets.length || videos?.assets.length || captions?.assets.length);

  return (
    <div className="space-y-6">
      {/* Section 1 — DFY Status */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-dashboard-rider">Done For You Marketing Kit</p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            {customerJourneyLabel(status)}
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-slate-500">
            {customerJourneyDescription(status)}
          </p>
        </div>
        <Badge tone={customerJourneyTone(status)}>{customerJourneyLabel(status)}</Badge>
      </div>

      {/* Section 2 — Choose Your Logo Style */}
      {!styleLocked && (
        <LogoStyleSelector
          brand={brand}
          logoStyles={data.logoStyles}
          isLoading={isSelectingLogo}
          locked={false}
          feedback={logoFeedback}
          onSelect={async (logoStyleKey) => {
            setLogoFeedback(null);
            try {
              await selectLogoStyle({ logoStyleKey }).unwrap();
              setLogoFeedback({ type: "success", message: "Logo style saved." });
            } catch {
              setLogoFeedback({
                type: "error",
                message: "Unable to save that logo style. Please try again.",
              });
            }
          }}
        />
      )}

      {/* Section 3 — Selected Logo Style (template, not final) */}
      {selectedStyle && (
        <DashboardCard className="space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-dashboard-rider">
              Your selected logo style
            </p>
            <h3 className="mt-1 text-lg font-bold text-slate-900">{selectedStyle.name}</h3>
            <p className="mt-1 text-sm text-slate-500">
              This is the template style you chose. Your personalized business logo is created
              separately by the team using your company name and onboarding details.
            </p>
          </div>
          <div className="max-w-sm rounded-lg border border-slate-200 bg-slate-50 p-4">
            {selectedStyle.previewUrl ? (
              <img
                src={selectedStyle.previewUrl}
                alt={selectedStyle.name}
                className="aspect-video w-full object-contain"
              />
            ) : (
              <div className="grid aspect-video place-items-center text-sm text-slate-500">
                Style preview unavailable
              </div>
            )}
          </div>
        </DashboardCard>
      )}

      {/* Section 4 — Final Logo */}
      <DashboardCard className="space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-dashboard-rider">
            Your final logo
          </p>
          <h3 className="mt-1 text-lg font-bold text-slate-900">{order.business.name}</h3>
          <p className="mt-1 text-sm text-slate-500">
            Your approved personalized logo used across your Done For You marketing materials.
          </p>
        </div>
        {finalLogoReady && finalLogo?.fileUrl ? (
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <img
              src={finalLogo.fileUrl}
              alt="Your final personalized logo"
              className="max-h-44 w-full object-contain"
            />
            <button
              type="button"
              onClick={() => downloadAsset(finalLogo)}
              className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-lg bg-dashboard-rider px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-dashboard-rider-dark"
            >
              <Download className="h-4 w-4" />
              Download logo
            </button>
          </div>
        ) : (
          <p className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-5 text-sm text-slate-500">
            {selectedStyle
              ? "Your personalized logo will appear here after the team finishes and approves it."
              : "Select a logo style above to get started."}
          </p>
        )}
      </DashboardCard>

      {/* Section 5 — Marketing Materials */}
      {showMaterials ? (
        <section className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Marketing materials</h3>
            <p className="mt-1 text-sm text-slate-500">
              Customer-branded graphics, selling-door videos, and approved captions for your kit.
            </p>
          </div>

          <DashboardCard className="space-y-4">
            <div>
              <h4 className="font-semibold text-slate-900">Marketing graphics</h4>
              <p className="mt-1 text-sm text-slate-500">
                Generated graphics personalized with your final logo.
              </p>
            </div>
            <DfyAssetGallery assets={graphics?.assets ?? []} />
          </DashboardCard>

          <DashboardCard className="space-y-4">
            <div>
              <h4 className="font-semibold text-slate-900">Videos</h4>
              <p className="mt-1 text-sm text-slate-500">
                The three launch videos for your selling door (unchanged source masters).
              </p>
            </div>
            <DfyAssetGallery assets={videos?.assets ?? []} />
          </DashboardCard>

          <DashboardCard className="space-y-4">
            <div>
              <h4 className="font-semibold text-slate-900">Captions / instructions</h4>
              <p className="mt-1 text-sm text-slate-500">
                Approved text you can view or copy for posts and replies.
              </p>
            </div>
            <DfyAssetGallery assets={captions?.assets ?? []} />
          </DashboardCard>
        </section>
      ) : (
        status !== "CHOOSE_LOGO" && (
          <DashboardCard>
            <h3 className="font-semibold text-slate-900">Marketing materials</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              {status === "LOGO_BEING_PREPARED"
                ? "Your marketing kit will appear here after your personalized logo is approved."
                : "We're preparing your graphics, videos, and captions. This page updates automatically."}
            </p>
          </DashboardCard>
        )
      )}

      <DashboardCard>
        <h3 className="text-sm font-semibold text-slate-900">Need help?</h3>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Questions about your Done For You kit can go through Support from your dashboard.
        </p>
      </DashboardCard>
    </div>
  );
}
