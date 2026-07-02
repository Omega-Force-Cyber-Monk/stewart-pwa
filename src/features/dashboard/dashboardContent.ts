import type { DfyPipelineStep, ModuleKey } from "../appFlow/appFlowSlice";

export const dashboardModules: Array<{
  key: ModuleKey;
  title: string;
  description: string;
}> = [
  {
    key: "businessSetup",
    title: "Business setup",
    description: "Define your offer, service area, pricing logic, and operating basics.",
  },
  {
    key: "vehicleReadiness",
    title: "Vehicle readiness",
    description: "Prepare inspection, comfort, safety, and presentation standards.",
  },
  {
    key: "localMarketing",
    title: "Local marketing",
    description: "Build outreach scripts, referral targets, and local trust signals.",
  },
  {
    key: "dispatchSystems",
    title: "Dispatch systems",
    description: "Shape booking, scheduling, payment, and client communication workflows.",
  },
  {
    key: "launchChecklist",
    title: "Launch checklist",
    description: "Confirm assets, first-client actions, and weekly operating rhythm.",
  },
];

export const dfyPipeline: Array<{
  key: DfyPipelineStep;
  title: string;
  description: string;
}> = [
  {
    key: "intake",
    title: "Intake review",
    description: "Your launch details are reviewed and organized for buildout.",
  },
  {
    key: "business-buildout",
    title: "Business buildout",
    description: "Offer structure, positioning, and operating assets are drafted.",
  },
  {
    key: "asset-prep",
    title: "Asset preparation",
    description: "Client-facing materials and launch checklists are prepared.",
  },
  {
    key: "launch-handoff",
    title: "Launch handoff",
    description: "Your delivery package is reviewed and handed over.",
  },
  {
    key: "complete",
    title: "Complete",
    description: "Your DFY launch package is complete.",
  },
];
