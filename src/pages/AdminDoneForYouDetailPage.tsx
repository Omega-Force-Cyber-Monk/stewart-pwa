import { ArrowLeft, CheckCircle2, Loader2, RefreshCw, UploadCloud } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "../components/common/Button";
import { DfyAssetGallery } from "../components/dfy/DfyAssetGallery";
import { DfyStatusBadge } from "../components/dfy/DfyStatusBadge";
import { formatDate } from "../components/dfy/dfyUtils";
import { DashboardCard } from "../components/layout/DashboardCard";
import { useConfirmDialog } from "../hooks/useConfirmDialog";
import { formatCategory } from "../lib/formatCategory";
import {
  useApproveAdminDfyLogoMutation,
  useGetAdminDfyOrderQuery,
  useReevaluateAdminDfyFulfillmentMutation,
  useRetryAdminDfyFulfillmentMutation,
  useUploadAdminDfyLogoMutation,
} from "../store/api/DoneForYou/dfy.api";

function mutationMessage(error: unknown, fallback: string) {
  if (typeof error === "object" && error !== null && "data" in error) {
    const data = (error as { data?: { message?: unknown } }).data;
    const message = data?.message;
    if (Array.isArray(message)) return message[0] || fallback;
    if (typeof message === "string") return message;
    if (typeof message === "object" && message !== null) {
      const nested = message as {
        message?: unknown;
        blockers?: Array<{ message?: string }>;
      };
      if (nested.blockers?.length) {
        return nested.blockers
          .map((blocker) => blocker.message)
          .filter(Boolean)
          .join(" ");
      }
      if (typeof nested.message === "string") return nested.message;
    }
  }
  return fallback;
}

function countTasks(
  tasks: Array<{ type: string; status: string }> | undefined,
  type: string,
) {
  const matched = (tasks ?? []).filter((task) => task.type === type);
  return {
    total: matched.length,
    done: matched.filter(
      (task) => task.status === "SUCCEEDED" || task.status === "SKIPPED",
    ).length,
    failed: matched.filter((task) => task.status === "FAILED").length,
  };
}

