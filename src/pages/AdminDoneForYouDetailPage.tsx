import { ArrowLeft, ExternalLink, Loader2, UploadCloud } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "../components/common/Button";
import { DfyAssetGallery } from "../components/dfy/DfyAssetGallery";
import { DfyProgress } from "../components/dfy/DfyProgress";
import { DfyStatusBadge } from "../components/dfy/DfyStatusBadge";
import { MasterBrandCard } from "../components/dfy/MasterBrandCard";
import { calculateDfyProgress, formatDate } from "../components/dfy/dfyUtils";
import { DashboardCard } from "../components/layout/DashboardCard";
import { useConfirmDialog } from "../hooks/useConfirmDialog";
import { formatCategory } from "../lib/formatCategory";
import type { DfyAsset, DfyAssetType, DfyDeliverable } from "../store/api/DoneForYou/dfy.type";
import {
  useApproveAdminDfyLogoMutation,
  useCreateAdminDfyAssetMutation,
  useDeleteAdminDfyAssetMutation,
  useGetAdminDfyOrderQuery,
  useGetAdminDfyTemplateSetsQuery,
  usePublishAdminDfyOrderMutation,
  useUpdateAdminDfyOrderMutation,
  useUpdateAdminDfyDeliverableMutation,
  useUploadAdminDfyLogoMutation,
} from "../store/api/DoneForYou/dfy.api";

const orderStatuses = ["PENDING", "IN_PROGRESS", "IN_REVIEW", "READY", "PUBLISHED"] as const;
const deliverableStatuses = ["NOT_STARTED", "IN_PROGRESS", "IN_REVIEW", "COMPLETED", "PUBLISHED"] as const;
const assetTypes: DfyAssetType[] = ["IMAGE", "VIDEO", "DOCUMENT", "ARCHIVE", "LINK", "TEXT"];

function mutationMessage(error: unknown, fallback: string) {
  if (typeof error === "object" && error !== null && "data" in error) {
    const data = (error as { data?: { message?: unknown } }).data;
    const message = data?.message;
    if (Array.isArray(message)) return message[0] || fallback;
    if (typeof message === "string") return message;
    if (typeof message === "object" && message !== null) {
      const nested = message as { message?: unknown; blockers?: Array<{ message?: string }> };
      if (nested.blockers?.length) return nested.blockers.map((blocker) => blocker.message).filter(Boolean).join(" ");
      if (typeof nested.message === "string") return nested.message;
    }
  }
  return fallback;
}

