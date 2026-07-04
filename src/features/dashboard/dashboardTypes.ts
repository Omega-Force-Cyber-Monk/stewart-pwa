import type { ModuleStatus } from "../appFlow/appFlowTypes";

export type { ModuleStatus };

export type DiyModule = {
  id: string;
  title: string;
  description: string;
  duration: string;
  resources: string[];
};

export type ModuleStatusLabelMap = Record<ModuleStatus, string>;
