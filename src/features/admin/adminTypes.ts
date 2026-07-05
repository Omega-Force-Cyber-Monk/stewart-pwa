export type OwnerPlan = "DIY" | "DFY";

export type OwnerStatus = "active" | "onboarding" | "attention" | "paused";

export type FulfillmentStatus = "not_started" | "in_progress" | "blocked" | "delivered";

export type WebsiteStatus = "draft" | "live" | "needs_review";

export type AcuityStatus = "not_connected" | "connected" | "needs_review";

export type BusinessOwner = {
  id: string;
  ownerName: string;
  businessName: string;
  city: string;
  airports: string;
  domain: string;
  plan: OwnerPlan;
  status: OwnerStatus;
  websiteStatus: WebsiteStatus;
  acuityStatus: AcuityStatus;
  launchProgress: number;
  supportTickets: number;
  joinedAt: string;
};

export type FulfillmentTask = {
  id: string;
  ownerName: string;
  title: string;
  status: FulfillmentStatus;
  dueDate: string;
};