export default function AdminDoneForYouDetailPage() {
  const { id = "" } = useParams();
  const { data, isLoading, isError, refetch } = useGetAdminDfyOrderQuery(id, { skip: !id });
  const { data: templateSetsData } = useGetAdminDfyTemplateSetsQuery();
  const [updateOrder, { isLoading: isUpdatingOrder }] = useUpdateAdminDfyOrderMutation();
  const [updateDeliverable, { isLoading: isUpdatingDeliverable }] = useUpdateAdminDfyDeliverableMutation();
  const [createAsset, { isLoading: isUploadingAsset }] = useCreateAdminDfyAssetMutation();
  const [deleteAsset] = useDeleteAdminDfyAssetMutation();
  const [uploadLogo, { isLoading: isUploadingLogo }] = useUploadAdminDfyLogoMutation();
  const [approveLogo, { isLoading: isApprovingLogo }] = useApproveAdminDfyLogoMutation();
  const [publishOrder, { isLoading: isPublishing }] = usePublishAdminDfyOrderMutation();
  const { openConfirm, confirmDialog, showAlert, alertDialog } = useConfirmDialog();
  const [assetDrafts, setAssetDrafts] = useState<Record<string, { title: string; assetType: DfyAssetType; linkUrl: string; textContent: string; file: File | null }>>({});
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const order = data?.order;
  const progress = useMemo(() => order ? calculateDfyProgress(order.deliverables) : 0, [order]);
  const applicableTemplateSets = useMemo(
    () => (templateSetsData?.templateSets ?? []).filter((set) => set.active && set.audience === order?.audience),
    [order?.audience, templateSetsData?.templateSets],
  );

  const draftFor = (deliverableId: string) => assetDrafts[deliverableId] ?? { title: "", assetType: "IMAGE" as DfyAssetType, linkUrl: "", textContent: "", file: null };
  const setDraft = (deliverableId: string, update: Partial<ReturnType<typeof draftFor>>) => {
    setAssetDrafts((current) => ({ ...current, [deliverableId]: { ...draftFor(deliverableId), ...update } }));
  };

  const submitAsset = async (deliverable: DfyDeliverable) => {
    const draft = draftFor(deliverable.id);
    if (!draft.title.trim()) {
      showAlert({ title: "Missing title", message: "Please add an asset title.", type: "error" });
      return;
    }
    const form = new FormData();
    form.append("deliverableId", deliverable.id);
    form.append("assetType", draft.assetType);
    form.append("title", draft.title.trim());
    if (draft.linkUrl.trim()) form.append("linkUrl", draft.linkUrl.trim());
    if (draft.textContent.trim()) form.append("textContent", draft.textContent.trim());
    if (draft.file) form.append("file", draft.file);
    try {
      await createAsset({ orderId: id, formData: form }).unwrap();
      setDraft(deliverable.id, { title: "", linkUrl: "", textContent: "", file: null });
      showAlert({ title: "Asset uploaded", message: "The deliverable asset was saved.", type: "success" });
    } catch {
      showAlert({ title: "Upload failed", message: "Unable to save this asset.", type: "error" });
    }
  };

  const removeAsset = (asset: DfyAsset) => {
    openConfirm({ title: "Remove asset", message: `Remove “${asset.title}”?`, confirmText: "Remove" }, async () => {
      await deleteAsset({ orderId: id, assetId: asset.id }).unwrap();
    });
  };

  const submitLogo = async () => {
    if (!logoFile) return;
    const form = new FormData();
    form.append("file", logoFile);
    try {
      await uploadLogo({ orderId: id, formData: form }).unwrap();
      setLogoFile(null);
      showAlert({ title: "Logo uploaded", message: "The final logo is ready for approval.", type: "success" });
    } catch {
      showAlert({ title: "Logo upload failed", message: "Unable to upload the final logo.", type: "error" });
    }
  };

  const changeOrderStatus = async (status: string) => {
    try {
      await updateOrder({ id, status }).unwrap();
    } catch (error) {
      showAlert({
        title: "Status not changed",
        message: mutationMessage(error, "The backend rejected this order status change."),
        type: "error",
      });
    }
  };

  const changeTemplateSet = async (templateSetId: string) => {
    if (!templateSetId) return;
    try {
      await updateOrder({ id, templateSetId }).unwrap();
      showAlert({ title: "Template set updated", message: "The production template set was saved.", type: "success" });
    } catch (error) {
      showAlert({
        title: "Template not changed",
        message: mutationMessage(error, "Unable to assign this template set."),
        type: "error",
      });
    }
  };

  const publishReadyOrder = () => {
    if (!order?.readiness.ready) {
      showAlert({
        title: "Kit is not ready",
        message: "Resolve the listed production blockers before publishing.",
        type: "error",
      });
      return;
    }
    openConfirm({
      title: "Publish & Notify",
      message: "Publishing will make completed assets available to the customer and trigger the backend customer notification.",
      confirmText: "Publish & Notify",
    }, async () => {
      try {
        await publishOrder(id).unwrap();
        showAlert({ title: "Published", message: "The DFY kit was published.", type: "success" });
      } catch (error) {
        showAlert({
          title: "Publish blocked",
          message: mutationMessage(error, "The backend blocked publishing because the kit is not ready."),
          type: "error",
        });
      }
    });
  };

  if (isLoading) return <div className="grid min-h-80 place-items-center"><Loader2 className="h-8 w-8 animate-spin text-dashboard-admin" /></div>;
  if (isError || !order) {
    return (
      <DashboardCard className="text-center">
        <p className="text-sm text-slate-500">Unable to load this DFY order.</p>
        <Button onClick={() => refetch()} className="mt-4 bg-dashboard-admin hover:bg-dashboard-admin-dark">Retry</Button>
      </DashboardCard>
    );
  }

  const brandAssets = order.brandProfile?.assets ?? [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Link to="/admin/done-for-you" className="inline-flex items-center gap-2 text-sm font-semibold text-dashboard-admin"><ArrowLeft className="h-4 w-4" />Back to queue</Link>
          <h2 className="mt-3 text-2xl font-bold text-slate-800">{order.business.businessName}</h2>
          <p className="mt-1 text-sm text-slate-500">{order.user.email} • {formatCategory(order.audience)}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <DfyStatusBadge status={order.status} />
          <Button
            onClick={publishReadyOrder}
            disabled={!order.readiness.ready}
            isLoading={isPublishing}
            className="bg-dashboard-admin hover:bg-dashboard-admin-dark"
          >
            Publish & Notify
          </Button>
        </div>
      </div>

      <DashboardCard>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 flex-1">
            <DfyProgress value={progress} />
            {order.readiness.ready ? (
              <p className="mt-3 text-sm font-medium text-emerald-700">All required DFY deliverables are complete and ready to publish.</p>
            ) : (
              <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4">
                <p className="text-sm font-semibold text-amber-900">Production blockers</p>
                <ul className="mt-2 space-y-1 text-sm text-amber-800">
                  {order.readiness.blockers.map((blocker, index) => (
                    <li key={`${blocker.deliverableKey || "order"}-${index}`}>{blocker.message}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <label className="w-full text-sm font-medium text-slate-700 lg:w-56">
            Order status
            <select
              value={order.status}
              onChange={(event) => void changeOrderStatus(event.target.value)}
              disabled={isUpdatingOrder}
              className="mt-2 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm"
            >
              {orderStatuses.map((status) => <option key={status} value={status}>{status.replaceAll("_", " ")}</option>)}
            </select>
          </label>
        </div>
      </DashboardCard>

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <main className="space-y-6">
          <DashboardCard>
            <h3 className="text-lg font-semibold text-slate-900">Customer information</h3>
            <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
              <Info label="Customer" value={order.productionContext.customerName || order.user.email} />
              <Info label="Email" value={order.productionContext.email} />
              <Info label="Phone" value={order.productionContext.phone || "—"} />
              <Info label="Buyer" value={order.productionContext.businessSetup?.buyerFullName || "—"} />
              <Info label="Buyer email" value={order.productionContext.contact?.buyerEmail || "—"} />
              <Info label="Buyer phone" value={order.productionContext.contact?.buyerPhone || "—"} />
              <Info label="Service area" value={order.productionContext.serviceArea?.cityArea || "—"} />
              <Info label="Airports" value={order.productionContext.airportsServed.join(", ") || "—"} />
              <Info label="Booking URL" value={order.productionContext.bookingUrl || "—"} />
              <Info label="Business email" value={order.productionContext.contact?.businessEmail || "—"} />
              <Info label="Business phone" value={order.productionContext.contact?.businessPhone || "—"} />
              <Info label="Purchased" value={formatDate(order.payment?.createdAt)} />
              <Info label="Public slug" value={order.productionContext.websiteSlug} />
            </dl>
          </DashboardCard>

          <DashboardCard>
            <h3 className="text-lg font-semibold text-slate-900">Audience / template information</h3>
            <div className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
              <Info label="Audience" value={formatCategory(order.productionContext.category)} />
              <Info label="Template set" value={order.templateSet?.name || "Not assigned"} />
              <Info label="Website" value={order.productionContext.websiteUrl || order.productionContext.websiteSlug} />
            </div>
            <label className="mt-4 block text-sm font-medium text-slate-700">
              Assign template set
              <select
                value={order.templateSet?.id || ""}
                onChange={(event) => void changeTemplateSet(event.target.value)}
                disabled={isUpdatingOrder || applicableTemplateSets.length === 0}
                className="mt-2 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm"
              >
                <option value="">{applicableTemplateSets.length === 0 ? "No active templates for this audience" : "Select template set"}</option>
                {applicableTemplateSets.map((set) => <option key={set.id} value={set.id}>{set.name}</option>)}
              </select>
            </label>
            {order.templateSet?.templates?.length ? (
              <div className="mt-4 divide-y divide-slate-100 rounded-lg border border-slate-200">
                {order.templateSet.templates.map((template) => (
                  <div key={template.id} className="flex flex-col gap-2 p-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{template.name}</p>
                      <p className="text-xs text-slate-500">{template.type} • {template.deliverableKey}</p>
                    </div>
                    {(template.sourceUrl || template.previewUrl) && <a href={template.sourceUrl || template.previewUrl || "#"} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-semibold text-dashboard-admin">Open reference <ExternalLink className="h-3.5 w-3.5" /></a>}
                  </div>
                ))}
              </div>
            ) : null}
          </DashboardCard>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900">Deliverables</h3>
            {order.deliverables.map((deliverable) => {
              const draft = draftFor(deliverable.id);
              return (
                <DashboardCard key={deliverable.id} className="space-y-4">
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-900">{deliverable.title}</h4>
                      {deliverable.description && <p className="mt-1 text-sm text-slate-500">{deliverable.description}</p>}
                    </div>
	                    <select
	                      value={deliverable.status}
	                      onChange={(event) => {
	                        void updateDeliverable({ orderId: id, deliverableId: deliverable.id, status: event.target.value }).unwrap().catch((error: unknown) => showAlert({ title: "Status not changed", message: mutationMessage(error, "The backend rejected this status transition."), type: "error" }));
	                      }}
                      disabled={isUpdatingDeliverable}
                      className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm"
                    >
                      {deliverableStatuses.map((status) => <option key={status} value={status}>{status.replaceAll("_", " ")}</option>)}
                    </select>
                  </div>

                  <DfyAssetGallery assets={deliverable.assets} admin onDelete={removeAsset} />

                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <h5 className="text-sm font-semibold text-slate-900">Add finished asset</h5>
                    <div className="mt-3 grid gap-3 lg:grid-cols-[1fr_170px]">
                      <input value={draft.title} onChange={(event) => setDraft(deliverable.id, { title: event.target.value })} placeholder="Asset title" className="h-10 rounded-lg border border-slate-200 px-3 text-sm" />
                      <select value={draft.assetType} onChange={(event) => setDraft(deliverable.id, { assetType: event.target.value as DfyAssetType })} className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm">
                        {assetTypes.map((type) => <option key={type} value={type}>{type}</option>)}
                      </select>
                    </div>
                    {draft.assetType === "LINK" ? (
                      <input value={draft.linkUrl} onChange={(event) => setDraft(deliverable.id, { linkUrl: event.target.value })} placeholder="https://" className="mt-3 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm" />
                    ) : draft.assetType === "TEXT" ? (
                      <textarea value={draft.textContent} onChange={(event) => setDraft(deliverable.id, { textContent: event.target.value })} rows={4} placeholder="Caption or template text" className="mt-3 w-full rounded-lg border border-slate-200 p-3 text-sm" />
                    ) : (
                      <label className="mt-3 flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-500">
                        <UploadCloud className="h-5 w-5 text-dashboard-admin" />
                        <span className="truncate">{draft.file?.name || "Choose file"}</span>
                        <input type="file" className="hidden" onChange={(event) => setDraft(deliverable.id, { file: event.target.files?.[0] || null })} />
                      </label>
                    )}
                    <Button onClick={() => void submitAsset(deliverable)} isLoading={isUploadingAsset} className="mt-3 bg-dashboard-admin hover:bg-dashboard-admin-dark">Save asset</Button>
                  </div>
                </DashboardCard>
              );
            })}
          </section>
        </main>

        <aside className="space-y-6">
          <MasterBrandCard brand={order.brandProfile} businessName={order.business.businessName} />
          <DashboardCard>
            <h3 className="text-lg font-semibold text-slate-900">Brand identity</h3>
            <p className="mt-2 text-sm text-slate-500">Selected style: {order.brandProfile?.selectedLogoStyle?.name || "Not selected"}</p>
            <label className="mt-4 flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-slate-300 p-4 text-sm text-slate-500">
              <UploadCloud className="h-5 w-5 text-dashboard-admin" />
              <span className="truncate">{logoFile?.name || "Upload final logo"}</span>
              <input type="file" accept="image/png,image/jpeg,image/webp" className="hidden" onChange={(event) => setLogoFile(event.target.files?.[0] || null)} />
            </label>
            <Button onClick={() => void submitLogo()} disabled={!logoFile} isLoading={isUploadingLogo} className="mt-3 w-full bg-dashboard-admin hover:bg-dashboard-admin-dark">Upload final logo</Button>
            {brandAssets.length > 0 && (
              <div className="mt-4 space-y-2">
                {brandAssets.map((asset) => (
                  <button key={asset.id} type="button" onClick={() => void approveLogo({ orderId: id, assetId: asset.id }).unwrap().catch(() => showAlert({ title: "Approval failed", message: "Unable to approve this logo.", type: "error" }))} disabled={isApprovingLogo} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50">
                    Approve {asset.title}
                  </button>
                ))}
              </div>
            )}
          </DashboardCard>
        </aside>
      </div>
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
