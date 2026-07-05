import { ExternalLink, Globe2, RotateCcw } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Badge } from "../components/common/Badge";
import { Button } from "../components/common/Button";
import { DFYPipeline } from "../components/dashboard/DFYPipeline";
import { LaunchProgress } from "../components/dashboard/LaunchProgress";
import { ModuleCard } from "../components/dashboard/ModuleCard";
import { ResourceLibrary } from "../components/dashboard/ResourceLibrary";
import { PageContainer } from "../components/layout/PageContainer";
import { ResponsiveGrid } from "../components/layout/ResponsiveGrid";
import {
  resetDemo,
  selectActiveFunnel,
  selectCompletedModuleCount,
  selectDfyPipelineStep,
  selectDriverProfile,
  selectHasDfyUpgrade,
  selectLaunchProgressPercentage,
  selectModuleStatuses,
  setDfyPipelineStep,
  updateModuleStatus,
  type ModuleStatus,
} from "../features/appFlow/appFlowSlice";
import { diyModules } from "../features/dashboard/dashboardData";
import { useTranslation } from "../features/localization/useTranslation";
import { clearPersistedState } from "../app/persistStore";
import { DashboardCard } from "../components/layout/DashboardCard";
import { getDriverDisplayDomain, getDriverSitePath } from "../lib/driverSite";

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const activeFunnel = useAppSelector(selectActiveFunnel);
  const completedModules = useAppSelector(selectCompletedModuleCount);
  const dfyPipelineStep = useAppSelector(selectDfyPipelineStep);
  const driverProfile = useAppSelector(selectDriverProfile);
  const hasDfyUpgrade = useAppSelector(selectHasDfyUpgrade);
  const moduleStatuses = useAppSelector(selectModuleStatuses);
  const percentageCompleted = useAppSelector(selectLaunchProgressPercentage);
  const totalModules = diyModules.length;
  const driverSitePath = getDriverSitePath(driverProfile);
  const driverDisplayDomain = getDriverDisplayDomain(driverProfile);

  const handleReset = () => {
    dispatch(resetDemo());
    clearPersistedState();
    navigate("/standard");
  };

  const statusLabels: Record<ModuleStatus, string> = {
    not_started: t.dashboard.statusNotStarted,
    in_progress: t.dashboard.statusInProgress,
    complete: t.dashboard.statusComplete,
  };

  return (
    <main>
      <PageContainer className="py-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Badge tone={hasDfyUpgrade ? "success" : "accent"}>
              {hasDfyUpgrade ? t.dashboard.dfyPathTitle : t.dashboard.diyPathTitle}
            </Badge>
            <h1 className="mt-3 text-3xl font-bold">{t.dashboard.title}</h1>
            <p className="mt-2 text-slate-600">
              {driverProfile?.fullName || t.common.appName}, {t.dashboard.subtitle} ({activeFunnel})
            </p>
          </div>
          <Button onClick={handleReset} variant="secondary">
            <RotateCcw aria-hidden="true" className="size-4" />
            {t.common.resetDemo}
          </Button>
        </div>

        <DashboardCard
          as="section"
          className="mt-8 flex flex-col gap-4 border-pink-100 bg-pink-50/60 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white text-[#EE389C]">
              <Globe2 aria-hidden="true" className="size-5" />
            </span>
            <div>
              <h2 className="text-lg font-bold text-slate-950">Personalized customer website</h2>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Your public booking page is available at{" "}
                <span className="font-semibold text-slate-950">{driverDisplayDomain}</span>.
              </p>
            </div>
          </div>
          <Link
            className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-md bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950"
            to={driverSitePath}
          >
            View customer page
            <ExternalLink aria-hidden="true" className="size-4" />
          </Link>
        </DashboardCard>

        {hasDfyUpgrade ? (
          <DFYPipeline
            currentStep={dfyPipelineStep}
            onStageChange={(stepIndex) => dispatch(setDfyPipelineStep(stepIndex))}
          />
        ) : (
          <section className="mt-8">
            <LaunchProgress
              completedModules={completedModules}
              motivationalMessage={t.dashboard.motivationalMessage}
              percentageCompleted={percentageCompleted}
              title={t.dashboard.progressLabel}
              totalModules={totalModules}
            />

            <ResponsiveGrid className="mt-6" columns={3} gap="sm">
              {diyModules.map((module) => {
                const status: ModuleStatus = moduleStatuses[module.id] || "not_started";

                return (
                  <ModuleCard
                    key={module.id}
                    module={module}
                    onCycleStatus={(moduleId) => dispatch(updateModuleStatus({ moduleId }))}
                    status={status}
                    statusLabels={statusLabels}
                  />
                );
              })}
            </ResponsiveGrid>
          </section>
        )}

        <ResourceLibrary />
      </PageContainer>
    </main>
  );
}
