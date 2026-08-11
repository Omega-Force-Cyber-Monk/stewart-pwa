import { useState } from "react";
import { Building2, ShieldCheck, IdCard, Building, Calculator, FileText, CheckCircle2, Phone, Mail, Loader2 } from "lucide-react";
import insurancePromo from "../assets/insurancePromo.png";
import { useGetChecklistItemsQuery, useUpdateChecklistItemMutation } from "../store/api/Business/business.api";

export default function LaunchEssentialsPage() {
  const [checklistLoadingId, setChecklistLoadingId] = useState<string | null>(null);

  const { data: acqData, isLoading: isLoadingAcq } = useGetChecklistItemsQuery({ step: "CUSTOMER_ACQUISITION" });
  const { data: brandData, isLoading: isLoadingBrand } = useGetChecklistItemsQuery({ step: "BRAND_AND_TRUST" });
  const [updateChecklistItem] = useUpdateChecklistItemMutation();

  const checklistItems = [
    ...(acqData?.checklistItems ?? []),
    ...(brandData?.checklistItems ?? []),
  ];

  const completedCount = checklistItems.filter((item) => item.completed).length;
  const totalCount = checklistItems.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const handleToggle = async (id: string, completed: boolean) => {
    setChecklistLoadingId(id);
    try {
      await updateChecklistItem({ id, completed: !completed }).unwrap();
    } catch (err) {
      console.error("Checklist update failed:", err);
    } finally {
      setChecklistLoadingId(null);
    }
  };

  const topCards = [
    { title: "Business Registration", subtitle: "Choose your business structure, register your name, and get started the right way.", icon: <Building2 className="w-8 h-8 text-blue-500" />, bg: "bg-blue-50", border: "border-blue-100" },
    { title: "Transportation Insurance", subtitle: "Protect your business, your vehicle, and your passengers with the right coverage.", icon: <ShieldCheck className="w-8 h-8 text-green-500" />, bg: "bg-green-50", border: "border-green-100" },
    { title: "Licensing & Permits", subtitle: "Understand state, county, and airport requirements for your service area.", icon: <IdCard className="w-8 h-8 text-purple-500" />, bg: "bg-purple-50", border: "border-purple-100" },
    { title: "Banking & Payments", subtitle: "Open a business bank account and set up payment processing with confidence.", icon: <Building className="w-8 h-8 text-yellow-500" />, bg: "bg-yellow-50", border: "border-yellow-100" },
    { title: "Taxes & Finances", subtitle: "Understand your tax responsibilities and keep your business finances organized.", icon: <Calculator className="w-8 h-8 text-teal-500" />, bg: "bg-teal-50", border: "border-teal-100" },
    { title: "Business Protection", subtitle: "Contracts, disclaimers, privacy, and other protections for your business.", icon: <FileText className="w-8 h-8 text-indigo-500" />, bg: "bg-indigo-50", border: "border-indigo-100" },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[24px] font-bold text-slate-900 mb-2">
          Launch Essentials™
        </h1>
        <p className="text-sm text-slate-500">
          Everything you need to start your transportation business the right way.
        </p>
      </div>

      {/* Top Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {topCards.map((card, idx) => (
          <div key={idx} className={`flex flex-col items-center text-center p-6 rounded-3xl border ${card.bg} ${card.border} shadow-sm`}>
            <div className="mb-4">
              {card.icon}
            </div>
            <h3 className="text-[14px] font-bold text-slate-900 mb-2 leading-tight">
              {card.title}
            </h3>
            <p className="text-[12px] text-slate-500 leading-relaxed">
              {card.subtitle}
            </p>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex flex-col xl:flex-row gap-8">
        
        {/* Left Column: Launch Checklist */}
        <div className="flex-1 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[18px] font-bold text-slate-900">Your Launch Checklist</h3>
            <span className="text-[12px] font-bold text-green-600">{completedCount} of {totalCount} Completed</span>
          </div>
          <p className="text-[13px] text-slate-500 mb-4">Complete these essentials before accepting your first direct booking.</p>
          
          <div className="w-full h-2.5 bg-green-100 rounded-full mb-8 overflow-hidden">
            <div 
              className="h-full bg-green-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          {(isLoadingAcq || isLoadingBrand) ? (
            <div className="flex items-center justify-center py-10 text-slate-400">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          ) : (
          <div className="flex flex-col gap-3">
            {checklistItems.length === 0 && (
              <p className="text-[13px] text-slate-500 text-center py-6">
                No checklist items available yet.
              </p>
            )}
            {checklistItems.map((item) => (
              <div 
                key={item.id} 
                onClick={() => handleToggle(item.id, item.completed)}
                className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl hover:border-blue-200 cursor-pointer transition-colors shadow-sm bg-white group"
              >
                <div className="flex items-center gap-4">
                  {checklistLoadingId === item.id ? (
                    <Loader2 className="w-8 h-8 text-green-500 animate-spin shrink-0" />
                  ) : item.completed ? (
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white shrink-0 shadow-sm">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full border-2 border-slate-200 flex items-center justify-center shrink-0" />
                  )}
                  
                  <div>
                    <h4 className="text-[14px] font-bold text-slate-900 mb-0.5">{item.title}</h4>
                    <p className="text-[12px] text-slate-500">{item.description}</p>
                  </div>
                </div>

                <div className="shrink-0 ml-4">
                  {item.completed ? (
                    <span className="px-3 py-1 rounded-md border border-green-200 text-green-600 text-[12px] font-bold bg-green-50">
                      Complete
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-md border border-slate-200 text-slate-500 text-[12px] font-bold bg-slate-50">
                      Not Started
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          )}
        </div>

        {/* Right Column */}
        <div className="flex-1 max-w-[600px] flex flex-col gap-6">
          
          {/* Insurance Help Center */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
            <h3 className="text-[16px] font-bold text-slate-900 mb-2">Insurance Help Center</h3>
            <p className="text-[13px] text-slate-500 mb-6 leading-relaxed">
              The #1 question drivers ask. Let a transportation insurance specialist help you understand your options.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start mb-6">
              <div className="flex-1 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[13.5px] text-slate-700">Commercial & livery insurance options</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[13.5px] text-slate-700">Coverage for airport and local trips</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[13.5px] text-slate-700">Cost factors and ways to save</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[13.5px] text-slate-700">Fast, friendly, and confidential</span>
                </div>
              </div>

              <div className="w-full sm:w-[220px] shrink-0 rounded-2xl overflow-hidden border border-slate-100 shadow-sm bg-blue-50/30">
                <img src={insurancePromo} alt="Insurance protection" className="w-full h-auto mix-blend-multiply" />
              </div>
            </div>

            <div className="flex flex-col items-center">
              <button className="bg-[#0f4eb8] hover:bg-[#0c3e93] text-white px-8 py-3 rounded-lg font-bold text-[14px] transition-colors shadow-sm mb-2">
                Connect With a Specialist
              </button>
              <p className="text-[12px] text-slate-500">No obligation. Just answers.</p>
            </div>
          </div>

          {/* Need Help Getting Started */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[17px] font-bold text-slate-900 px-1">Need Help Getting Started?</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              
              <div className="flex-1 bg-[#f4f7fb] hover:bg-[#eaf0f7] border border-[#e5ecf5] rounded-3xl p-6 flex flex-col items-center justify-center text-center transition-colors shadow-sm cursor-pointer group">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <h4 className="text-[15px] font-bold text-slate-900 mb-1">Book a Call</h4>
                <p className="text-[13px] text-slate-500">0000-1130-334</p>
              </div>

              <div className="flex-1 bg-[#f4f7fb] hover:bg-[#eaf0f7] border border-[#e5ecf5] rounded-3xl p-6 flex flex-col items-center justify-center text-center transition-colors shadow-sm cursor-pointer group">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <h4 className="text-[15px] font-bold text-slate-900 mb-1">Email Support</h4>
                <p className="text-[13px] text-slate-500">We typically reply within 24 hours.</p>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
