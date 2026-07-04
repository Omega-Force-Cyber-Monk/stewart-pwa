import { CurrentStageCard } from "./CurrentStageCard";
import { DeliverablesSection } from "./DeliverablesSection";
import { PipelineStageSelector } from "./PipelineStageSelector";
import { PipelineTimeline } from "./PipelineTimeline";
import { ProjectSummary } from "./ProjectSummary";
import {
  dfyPipelineSteps,
  projectDeliverables,
  projectSummary,
} from "../../features/dashboard/dfyPipelineData";

type DFYPipelineProps = {
  currentStep: number;
  onStageChange: (stepIndex: number) => void;
};

export function DFYPipeline({ currentStep, onStageChange }: DFYPipelineProps) {
  const safeCurrentStep = Math.min(
    Math.max(currentStep, 0),
    dfyPipelineSteps.length - 1,
  );
  const currentStage = dfyPipelineSteps[safeCurrentStep];
  const isComplete = safeCurrentStep === dfyPipelineSteps.length - 1;

  return (
    <section className="mt-8 grid gap-5">
      <ProjectSummary
        currentStage={currentStage.title}
        estimatedCompletion={projectSummary.estimatedCompletion}
        purchasedPackage={projectSummary.purchasedPackage}
      />
      <PipelineStageSelector
        currentStep={safeCurrentStep}
        onChange={onStageChange}
        steps={dfyPipelineSteps}
      />
      {isComplete && <CurrentStageCard />}
      <PipelineTimeline currentStep={safeCurrentStep} steps={dfyPipelineSteps} />
      <DeliverablesSection deliverables={projectDeliverables} />
    </section>
  );
}
