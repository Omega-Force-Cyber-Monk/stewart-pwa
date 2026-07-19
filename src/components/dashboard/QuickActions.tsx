import { Eye, Download, Forward, QrCode } from "lucide-react";
import { cn } from "../../lib/cn";

const quickActions = [
  {
    title: "View Your Selling Page",
    description: "Preview your selling page.",
    icon: Eye,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    title: "Download Referral Card",
    description: "Download a printable referral card with QR code.",
    icon: Download,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    title: "Share Your Page",
    description: "Copy and share your booking page link.",
    icon: Forward,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    title: "View QR Code",
    description: "Preview or download your business QR code.",
    icon: QrCode,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
  },
];

export function QuickActions() {
  return (
    <div className="mt-10 mb-10">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-900 mb-1">Quick Actions</h2>
        <p className="text-sm text-slate-500">
          Frequently used shortcuts to help manage your business faster.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <button
            key={index}
            className="bg-white rounded-xl p-5 flex items-start gap-4 border border-slate-100 shadow-sm hover:shadow-md transition-shadow text-left group"
          >
            <div
              className={cn(
                "p-2.5 rounded-full shrink-0 group-hover:scale-110 transition-transform",
                action.iconBg
              )}
            >
              <action.icon className={cn("w-5 h-5", action.iconColor)} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-1 leading-tight">
                {action.title}
              </h3>
              <p className="text-[13px] text-slate-500 leading-snug">
                {action.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
