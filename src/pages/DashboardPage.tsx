import { useState } from "react";
import { ArrowRight, Copy, Download, ExternalLink, Share2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { ResourceCard } from "../components/resources/ResourceCard";
import { GuideModal } from "../components/resources/GuideModal";
import { useGetRiderProfileQuery } from "../store/api/Auth/auth.api";
import { useGetBusinessResourcesQuery, useGetReferralCardQuery, useLazyDownloadBusinessResourceQuery } from "../store/api/Business/business.api";
import type { BusinessResource } from "../store/api/Business/business.type";
import { copyToClipboard } from "../utils/clipboard";

function downloadUrl(url: string, filename: string) {
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.target = "_blank";
  anchor.rel = "noopener noreferrer";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
}

export default function DashboardPage() {
  const { data: profile } = useGetRiderProfileQuery();
  const { data: setup } = useGetBusinessResourcesQuery({ limit: 3 });
  const { data: referral } = useGetReferralCardQuery();
  const [downloadResource] = useLazyDownloadBusinessResourceQuery();
  const [guide, setGuide] = useState<BusinessResource | null>(null);
  const [showQr, setShowQr] = useState(false);
  const [copied, setCopied] = useState(false);
  const user = profile?.user;
  const business = profile?.business;
  const websiteUrl = referral?.data.websiteUrl || (business?.slug ? `https://${business.slug}.quittheapp.com` : "");
  const resources = setup?.resources ?? [];
  const launched = business?.status === "ACTIVE";
  const firstName = (user?.name || user?.email || "").split(" ")[0];

  const copyLink = async () => {
    if (await copyToClipboard(websiteUrl)) { setCopied(true); window.setTimeout(() => setCopied(false), 1800); }
  };
  const downloadReferral = () => { if (referral?.data.printCardUrl) downloadUrl(referral.data.printCardUrl, "referral-card.pdf"); else if (referral?.data.qrCodeUrl) downloadUrl(referral.data.qrCodeUrl, "referral-qr.png"); };
  const resourceAction = async (resource: BusinessResource) => {
    if (resource.type.toLowerCase().includes("guide")) { setGuide(resource); return; }
    if (resource.type.toLowerCase().includes("pdf")) { const blob = await downloadResource(resource.id).unwrap(); const url = URL.createObjectURL(blob); downloadUrl(url, `${resource.name}.pdf`); URL.revokeObjectURL(url); }
  };

  return <div className="space-y-6">
    <div><h2 className="text-2xl font-bold tracking-tight text-slate-900">Welcome back, {firstName || "there"}!</h2><p className="mt-1 text-sm text-slate-500">Everything you need to launch and grow your direct booking business.</p></div>
    <section className="flex flex-col gap-4 rounded-2xl border border-green-300 bg-white p-5 sm:flex-row sm:items-center sm:justify-between"><div><h3 className="font-semibold text-slate-900">{launched ? "Your website is live" : "Please set up your launch profile"}</h3><p className="mt-1 text-sm text-slate-500">{launched ? "Your direct booking business is ready to receive customers." : "Complete the next section to keep your business launch moving forward."}</p>{!launched && <Link to="/launch-dashboard" className="mt-4 inline-flex items-center gap-2 rounded-lg bg-dashboard-rider px-4 py-2.5 text-sm font-semibold text-white">Continue Launch Setup <ArrowRight className="h-4 w-4" /></Link>}</div>{!launched && <div className="min-w-48 text-sm"><p className="font-semibold text-slate-700">Follow just four step</p><ul className="mt-2 list-inside list-disc text-dashboard-rider"><li>Your info</li><li>Business info</li><li>Service area</li><li>Confirm</li></ul></div>}</section>
    <div className="grid gap-6 xl:grid-cols-[1fr_265px]"><section><div className="mb-3 flex items-center justify-between"><h3 className="text-lg font-semibold text-slate-900">Resources &amp; Guide</h3><Link to="/resources-guide" className="text-sm font-semibold text-dashboard-rider">View all ›</Link></div><div className="grid gap-4 md:grid-cols-3">{resources.map((resource) => <ResourceCard key={resource.id} resource={resource} compact onAction={resourceAction} />)}</div></section><section><h3 className="mb-3 text-lg font-semibold text-slate-900">Quick Actions</h3><div className="space-y-2">{[["Browse your selling page", "/selling-page", ExternalLink], ["Read latest resources & guide", "/resources-guide", Sparkles]].map(([label, path, Icon]) => <Link key={String(path)} to={String(path)} className="flex items-center justify-between rounded-lg border border-green-100 bg-white p-3 text-sm text-slate-600 hover:border-green-300"><span className="flex items-center gap-2"><Icon className="h-4 w-4 text-dashboard-rider" />{String(label)}</span><ArrowRight className="h-4 w-4" /></Link>)}<button type="button" onClick={downloadReferral} className="flex w-full items-center justify-between rounded-lg border border-green-100 bg-white p-3 text-left text-sm text-slate-600 hover:border-green-300"><span className="flex items-center gap-2"><Download className="h-4 w-4 text-dashboard-rider" />Download your referral card</span><ArrowRight className="h-4 w-4" /></button><button type="button" onClick={copyLink} className="flex w-full items-center justify-between rounded-lg border border-green-100 bg-white p-3 text-left text-sm text-slate-600 hover:border-green-300"><span className="flex items-center gap-2"><Share2 className="h-4 w-4 text-dashboard-rider" />{copied ? "Link copied" : "Share your landing page"}</span><Copy className="h-4 w-4" /></button></div></section></div>

    <GuideModal resource={guide} onClose={() => setGuide(null)} />
    {showQr && <div className="fixed inset-0 z-[90] grid place-items-center bg-slate-950/60 p-4"><div className="rounded-xl bg-white p-6 text-center shadow-2xl"><div className="flex justify-end"><button type="button" onClick={() => setShowQr(false)} className="text-slate-500">×</button></div>{referral?.data.qrCodeUrl ? <img src={referral.data.qrCodeUrl} alt="Referral QR code" className="mx-auto h-56 w-56" /> : <p className="p-10 text-sm text-slate-500">QR code is not available yet.</p>}<button type="button" onClick={() => referral?.data.qrCodeUrl && downloadUrl(referral.data.qrCodeUrl, "referral-qr.png")} className="mt-4 rounded-lg bg-dashboard-rider px-4 py-2 text-sm font-semibold text-white">Download QR Code</button></div></div>}
  </div>;
}
