import { RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
