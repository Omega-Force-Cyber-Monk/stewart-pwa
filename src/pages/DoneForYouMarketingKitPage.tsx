import { useLanguage } from "../i18n/LanguageProvider";
import { AlertTriangle, Loader2, PackageCheck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { DfyAssetGallery } from "../components/dfy/DfyAssetGallery";
import { DfyLockedState } from "../components/dfy/DfyLockedState";
import { Badge } from "../components/common/Badge";
import {
  DFY_CUSTOMER_CAPTIONS_KEY,
  DFY_CUSTOMER_GRAPHICS_KEY,
  DFY_CUSTOMER_VIDEOS_KEY,
  customerJourneyDescription,
  customerJourneyLabel,
  customerJourneyTone,
  findCustomerDeliverable,
  partitionTextAssets,
  resolveCustomerDfyJourneyStatus,
} from "../components/dfy/dfyUtils";
import { Button } from "../components/common/Button";
import { DashboardCard } from "../components/layout/DashboardCard";
import { useCreateRiderCheckoutSessionMutation } from "../store/api/Payment/payment.api";
import { useGetCustomerDoneForYouQuery } from "../store/api/DoneForYou/dfy.api";
import { Link } from "react-router-dom";
import { startTrackedCheckout } from "../lib/gtmEvents";

export default function DoneForYouMarketingKitPage() {
  const { t } = useLanguage();
  const [upgradeError, setUpgradeError] = useState("");
  const [pollingInterval, setPollingInterval] = useState(0);

  const { data, isLoading, isError, refetch } = useGetCustomerDoneForYouQuery(
    undefined,
    { pollingInterval },
  );
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
      if (result.checkoutUrl) startTrackedCheckout(result.ecommerce, result.checkoutUrl);
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
        <h2 className="mt-3 text-lg font-semibold text-slate-900">{t("Unable to load your package")}</h2>
        <p className="mt-1 text-sm text-slate-500">{t("Please retry in a moment.")}</p>
        <Button
          onClick={() => refetch()}
          className="mt-4 bg-dashboard-rider hover:bg-dashboard-rider-dark"
        >
          {t("Retry")}</Button>
      </DashboardCard>
    );
  }

  if (!data.order) {
    if (data.access.ownsDoneForYou) {
      return (
        <DashboardCard className="text-center">
          <PackageCheck className="mx-auto h-9 w-9 text-dashboard-rider" />
          <h2 className="mt-3 text-xl font-bold text-slate-900">
            {t("Your Done For You package is being prepared")}</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500">
            {t("We found your DFY purchase. Marketing graphics, videos, and templates will appear here automatically when ready.")}</p>
          <Button
            onClick={() => refetch()}
            className="mt-4 bg-dashboard-rider hover:bg-dashboard-rider-dark"
          >
            {t("Refresh")}</Button>
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
  const graphics = findCustomerDeliverable(order.deliverables, DFY_CUSTOMER_GRAPHICS_KEY);
  const videos = findCustomerDeliverable(order.deliverables, DFY_CUSTOMER_VIDEOS_KEY);
  const captions = findCustomerDeliverable(order.deliverables, DFY_CUSTOMER_CAPTIONS_KEY);
  const { readyToPost, responseTemplates, usageInstructions } = partitionTextAssets(
    captions?.assets ?? [],
  );
  const showMaterials =
    status === "READY" ||
    Boolean(graphics?.assets.length || videos?.assets.length || captions?.assets.length);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-dashboard-rider">{t("Done For You Marketing Package")}</p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            {t(customerJourneyLabel(status))}
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-slate-500">
            {t(customerJourneyDescription(status))}
          </p>
        </div>
        <Badge tone={customerJourneyTone(status)}>{t(customerJourneyLabel(status))}</Badge>
      </div>

      {showMaterials ? (
        <section className="space-y-4">
          <DashboardCard className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">{t("Marketing Graphics")}</h3>
              <p className="mt-1 text-sm text-slate-500">
                {t("Audience-specific graphics for your package. Preview or download to post.")}</p>
            </div>
            <DfyAssetGallery assets={graphics?.assets ?? []} />
          </DashboardCard>

          <DashboardCard className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">{t("Videos")}</h3>
              <p className="mt-1 text-sm text-slate-500">
                {t("Your three launch videos. Preview or download as provided.")}</p>
            </div>
            <DfyAssetGallery assets={videos?.assets ?? []} />
          </DashboardCard>

          <DashboardCard className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">{t("Ready-to-Post Captions")}</h3>
              <p className="mt-1 text-sm text-slate-500">
                {t("Finished caption copy you can paste into posts. Use Copy — do not rewrite.")}</p>
            </div>
            {readyToPost.length > 0 ? (
              <DfyAssetGallery assets={readyToPost} />
            ) : (
              <p className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
                {t("Approved ready-to-post caption copy has not been imported for this audience yet.")}</p>
            )}
          </DashboardCard>

          <DashboardCard className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">{t("Customer Response Templates")}</h3>
              <p className="mt-1 text-sm text-slate-500">
                {t("Ready-to-send reply scripts for rider messages. Copy and paste as written.")}</p>
            </div>
            {responseTemplates.length > 0 ? (
              <DfyAssetGallery assets={responseTemplates} />
            ) : (
              <p className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
                {t("Approved response-template copy has not been imported for this audience yet.")}</p>
            )}
          </DashboardCard>

          <DashboardCard className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">{t("Usage Instructions")}</h3>
              <p className="mt-1 text-sm text-slate-500">
                {t("Guidance only — where and how to use your materials. Not post copy.")}</p>
            </div>
            <DfyAssetGallery assets={usageInstructions} />
          </DashboardCard>

          <DashboardCard className="space-y-3">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">{t("Resources & Guides")}</h3>
              <p className="mt-1 text-sm text-slate-500">
                {t("Open your Local Client & Positioning Guide and other approved resources.")}</p>
            </div>
            <Link
              to="/resources-guide"
              className="inline-flex text-sm font-semibold text-dashboard-rider hover:underline"
            >
              {t("Open Resources & Guides")}</Link>
          </DashboardCard>
        </section>
      ) : (
        <DashboardCard>
          <h3 className="font-semibold text-slate-900">{t("Preparing your package")}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            {t("We're assembling your graphics, videos, and templates. This page updates automatically.")}</p>
        </DashboardCard>
      )}

      <DashboardCard>
        <h3 className="text-sm font-semibold text-slate-900">{t("Need help?")}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          {t("Questions about your Done For You package can go through Support from your dashboard.")}</p>
      </DashboardCard>
    </div>
  );
}
