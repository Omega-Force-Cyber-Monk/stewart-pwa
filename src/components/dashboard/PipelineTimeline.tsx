import { PipelineStepCard } from "./PipelineStepCard";
import { DashboardCard } from "../layout/DashboardCard";
import type {
  PipelineStatus,
  PipelineStep,
} from "../../features/dashboard/dfyPipelineTypes";

type PipelineTimelineProps = {
  currentStep: number;
  steps: PipelineStep[];
};

function getPipelineStatus(index: number, currentStep: number): PipelineStatus {
  if (index < currentStep) return "completed";
  if (index === currentStep) return "active";
  return "pending";
}

export function PipelineTimeline({ currentStep, steps }: PipelineTimelineProps) {
  return (
    <DashboardCard as="section" className="overflow-hidden" aria-label="Done-For-You project timeline">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-slate-950">Delivery Timeline</h2>
        <p className="mt-1 text-sm text-slate-600">
          Track completed, current, and upcoming delivery stages.
        </p>
      </div>

      <ol className="grid gap-4 lg:grid-cols-7">
        {steps.map((step, index) => (
          <li className="relative" key={step.id}>
            {index < steps.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute left-5 top-14 h-[calc(100%+1rem)] w-px bg-slate-200 lg:left-auto lg:right-[-0.5rem] lg:top-5 lg:h-px lg:w-[1rem]"
              />
            )}
            <PipelineStepCard
              status={getPipelineStatus(index, currentStep)}
              step={step}
              stepNumber={index + 1}
            />
          </li>
        ))}
      </ol>
    </DashboardCard>
  );
}
