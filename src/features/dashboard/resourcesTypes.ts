export type ResourceCategory =
  | "Marketing"
  | "Sales"
  | "Operations"
  | "Branding"
  | "Customer Service";

export type ResourceType =
  | "template"
  | "guide"
  | "checklist"
  | "script"
  | "calendar"
  | "worksheet";

export type ResourceItem = {
  id: string;
  title: string;
  description: string;
  category: ResourceCategory;
  type: ResourceType;
  featured?: boolean;
};
