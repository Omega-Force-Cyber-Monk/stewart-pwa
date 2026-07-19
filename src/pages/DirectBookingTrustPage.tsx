import { useState } from "react";
import { Play, ChevronRight, ChevronDown, FileText, UserCheck, ShieldCheck, PlaneTakeoff, DollarSign, Copy, HelpCircle, Tag, Monitor, Headset } from "lucide-react";
import ContactSupportModal from "../components/dashboard/ContactSupportModal";

export default function DirectBookingTrustPage() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const customerFears = [
    {
      title: "Will the driver show up?",
      subtitle: "Build reliability & confidence",
      icon: <UserCheck className="w-5 h-5 text-green-500" />
    },
    {
      title: "Is the driver safe?",
      subtitle: "Show safety & professionalism",
      icon: <ShieldCheck className="w-5 h-5 text-green-500" />
    },
    {
      title: "Does the driver know the airport?",
      subtitle: "Prove local expertise",
      icon: <PlaneTakeoff className="w-5 h-5 text-green-500" />
    },
    {
      title: "Will the price change?",
      subtitle: "Show transparent pricing",
      icon: <DollarSign className="w-5 h-5 text-green-500" />
    }
  ];

  const resources = [
    {
      title: "Website Copy Blocks",
      content: "Use these pre-written blocks on your homepage to immediately address the four customer fears. \"Professional, on-time airport transportation with guaranteed flat rates.\""
    },
    {
      title: "FAQ Section",
      content: "Add these 5 essential FAQs to your booking page to handle common objections before they happen."
    },
    {
      title: "Trust Badge Library",
      content: "Download our set of trust badges (Licensed, Insured, Background Checked) to place on your website and business cards."
    },
    {
      title: "Social Media Captions",
      content: "A month's worth of social media templates focused on building trust, safety, and reliability."
    },
    {
      title: "Putting It All Together (Every Touchpoint)",
      content: "A guide on how to inject trust-building language into your voicemail, text responses, and in-car experience."
    }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-[24px] font-bold text-slate-900 mb-2">
            Direct Booking Trust Framework™
          </h1>
          <p className="text-sm text-slate-500">
            Answer the four customer fears. Build trust. Get more direct bookings.
          </p>
        </div>
        
        <div className="flex items-center gap-4 shrink-0">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[14px] font-bold text-slate-700 leading-tight">Learn Proven Outreach</span>
            <span className="text-[14px] font-bold text-slate-700 leading-tight">Strategies</span>
          </div>
          <button className="flex items-center gap-2 bg-blue-50 text-blue-600 hover:bg-blue-100 px-5 py-2.5 rounded-full font-bold text-[13px] transition-colors">
            <div className="w-6 h-6 rounded-full bg-blue-200 flex items-center justify-center">
              <Play className="w-3 h-3 fill-current" />
            </div>
            Watch Guide
          </button>
        </div>
      </div>

      {/* Main Content Area (2 Columns) */}
      <div className="flex flex-col xl:flex-row gap-6 mb-6">
        
        {/* Left Column: The Four Customer Fears */}
        <div className="flex-1 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col shadow-sm">
          <h3 className="text-[17px] font-bold text-slate-900 mb-6">The Four Customer Fears</h3>
          
          <div className="flex flex-col gap-3">
            {customerFears.map((fear, idx) => (
              <div key={idx} className="flex items-center gap-4 border border-slate-100 rounded-xl p-4 bg-white shadow-sm hover:border-green-200 transition-colors">
                <div className="w-10 h-10 rounded-full bg-green-50 border border-green-100 flex items-center justify-center shrink-0">
                  {fear.icon}
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-slate-900 mb-0.5">{fear.title}</h4>
                  <p className="text-[12px] text-slate-500">{fear.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Copy & Resources */}
        <div className="flex-1 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col shadow-sm">
          <h3 className="text-[17px] font-bold text-slate-900 mb-6">Copy & Resources</h3>
          
          <div className="flex flex-col gap-3">
            {resources.map((resource, idx) => (
              <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
                <button 
                  onClick={() => toggleAccordion(idx)}
                  className="w-full bg-white hover:bg-slate-50 transition-colors p-4 flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <span className="text-[14px] font-bold text-slate-800">{resource.title}</span>
                  </div>
                  <div className="shrink-0 ml-4">
                    {openAccordion === idx ? (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                </button>
                {openAccordion === idx && (
                  <div className="p-4 bg-slate-50 border-t border-slate-200">
                    <p className="text-[13px] text-slate-600 leading-relaxed italic">
                      "{resource.content}"
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Quick Actions Section */}
      <div>
        <h3 className="text-[17px] font-bold text-slate-900 mb-4 px-1">Quick Actions</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          
          <div className="bg-white border border-slate-200 hover:border-blue-300 rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-colors cursor-pointer group shadow-sm">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 mb-3 group-hover:scale-110 transition-transform">
              <Copy className="w-5 h-5" />
            </div>
            <h4 className="text-[14px] font-bold text-slate-900">View Website Copy Blocks</h4>
          </div>

          <div className="bg-white border border-slate-200 hover:border-blue-300 rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-colors cursor-pointer group shadow-sm">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 mb-3 group-hover:scale-110 transition-transform">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h4 className="text-[14px] font-bold text-slate-900">View FAQ Section</h4>
          </div>

          <div className="bg-white border border-slate-200 hover:border-blue-300 rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-colors cursor-pointer group shadow-sm">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 mb-3 group-hover:scale-110 transition-transform">
              <Tag className="w-5 h-5" />
            </div>
            <h4 className="text-[14px] font-bold text-slate-900">View Trust Badges</h4>
          </div>

          <div className="bg-white border border-slate-200 hover:border-blue-300 rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-colors cursor-pointer group shadow-sm">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 mb-3 group-hover:scale-110 transition-transform">
              <Monitor className="w-5 h-5" />
            </div>
            <h4 className="text-[14px] font-bold text-slate-900">View Social Captions</h4>
          </div>

          <div className="bg-green-50/50 border border-green-100 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-sm">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-2">
              <Headset className="w-5 h-5" />
            </div>
            <h4 className="text-[14px] font-bold text-slate-900 mb-1">Need Help?</h4>
            <p className="text-[12px] text-slate-500 mb-4">We're here for you.</p>
            <button 
              onClick={() => setIsSupportModalOpen(true)}
              className="w-full bg-[#22c55e] hover:bg-[#1ea951] text-white px-3 py-2.5 rounded-lg font-bold text-[13px] transition-colors"
            >
              Contact Support
            </button>
          </div>

        </div>
      </div>

      <ContactSupportModal 
        isOpen={isSupportModalOpen} 
        onClose={() => setIsSupportModalOpen(false)} 
      />
    </div>
  );
}
