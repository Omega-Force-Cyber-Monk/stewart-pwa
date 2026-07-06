import {
  AlertTriangle,
  ExternalLink,
  Globe2,
  Search,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { useAppSelector } from "../app/hooks";
import { Badge } from "../components/common/Badge";
import { Button } from "../components/common/Button";
import { DashboardCard } from "../components/layout/DashboardCard";
import { PageContainer } from "../components/layout/PageContainer";
import { ResponsiveGrid } from "../components/layout/ResponsiveGrid";
import { selectDriverProfile, selectHasDfyUpgrade } from "../features/appFlow/appFlowSlice";
import {
  mockBusinessOwners,
  mockFulfillmentTasks,
} from "../features/admin/adminData";
import type {
  AcuityStatus,
  BusinessOwner,
  FulfillmentStatus,
  OwnerPlan,
  OwnerStatus,
  WebsiteStatus,
} from "../features/admin/adminTypes";
import { useTranslation } from "../features/localization/useTranslation";
import type { TranslationDictionary } from "../features/localization/localizationTypes";
import { cn } from "../lib/cn";
import { getDriverDisplayDomain, getDriverSitePath } from "../lib/driverSite";

type PlanFilter = "all" | OwnerPlan;

const statusTone: Record<OwnerStatus, "neutral" | "success" | "warning" | "accent"> = {
  active: "success",
  onboarding: "accent",
  attention: "warning",
  paused: "neutral",
};

const fulfillmentTone: Record<FulfillmentStatus, "neutral" | "success" | "warning" | "accent"> = {
  not_started: "neutral",
  in_progress: "accent",
  blocked: "warning",
  delivered: "success",
};

const websiteTone: Record<WebsiteStatus, "neutral" | "success" | "warning" | "accent"> = {
  draft: "neutral",
  live: "success",
  needs_review: "warning",
};

const acuityTone: Record<AcuityStatus, "neutral" | "success" | "warning" | "accent"> = {
  not_connected: "neutral",
  connected: "success",
  needs_review: "warning",
};

function getStatusLabel(labels: TranslationDictionary["adminPage"]["statusLabels"], value: string) {
  return labels[value] || value.replaceAll("_", " ");
}

function MetricCard({
  icon: Icon,
  label,
  value,
  helper,
}: {
  icon: typeof Users;
  label: string;
  value: string;
  helper: string;
}) {
  return (
    <DashboardCard as="article" className="bg-white">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{value}</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">{helper}</p>
        </div>
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-pink-50 text-[#EE389C]">
          <Icon aria-hidden="true" className="size-5" />
        </span>
      </div>
    </DashboardCard>
  );
}

function OwnerRow({
  adminCopy,
  owner,
}: {
  adminCopy: TranslationDictionary["adminPage"];
  owner: BusinessOwner;
}) {
  return (
    <tr className="border-b border-slate-100 last:border-b-0">
      <td className="min-w-[240px] px-4 py-4">
        <p className="font-semibold text-slate-950">{owner.businessName}</p>
        <p className="mt-1 text-sm text-slate-500">{owner.ownerName}</p>
      </td>
      <td className="min-w-[180px] px-4 py-4 text-sm text-slate-600">
        <p>{owner.city}</p>
        <p className="mt-1">{owner.airports}</p>
      </td>
      <td className="min-w-[190px] px-4 py-4">
        <Badge tone={owner.plan === "DFY" ? "success" : "accent"}>{owner.plan}</Badge>
      </td>
      <td className="min-w-[180px] px-4 py-4">
        <Badge className="capitalize" tone={statusTone[owner.status]}>
          {getStatusLabel(adminCopy.statusLabels, owner.status)}
        </Badge>
      </td>
      <td className="min-w-[180px] px-4 py-4">
        <Badge className="capitalize" tone={websiteTone[owner.websiteStatus]}>
          {getStatusLabel(adminCopy.statusLabels, owner.websiteStatus)}
        </Badge>
      </td>
      <td className="min-w-[190px] px-4 py-4">
        <Badge className="capitalize" tone={acuityTone[owner.acuityStatus]}>
          {getStatusLabel(adminCopy.statusLabels, owner.acuityStatus)}
        </Badge>
      </td>
      <td className="min-w-[180px] px-4 py-4">
        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-[#EE389C]"
            style={{ width: `${owner.launchProgress}%` }}
          />
        </div>
        <p className="mt-2 text-sm font-semibold text-slate-600">
          {owner.launchProgress}% {adminCopy.launched}
        </p>
      </td>
      <td className="min-w-[230px] px-4 py-4">
        <a
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#EE389C] transition hover:text-pink-700"
          href={`https://${owner.domain}`}
          rel="noreferrer"
          target="_blank"
        >
          {owner.domain}
          <ExternalLink aria-hidden="true" className="size-4" />
        </a>
      </td>
    </tr>
  );
}

export default function SuperAdminDashboardPage() {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [planFilter, setPlanFilter] = useState<PlanFilter>("all");
  const driverProfile = useAppSelector(selectDriverProfile);
  const hasDfyUpgrade = useAppSelector(selectHasDfyUpgrade);

  const currentDemoOwner: BusinessOwner | null = useMemo(
    () =>
      driverProfile
        ? {
            id: "owner-current-demo",
            ownerName: driverProfile.fullName,
            businessName: `${driverProfile.fullName} Transportation`,
            city: driverProfile.targetCity,
            airports: driverProfile.regionalAirports,
            domain: getDriverDisplayDomain(driverProfile),
            plan: hasDfyUpgrade ? "DFY" : "DIY",
            status: "onboarding",
            websiteStatus: "draft",
            acuityStatus: "not_connected",
            launchProgress: 58,
            supportTickets: 0,
            joinedAt: "2026-07-05",
          }
        : null,
    [driverProfile, hasDfyUpgrade],
  );

  const owners = useMemo(
    () => (currentDemoOwner ? [currentDemoOwner, ...mockBusinessOwners] : mockBusinessOwners),
    [currentDemoOwner],
  );

  const filteredOwners = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return owners.filter((owner) => {
      const matchesPlan = planFilter === "all" || owner.plan === planFilter;
      const matchesQuery =
        !normalizedQuery ||
        [
          owner.ownerName,
          owner.businessName,
          owner.city,
          owner.airports,
          owner.domain,
          owner.status,
        ].some((value) => value.toLowerCase().includes(normalizedQuery));

      return matchesPlan && matchesQuery;
    });
  }, [owners, planFilter, query]);

  const totalPurchased = owners.length;
  const diyCount = owners.filter((owner) => owner.plan === "DIY").length;
  const dfyCount = owners.filter((owner) => owner.plan === "DFY").length;
  const acuityConnectedCount = owners.filter((owner) => owner.acuityStatus === "connected").length;
  const liveWebsiteCount = owners.filter((owner) => owner.websiteStatus === "live").length;
  const attentionCount = owners.filter((owner) => owner.status === "attention").length;
  const openTickets = owners.reduce((sum, owner) => sum + owner.supportTickets, 0);

  return (
    <main className="bg-slate-50">
      <PageContainer className="py-10" size="xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Badge tone="warning">{t.adminPage.badge}</Badge>
            <h1 className="mt-3 text-3xl font-bold tracking-normal text-slate-950 md:text-5xl">
              {t.adminPage.title}
            </h1>
            <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
              {t.adminPage.subtitle}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            {driverProfile && (
              <Link
                className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-950 transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                to={getDriverSitePath(driverProfile)}
              >
                {t.adminPage.viewDemoOwnerSite}
                <ExternalLink aria-hidden="true" className="size-4" />
              </Link>
            )}
            <Button>
              <Settings aria-hidden="true" className="size-4" />
              {t.adminPage.platformSettings}
            </Button>
          </div>
        </div>

        <ResponsiveGrid className="mt-8" columns={4} gap="sm">
          <MetricCard
            helper={t.adminPage.totalPurchasedHelper}
            icon={Users}
            label={t.adminPage.totalPurchased}
            value={String(totalPurchased)}
          />
          <MetricCard
            helper={t.adminPage.diyOwnersHelper}
            icon={Users}
            label={t.adminPage.diyOwners}
            value={String(diyCount)}
          />
          <MetricCard
            helper={t.adminPage.dfyOwnersHelper}
            icon={ShieldCheck}
            label={t.adminPage.dfyOwners}
            value={String(dfyCount)}
          />
          <MetricCard
            helper={`${openTickets} ${t.adminPage.needsAttentionHelper}`}
            icon={AlertTriangle}
            label={t.adminPage.needsAttention}
            value={String(attentionCount)}
          />
        </ResponsiveGrid>

        <DashboardCard as="section" className="mt-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-950">{t.adminPage.ownerDirectory}</h2>
              <p className="mt-1 text-sm text-slate-600">
                {t.adminPage.ownerDirectoryDescription}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <label className="relative block">
                <Search
                  aria-hidden="true"
                  className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400"
                />
                <input
                  aria-label={t.adminPage.searchOwners}
                  className="min-h-11 w-full rounded-md border border-slate-300 bg-white pl-10 pr-3 text-sm outline-none transition focus:border-[#EE389C] focus:ring-2 focus:ring-pink-100 sm:w-72"
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={t.adminPage.searchOwners}
                  value={query}
                />
              </label>
              <select
                aria-label={t.adminPage.filterByPlan}
                className="min-h-11 rounded-md border border-slate-300 bg-white px-3 text-sm font-semibold outline-none transition focus:border-[#EE389C] focus:ring-2 focus:ring-pink-100"
                onChange={(event) => setPlanFilter(event.target.value as PlanFilter)}
                value={planFilter}
              >
                <option value="all">{t.adminPage.allPlans}</option>
                <option value="DIY">DIY</option>
                <option value="DFY">DFY</option>
              </select>
            </div>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-y border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <th className="px-4 py-3">{t.adminPage.business}</th>
                  <th className="px-4 py-3">{t.adminPage.market}</th>
                  <th className="px-4 py-3">{t.adminPage.plan}</th>
                  <th className="px-4 py-3">{t.adminPage.status}</th>
                  <th className="px-4 py-3">{t.adminPage.website}</th>
                  <th className="px-4 py-3">{t.adminPage.acuity}</th>
                  <th className="px-4 py-3">{t.adminPage.launch}</th>
                  <th className="px-4 py-3">{t.adminPage.domain}</th>
                </tr>
              </thead>
              <tbody>
                {filteredOwners.map((owner) => (
                  <OwnerRow adminCopy={t.adminPage} key={owner.id} owner={owner} />
                ))}
              </tbody>
            </table>
          </div>
        </DashboardCard>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_1fr]">
          <DashboardCard as="section">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-950">{t.adminPage.dfyQueue}</h2>
                <p className="mt-1 text-sm text-slate-600">
                  {t.adminPage.dfyQueueDescription}
                </p>
              </div>
              <ShieldCheck aria-hidden="true" className="size-6 text-[#EE389C]" />
            </div>
            <div className="mt-5 grid gap-3">
              {mockFulfillmentTasks.map((task) => (
                <article className="rounded-lg border border-slate-200 p-4" key={task.id}>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="font-semibold text-slate-950">{task.title}</p>
                      <p className="mt-1 text-sm text-slate-600">{task.ownerName}</p>
                    </div>
                    <Badge className="capitalize" tone={fulfillmentTone[task.status]}>
                      {getStatusLabel(t.adminPage.statusLabels, task.status)}
                    </Badge>
                  </div>
                  <p className="mt-3 text-sm font-semibold text-slate-500">
                    {t.adminPage.due} {task.dueDate}
                  </p>
                </article>
              ))}
            </div>
          </DashboardCard>

          <DashboardCard as="section">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-950">
                  {t.adminPage.websiteAcuitySetup}
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  {t.adminPage.websiteAcuityDescription}
                </p>
              </div>
              <Globe2 aria-hidden="true" className="size-6 text-[#EE389C]" />
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-semibold text-slate-500">{t.adminPage.liveWebsites}</p>
                <p className="mt-2 text-3xl font-bold text-slate-950">{liveWebsiteCount}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {t.adminPage.liveWebsitesDescription}
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-semibold text-slate-500">
                  {t.adminPage.acuityConnected}
                </p>
                <p className="mt-2 text-3xl font-bold text-slate-950">{acuityConnectedCount}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {t.adminPage.acuityConnectedDescription}
                </p>
              </div>
            </div>
            <div className="mt-5 grid gap-3">
              {owners
                .filter(
                  (owner) =>
                    owner.websiteStatus !== "live" || owner.acuityStatus !== "connected",
                )
                .map((owner) => (
                  <article className="rounded-lg border border-slate-200 p-4" key={owner.id}>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="font-semibold text-slate-950">{owner.businessName}</p>
                        <p className="mt-1 text-sm text-slate-600">{owner.domain}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="capitalize" tone={websiteTone[owner.websiteStatus]}>
                          {t.adminPage.siteLabel}:{" "}
                          {getStatusLabel(t.adminPage.statusLabels, owner.websiteStatus)}
                        </Badge>
                        <Badge className="capitalize" tone={acuityTone[owner.acuityStatus]}>
                          {t.adminPage.acuityLabel}:{" "}
                          {getStatusLabel(t.adminPage.statusLabels, owner.acuityStatus)}
                        </Badge>
                      </div>
                    </div>
                  </article>
                ))}
            </div>
          </DashboardCard>
        </div>

        <DashboardCard as="section" className="mt-8 border-pink-100 bg-pink-50/60">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-950">{t.adminPage.simulatorTitle}</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                {t.adminPage.simulatorDescription}
              </p>
            </div>
            <span
              className={cn(
                "inline-flex min-h-11 items-center justify-center rounded-md px-4 text-sm font-semibold",
                "border border-pink-200 bg-white text-[#EE389C]",
              )}
            >
              {t.adminPage.readyForBackend}
            </span>
          </div>
        </DashboardCard>
      </PageContainer>
    </main>
  );
}
