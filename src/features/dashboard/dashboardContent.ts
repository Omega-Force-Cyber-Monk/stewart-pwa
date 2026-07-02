export const dashboardModules: Array<{
  key: string;
  title: string;
  description: string;
}> = [
  {
    key: "business_basics",
    title: "Business basics",
    description: "Define your offer, service area, pricing logic, and operating basics.",
  },
  {
    key: "driver_page_setup",
    title: "Driver page setup",
    description: "Prepare the public-facing page that explains your local transport offer.",
  },
  {
    key: "booking_tool_setup",
    title: "Booking tool setup",
    description: "Shape booking, scheduling, payment, and client communication workflows.",
  },
  {
    key: "first_customer_outreach",
    title: "First customer outreach",
    description: "Build outreach scripts, referral targets, and first-client action steps.",
  },
  {
    key: "review_referral_engine",
    title: "Review referral engine",
    description: "Create a repeatable system for testimonials, reviews, and referrals.",
  },
  {
    key: "repeat_rider_systems",
    title: "Repeat rider systems",
    description: "Set up follow-up habits that turn single rides into recurring clients.",
  },
  {
    key: "b2b_scale_growth",
    title: "B2B scale growth",
    description: "Plan partnerships with local businesses, care providers, and organizations.",
  },
];

export const dfyPipeline: Array<{
  step: number;
  title: string;
  description: string;
}> = [
  {
    step: 0,
    title: "Intake review",
    description: "Your launch details are reviewed and organized for buildout.",
  },
  {
    step: 1,
    title: "Business buildout",
    description: "Offer structure, positioning, and operating assets are drafted.",
  },
  {
    step: 2,
    title: "Asset preparation",
    description: "Client-facing materials and launch checklists are prepared.",
  },
  {
    step: 3,
    title: "Local launch setup",
    description: "Your launch plan is matched to target city, airports, and local niches.",
  },
  {
    step: 4,
    title: "Launch handoff",
    description: "Your delivery package is reviewed and handed over.",
  },
  {
    step: 5,
    title: "Complete",
    description: "Your DFY launch package is complete.",
  },
];
