import type { PipelineStep, ProjectDeliverable } from "./dfyPipelineTypes";

export const dfyPipelineSteps: PipelineStep[] = [
  {
    id: "order_received",
    title: "Order Received",
    description: "Your Done-For-You launch order has been received and queued.",
  },
  {
    id: "business_information_review",
    title: "Business Information Review",
    description: "Your onboarding details are reviewed for positioning and setup needs.",
  },
  {
    id: "website_development",
    title: "Website Development",
    description: "Your driver page and launch website structure are being assembled.",
  },
  {
    id: "domain_connection",
    title: "Domain Connection",
    description: "Your preferred domain and public-facing web presence are prepared.",
  },
  {
    id: "booking_system_setup",
    title: "Booking System Setup",
    description: "Your booking path, inquiry flow, and client request process are configured.",
  },
  {
    id: "testing_quality_assurance",
    title: "Testing & Quality Assurance",
    description: "Your launch assets are reviewed for clarity, consistency, and readiness.",
  },
  {
    id: "final_delivery",
    title: "Final Delivery",
    description: "Your website, booking system, and launch assets are ready for handoff.",
  },
];

export const projectDeliverables: ProjectDeliverable[] = [
  {
    id: "business_website",
    title: "Business Website",
    status: "ready",
  },
  {
    id: "booking_system",
    title: "Booking System",
    status: "ready",
  },
  {
    id: "business_domain",
    title: "Business Domain",
    status: "pending",
  },
  {
    id: "marketing_assets",
    title: "Marketing Assets",
    status: "pending",
  },
  {
    id: "launch_guide",
    title: "Launch Guide",
    status: "pending",
  },
];

export const projectSummary = {
  estimatedCompletion: "2-3 Business Days",
  purchasedPackage: "Done-For-You Launch Upgrade",
};
