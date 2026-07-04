import type { DiyModule } from "./dashboardTypes";

export const diyModules: DiyModule[] = [
  {
    id: "business_basics",
    title: "Business Basics",
    description:
      "Define your transportation offer, service area, operating rules, and launch priorities.",
    duration: "35 min",
    resources: ["PDF Guide", "Checklist", "Templates", "Video Lesson"],
  },
  {
    id: "driver_page_setup",
    title: "Driver Page Setup",
    description:
      "Prepare a simple client-facing page that explains your service, trust signals, and booking path.",
    duration: "45 min",
    resources: ["Page Copy Template", "Photo Checklist", "Trust Badge Guide"],
  },
  {
    id: "booking_tool_setup",
    title: "Booking Tool Setup",
    description:
      "Choose a booking workflow and map the steps riders need to request private transportation.",
    duration: "40 min",
    resources: ["Booking Checklist", "Tool Comparison", "Setup Walkthrough"],
  },
  {
    id: "first_customer_outreach",
    title: "First Customer Outreach",
    description:
      "Build your first direct outreach list and use scripts to start conversations with local buyers.",
    duration: "30 min",
    resources: ["Outreach Scripts", "Prospect Tracker", "Follow-up Template"],
  },
  {
    id: "review_referral_engine",
    title: "Review & Referral Engine",
    description:
      "Create a repeatable process for asking happy riders for reviews, referrals, and testimonials.",
    duration: "25 min",
    resources: ["Review Request Script", "Referral Card", "Testimonial Prompt"],
  },
  {
    id: "repeat_rider_systems",
    title: "Repeat Rider Systems",
    description:
      "Set up simple follow-up rhythms that turn one-time rides into recurring private clients.",
    duration: "35 min",
    resources: ["Retention Checklist", "Message Templates", "Rider Notes Sheet"],
  },
  {
    id: "b2b_scale_growth",
    title: "B2B Scale Growth",
    description:
      "Identify local partner channels and plan outreach to organizations that need recurring rides.",
    duration: "50 min",
    resources: ["B2B Partner List", "Pitch Script", "Pipeline Tracker"],
  },
];
