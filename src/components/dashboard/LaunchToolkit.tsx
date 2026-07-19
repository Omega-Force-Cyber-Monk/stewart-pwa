import { CreditCard, Building2, CalendarDays, UserSquare2, BookOpen, ArrowRight } from "lucide-react";
import { cn } from "../../lib/cn";

const toolkitItems = [
  {
    title: "Referral Card System™",
    description: "Create and manage your referral cards, QR codes, and sharing materials.",
    icon: CreditCard,
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
    buttonText: "Open Tool",
  },
  {
    title: "Customer Acquisition System™",
    description: "Access outreach tools, partner resources, and customer growth strategies.",
    icon: Building2,
    bgColor: "bg-blue-50",
    iconColor: "text-blue-500",
    buttonText: "Open Tool",
  },
  {
    title: "Quick Launch Booking System™",
    description: "Manage booking preferences, availability, and customer scheduling.",
    icon: CalendarDays,
    bgColor: "bg-pink-50",
    iconColor: "text-pink-500",
    buttonText: "Open Tool",
  },
  {
    title: "Personalized Selling Page™",
    description: "Customize and share your personal booking page with customers.",
    icon: UserSquare2,
    bgColor: "bg-yellow-50",
    iconColor: "text-yellow-500",
    buttonText: "View Page",
  },
  {
    title: "Resources & Guides",
    description: "Browse training materials, business templates, and helpful documentation.",
    icon: BookOpen,
    bgColor: "bg-slate-50",
    iconColor: "text-slate-600",
    buttonText: "Open Library",
  },
];

export function LaunchToolkit() {
  return (
    <div className="mt-10">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900 mb-1">Your Launch Toolkit</h2>
        <p className="text-sm text-slate-500">
          Everything you need to run, promote, and grow your booking business.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {toolkitItems.map((item, index) => (
          <div
            key={index}
            className={cn(
              "rounded-2xl p-6 flex flex-col items-center text-center transition-transform hover:-translate-y-1",
              item.bgColor
            )}
          >
            <item.icon className={cn("w-10 h-10 mb-4", item.iconColor)} strokeWidth={1.5} />
            <h3 className="text-[15px] font-bold text-slate-900 mb-3 leading-tight">
              {item.title}
            </h3>
            <p className="text-xs text-slate-500 mb-6 flex-1">
              {item.description}
            </p>
            <button className="w-full bg-white flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold text-slate-900 shadow-sm hover:bg-slate-50 transition-colors">
              {item.buttonText}
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
