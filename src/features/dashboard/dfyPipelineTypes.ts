export type PipelineStatus = "pending" | "active" | "completed";

export type PipelineStep = {
  id: string;
  title: string;
  description: string;
};

export type DeliverableStatus = "pending" | "ready";

export type ProjectDeliverable = {
  id: string;
  title: string;
  status: DeliverableStatus;
};