export default function AdminDoneForYouDetailPage() {
  const { id = "" } = useParams();
  const { data, isLoading, isError, refetch } = useGetAdminDfyOrderQuery(id, {
    skip: !id,
    pollingInterval: 12_000,
  });
  const [uploadLogo, { isLoading: isUploadingLogo }] =
    useUploadAdminDfyLogoMutation();
  const [approveLogo, { isLoading: isApprovingLogo }] =
    useApproveAdminDfyLogoMutation();
  const [reevaluateFulfillment, { isLoading: isReevaluating }] =
    useReevaluateAdminDfyFulfillmentMutation();
  const [retryFulfillment, { isLoading: isRetryingFulfillment }] =
    useRetryAdminDfyFulfillmentMutation();
  const { openConfirm, confirmDialog, showAlert, alertDialog } =
    useConfirmDialog();
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const order = data?.order;

  const automation = useMemo(() => {
    const tasks = order?.fulfillment?.job?.tasks ?? [];
    return {
      graphics: countTasks(tasks, "GRAPHIC_OVERLAY"),
      videos: countTasks(tasks, "ASSIGN_VIDEO"),
      captions: countTasks(tasks, "ASSIGN_TEXT"),
      publish: countTasks(tasks, "PUBLISH_PACKAGE"),
      failedTasks: tasks.filter((task) => task.status === "FAILED"),
    };
  }, [order?.fulfillment?.job?.tasks]);

  const submitLogo = async () => {
    if (!logoFile) return;
    const form = new FormData();
    form.append("file", logoFile);
    try {
      await uploadLogo({ orderId: id, formData: form }).unwrap();
      setLogoFile(null);
      showAlert({
        title: "Logo uploaded",
        message: "Preview the logo, then approve it to start DFY automation.",
        type: "success",
      });
    } catch {
      showAlert({
        title: "Logo upload failed",
        message: "Unable to upload the final logo.",
        type: "error",
      });
    }
  };

  const confirmAndApproveLogo = (assetId: string, title: string) => {
    openConfirm(
      {
        title: "Approve final logo",
        message: `Approve “${title}”? This becomes the customer’s canonical logo and starts automated DFY asset generation.`,
        confirmText: "Approve & start automation",
      },
      async () => {
        try {
          await approveLogo({ orderId: id, assetId }).unwrap();
          showAlert({
            title: "Logo approved",
            message: "Automation has been triggered for this order.",
            type: "success",
          });
        } catch (error) {
          showAlert({
            title: "Approval failed",
            message: mutationMessage(error, "Unable to approve this logo."),
            type: "error",
          });
        }
      },
    );
  };

  const runFulfillmentReevaluate = async () => {
    try {
      const result = await reevaluateFulfillment(id).unwrap();
      showAlert({
        title: "Automation re-checked",
        message: result.processed
          ? "Eligibility passed and fulfillment was processed."
          : "Eligibility was evaluated. Generation did not run because prerequisites are incomplete or the job is already complete.",
        type: "success",
      });
    } catch (error) {
      showAlert({
        title: "Re-check failed",
        message: mutationMessage(error, "Unable to re-evaluate fulfillment."),
        type: "error",
      });
    }
  };

  const runFulfillmentRetry = async () => {
    try {
      await retryFulfillment(id).unwrap();
      showAlert({
        title: "Failed items retried",
        message: "Only failed automation items were re-queued.",
        type: "success",
      });
    } catch (error) {
      showAlert({
        title: "Retry failed",
        message: mutationMessage(error, "Unable to retry failed items."),
        type: "error",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="grid min-h-80 place-items-center">
        <Loader2 className="h-8 w-8 animate-spin text-dashboard-admin" />
      </div>
    );
  }

  if (isError || !order) {
    return (
      <DashboardCard className="text-center">
        <p className="text-sm text-slate-500">Unable to load this DFY order.</p>
        <Button
          onClick={() => refetch()}
          className="mt-4 bg-dashboard-admin hover:bg-dashboard-admin-dark"
        >
          Retry
        </Button>
      </DashboardCard>
    );
  }

  const ctx = order.productionContext;
  const brand = order.brandProfile;
  const selectedStyle = brand?.selectedLogoStyle ?? null;
  const approvedLogo = brand?.approvedLogo ?? brand?.approvedLogoAsset ?? null;
  const pendingLogoAssets = (brand?.assets ?? []).filter(
    (asset) => asset.assetType === "IMAGE" && asset.fileUrl,
  );
  const latestUploaded =
    pendingLogoAssets[pendingLogoAssets.length - 1] ?? null;
  const websiteUrl =
    ctx.referralCard?.websiteUrl ||
    ctx.websiteUrl ||
    (ctx.websiteSlug ? `https://${ctx.websiteSlug}.quittheapp.com` : null);
  const jobStatus = order.fulfillment?.job?.status ?? null;
  const customerState = order.fulfillment?.state ?? null;
  const automationReady =
    jobStatus === "SUCCEEDED" ||
    order.status === "PUBLISHED" ||
    Boolean(order.publishedAt);

  const graphicsDeliverable = order.deliverables.find(
    (item) => item.key === "social_media_starter_content",
  );
  const videosDeliverable = order.deliverables.find(
    (item) => item.key === "personalized_launch_videos",
  );
  const captionsDeliverable = order.deliverables.find(
    (item) => item.key === "text_customer_response_templates",
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Link
            to="/admin/done-for-you"
            className="inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-dashboard-admin hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to queue
          </Link>
          <h2 className="mt-3 text-2xl font-bold text-slate-800">
            {order.business.businessName}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {order.user.email} • {formatCategory(order.audience)}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <DfyStatusBadge status={order.status} />
          {automationReady && (
            <span className="inline-flex items-center gap-1 rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Automation ready
            </span>
          )}
        </div>
      </div>

      {/* Area 1 — Customer Information */}
      <DashboardCard>
        <h3 className="text-lg font-semibold text-slate-900">Customer information</h3>
        <p className="mt-1 text-sm text-slate-500">
          Details needed to personalize the logo and fulfill this order.
        </p>
        <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-3">
          <Info
            label="Customer name"
            value={ctx.customerName || order.user.name || "—"}
          />
          <Info label="Email" value={ctx.email || order.user.email} />
          <Info label="Phone" value={ctx.phone || order.user.phone || "—"} />
          <Info label="Business / company" value={ctx.businessName} />
          <Info label="Selling door" value={formatCategory(ctx.category)} />
          <Info
            label="Service area"
            value={ctx.serviceArea?.cityArea || "—"}
          />
          <Info
            label="Airports"
            value={ctx.airportsServed.join(", ") || "—"}
          />
          <Info label="Website / profile" value={websiteUrl || ctx.websiteSlug || "—"} />
          <Info
            label="Business info"
            value={ctx.businessInfo?.trim() || "—"}
          />
          <Info
            label="Buyer name"
            value={ctx.businessSetup?.buyerFullName || "—"}
          />
          <Info label="Purchased" value={formatDate(order.payment?.createdAt)} />
        </dl>
      </DashboardCard>

      {/* Area 2 — Customer's Logo Selection */}
      <DashboardCard className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Customer&apos;s logo selection
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            The design style the customer chose. Create the personalized logo from this
            artwork plus their business name.
          </p>
        </div>
        {selectedStyle ? (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="w-full max-w-xs rounded-lg border border-slate-200 bg-slate-50 p-4">
              {selectedStyle.previewUrl ? (
                <img
                  src={selectedStyle.previewUrl}
                  alt={selectedStyle.name}
                  className="aspect-video w-full object-contain"
                />
              ) : (
                <div className="grid aspect-video place-items-center text-sm text-slate-500">
                  Preview unavailable
                </div>
              )}
            </div>
            <dl className="grid flex-1 gap-3 text-sm sm:grid-cols-2">
              <Info label="Selected style" value={selectedStyle.name} />
              <Info
                label="Category"
                value={selectedStyle.isShared ? "Shared" : "Specialty"}
              />
              <Info label="Selling door" value={formatCategory(order.audience)} />
              <Info label="Style key" value={selectedStyle.key} />
            </dl>
          </div>
        ) : (
          <p className="rounded-lg border border-dashed border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            The customer has not selected a logo style yet.
          </p>
        )}
      </DashboardCard>

      {/* Area 3 — Final Personalized Logo */}
      <DashboardCard className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Final personalized logo
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Create the transparent PNG outside the platform, upload it here, then approve to
            start automation. The backend does not generate the business-name logo.
          </p>
        </div>

        {approvedLogo?.fileUrl ? (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50/40 p-4">
            <p className="text-sm font-semibold text-emerald-800">Approved final logo</p>
            <img
              src={approvedLogo.fileUrl}
              alt="Approved final logo"
              className="mt-3 max-h-48 w-full object-contain"
            />
          </div>
        ) : latestUploaded?.fileUrl ? (
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-900">Uploaded logo preview</p>
            <img
              src={latestUploaded.fileUrl}
              alt={latestUploaded.title}
              className="mt-3 max-h-48 w-full object-contain"
            />
            <Button
              onClick={() =>
                confirmAndApproveLogo(latestUploaded.id, latestUploaded.title)
              }
              isLoading={isApprovingLogo}
              className="mt-4 cursor-pointer bg-dashboard-admin hover:bg-dashboard-admin-dark"
            >
              Approve / confirm final logo
            </Button>
          </div>
        ) : (
          <p className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
            No final logo uploaded yet.
          </p>
        )}

        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-sm font-semibold text-slate-900">
            {approvedLogo ? "Replace logo" : "Upload final logo"}
          </p>
          <label className="mt-3 flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-700 hover:bg-slate-100">
            <UploadCloud className="h-5 w-5 text-dashboard-admin" />
            <span className="truncate">
              {logoFile?.name || "Choose transparent PNG (PNG / JPEG / WebP)"}
            </span>
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="hidden cursor-pointer"
              onChange={(event) => setLogoFile(event.target.files?.[0] || null)}
            />
          </label>
          <Button
            onClick={() => void submitLogo()}
            disabled={!logoFile}
            isLoading={isUploadingLogo}
            className="mt-3 cursor-pointer bg-dashboard-admin hover:bg-dashboard-admin-dark"
          >
            {approvedLogo ? "Upload replacement logo" : "Upload final logo"}
          </Button>
          {approvedLogo && (
            <p className="mt-2 text-xs leading-5 text-slate-500">
              After uploading a replacement, approve the new file to restart automation for that
              logo revision.
            </p>
          )}
        </div>
      </DashboardCard>

      {/* Area 4 — DFY Automation */}
      <DashboardCard className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">DFY automation</h3>
            <p className="mt-1 text-sm text-slate-500">
              After logo approval, automation generates graphics, assigns launch videos and
              captions/instructions, then publishes the completed kit.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="secondary"
              onClick={() => void runFulfillmentReevaluate()}
              isLoading={isReevaluating}
              className="min-h-10"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Re-check automation
            </Button>
            <Button
              onClick={() => void runFulfillmentRetry()}
              isLoading={isRetryingFulfillment}
              disabled={automation.failedTasks.length === 0}
              className="min-h-10 cursor-pointer bg-dashboard-admin hover:bg-dashboard-admin-dark disabled:cursor-not-allowed"
            >
              Retry failed item
            </Button>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Stat
            label="Graphics"
            value={
              automation.graphics.total
                ? `${automation.graphics.done} / ${automation.graphics.total}`
                : "—"
            }
          />
          <Stat
            label="Videos"
            value={
              automation.videos.total
                ? `${automation.videos.done} / ${automation.videos.total}`
                : "—"
            }
          />
          <Stat
            label="Captions"
            value={
              automation.captions.total
                ? `${automation.captions.done} / ${automation.captions.total} attached`
                : automation.captions.total === 0
                  ? "None required"
                  : "—"
            }
          />
          <Stat
            label="Status"
            value={
              automationReady
                ? "READY"
                : jobStatus?.replaceAll("_", " ") ||
                  customerState?.replaceAll("_", " ") ||
                  "Waiting for logo"
            }
          />
        </div>

        {order.fulfillment?.job?.errorSummary && (
          <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {order.fulfillment.job.errorSummary}
          </p>
        )}

        {automation.failedTasks.length > 0 && (
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm font-semibold text-amber-900">Failed items</p>
            <ul className="mt-2 space-y-1 text-sm text-amber-800">
              {automation.failedTasks.map((task) => (
                <li key={task.id}>
                  {task.type.replaceAll("_", " ")} · {task.key}
                  {task.errorMessage ? ` — ${task.errorMessage}` : ""}
                </li>
              ))}
            </ul>
          </div>
        )}

        {order.fulfillment && order.fulfillment.blockers.length > 0 && !automationReady && (
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-900">Waiting on</p>
            <ul className="mt-2 space-y-1 text-sm text-slate-600">
              {order.fulfillment.blockers.map((blocker) => (
                <li key={blocker.code}>{blocker.message}</li>
              ))}
            </ul>
          </div>
        )}

        {(graphicsDeliverable?.assets.length ||
          videosDeliverable?.assets.length ||
          captionsDeliverable?.assets.length) && (
          <div className="space-y-4 border-t border-slate-100 pt-4">
            <p className="text-sm font-semibold text-slate-900">Generated package preview</p>
            {Boolean(graphicsDeliverable?.assets.length) && (
              <div className="space-y-2">
                <p className="text-sm text-slate-600">Graphics</p>
                <DfyAssetGallery assets={graphicsDeliverable?.assets ?? []} />
              </div>
            )}
            {Boolean(videosDeliverable?.assets.length) && (
              <div className="space-y-2">
                <p className="text-sm text-slate-600">Videos</p>
                <DfyAssetGallery assets={videosDeliverable?.assets ?? []} />
              </div>
            )}
            {Boolean(captionsDeliverable?.assets.length) && (
              <div className="space-y-2">
                <p className="text-sm text-slate-600">Captions / instructions</p>
                <DfyAssetGallery assets={captionsDeliverable?.assets ?? []} />
              </div>
            )}
          </div>
        )}
      </DashboardCard>

      {confirmDialog}
      {alertDialog}
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-semibold text-slate-800">{label}</dt>
      <dd className="mt-1 break-words text-slate-500">{value || "—"}</dd>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-900">{value}</p>
    </div>
  );
}
