import { Link } from "react-router-dom";
import { LaunchProgressStepper } from "../components/dashboard/LaunchProgressStepper";
import { LaunchToolkit } from "../components/dashboard/LaunchToolkit";
import { QuickActions } from "../components/dashboard/QuickActions";
import { useGetRiderProfileQuery } from "../store/api/Auth/auth.api";
import { useGetSetupStateQuery } from "../store/api/Business/business.api";
import personalizeBanner from "../assets/personalizeBanner.png";

export default function DashboardPage() {
  const { data: profileResponse } = useGetRiderProfileQuery();
  const { data: setupResponse } = useGetSetupStateQuery();
  
  const userName = profileResponse?.user?.name || "Eleanor Pena";
  const slug = setupResponse?.data?.business?.slug || "default-business";

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto w-full flex flex-col gap-8 animate-fade-in">
      <div>
        <h1 className="text-2xl sm:text-[28px] font-bold text-slate-900 tracking-tight mb-2">
          Welcome back, {userName}!
        </h1>
        <p className="text-slate-500 text-[15px]">
          Everything you need to launch and grow your direct booking business.
        </p>
      </div>

      <LaunchProgressStepper />

      {/* Personalized Website Banner Section */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-1">
              Your Personalized Website
            </h2>
            <p className="text-sm text-slate-500">
              Preview your direct booking landing page, tailored to your service area and business brand.
            </p>
          </div>
          <Link
            to={`/book/${slug}`}
            target="_blank"
            className="bg-[#22c55e] hover:bg-[#1ea951] text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-colors text-center shrink-0"
          >
            Open Website
          </Link>
        </div>
        <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm bg-slate-50">
          <img 
            src={personalizeBanner} 
            alt="Personalized Booking Banner" 
            className="w-full h-auto object-cover max-h-[480px]"
          />
        </div>
      </div>

      <LaunchToolkit />
      <QuickActions />
    </div>
  );
}
