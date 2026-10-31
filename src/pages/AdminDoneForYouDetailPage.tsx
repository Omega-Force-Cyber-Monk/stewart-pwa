import { ArrowLeft, CheckCircle2, Loader2, RefreshCw } from "lucide-react";
import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "../components/common/Button";
import { DfyAssetGallery } from "../components/dfy/DfyAssetGallery";
import { DfyStatusBadge } from "../components/dfy/DfyStatusBadge";
import { formatDate } from "../components/dfy/dfyUtils";
import { DashboardCard } from "../components/layout/DashboardCard";
import { useConfirmDialog } from "../hooks/useConfirmDialog";
import { formatCategory } from "../lib/formatCategory";
import {
  useGetAdminDfyOrderQuery,
  useReevaluateAdminDfyFulfillmentMutation,
  useRetryAdminDfyFulfillmentMutation,
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
  const [reevaluateFulfillment, { isLoading: isReevaluating }] =
    useReevaluateAdminDfyFulfillmentMutation();
  const [retryFulfillment, { isLoading: isRetryingFulfillment }] =
    useRetryAdminDfyFulfillmentMutation();
  const { confirmDialog, showAlert, alertDialog } = useConfirmDialog();

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

      <DashboardCard>
        <h3 className="text-lg font-semibold text-slate-900">Customer information</h3>
        <p className="mt-1 text-sm text-slate-500">
          Customer details for this Done For You package.
        </p>
        <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-3">
          <Info label="Customer name" value={ctx.customerName || order.user.name || "—"} />
          <Info label="Email" value={ctx.email || order.user.email} />
          <Info label="Phone" value={ctx.phone || order.user.phone || "—"} />
          <Info label="Business / company" value={ctx.businessName} />
          <Info label="Selling door" value={formatCategory(ctx.category)} />
          <Info label="Service area" value={ctx.serviceArea?.cityArea || "—"} />
          <Info label="Airports" value={ctx.airportsServed.join(", ") || "—"} />
          <Info label="Website / profile" value={websiteUrl || ctx.websiteSlug || "—"} />
          <Info label="Business info" value={ctx.businessInfo?.trim() || "—"} />
          <Info label="Buyer name" value={ctx.businessSetup?.buyerFullName || "—"} />
          <Info label="Purchased" value={formatDate(order.payment?.createdAt)} />
        </dl>
      </DashboardCard>

      <DashboardCard className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">DFY automation</h3>
            <p className="mt-1 text-sm text-slate-500">
              Delivers audience graphics (no logo overlay), launch videos, and text packages,
              then publishes the completed kit. Custom logo / brand-kit workflow is retired.
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
                : "None required"
            }
          />
          <Stat
            label="Status"
            value={
              automationReady
                ? "READY"
                : jobStatus?.replaceAll("_", " ") ||
                  customerState?.replaceAll("_", " ") ||
                  "Preparing"
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
            <p className="text-sm font-semibold text-slate-900">Package preview</p>
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
                <p className="text-sm text-slate-600">Captions / templates / instructions</p>
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
