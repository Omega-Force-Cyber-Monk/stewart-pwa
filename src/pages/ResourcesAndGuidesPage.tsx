import { useState } from "react";
import { Play, ChevronRight, ChevronDown, FileText, UserCheck, ShieldCheck, PlaneTakeoff, DollarSign, Copy, HelpCircle, Tag, Monitor } from "lucide-react";

export default function ResourcesAndGuidesPage() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const customerFears = [
    {
      title: "Will the driver show up?",
      subtitle: "Build confidence with reliable, on-time airport transportation.",
      icon: <UserCheck className="w-5 h-5 text-green-500" />
    },
    {
      title: "Is the driver safe?",
      subtitle: "Highlight verified drivers, professionalism, and safety standards.",
      icon: <ShieldCheck className="w-5 h-5 text-green-500" />
    },
    {
      title: "Does the driver know the airport?",
      subtitle: "Show local expertise with reliable airport pickup and drop-off experience.",
      icon: <PlaneTakeoff className="w-5 h-5 text-green-500" />
    },
    {
      title: "Will the price change?",
      subtitle: "Provide transparent, upfront pricing with no hidden surprises.",
      icon: <DollarSign className="w-5 h-5 text-green-500" />
    }
  ];

  const resources = [
    {
      title: "Website Copy Blocks",
      subtitle: "Ready-to-use website content that helps convert visitors into customers.",
      content: "Use these pre-written blocks on your homepage to immediately address the four customer fears. \"Professional, on-time airport transportation with guaranteed flat rates.\""
    },
    {
      title: "FAQ Section",
      subtitle: "Answer common questions and build trust before customers book.",
      content: "Add these 5 essential FAQs to your booking page to handle common objections before they happen."
    },
    {
      title: "Trust Badge Library",
      subtitle: "Professional trust badges to increase credibility and confidence.",
      content: "Download our set of trust badges (Licensed, Insured, Background Checked) to place on your website and business cards."
    },
    {
      title: "Social Media Captions",
      subtitle: "Pre-written captions to promote your business across social platforms.",
      content: "A month's worth of social media templates focused on building trust, safety, and reliability."
    },
    {
      title: "Putting It All Together (Every Touchpoint)",
      subtitle: "A complete guide to creating a consistent customer experience from first contact to repeat bookings.",
      content: "A guide on how to inject trust-building language into your voicemail, text responses, and in-car experience."
    }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-[24px] font-bold text-slate-900 mb-2">
            Resources & Guides
          </h1>
          <p className="text-sm text-slate-500 max-w-3xl">
            Access step-by-step guides, scripts, templates, and downloadable resources designed to help you attract more customers and increase direct bookings.
          </p>
        </div>
        
        <div className="flex items-center gap-4 shrink-0">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[14px] font-bold text-slate-700 leading-tight">Learn Proven Outreach</span>
            <span className="text-[14px] font-bold text-slate-700 leading-tight">Strategies</span>
          </div>
          <button className="flex items-center gap-2 bg-green-50 text-green-600 hover:bg-green-100 px-5 py-2.5 rounded-full font-bold text-[13px] transition-colors">
            <div className="w-6 h-6 rounded-full bg-green-200 flex items-center justify-center">
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
                      {idx === 0 && <FileText className="w-4 h-4" />}
                      {idx === 1 && <HelpCircle className="w-4 h-4" />}
                      {idx === 2 && <Tag className="w-4 h-4" />}
                      {idx === 3 && <Monitor className="w-4 h-4" />}
                      {idx === 4 && <UserCheck className="w-4 h-4" />}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-slate-800">{resource.title}</span>
                      <span className="text-[12px] text-slate-500">{resource.subtitle}</span>
                    </div>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-white border border-slate-200 hover:border-blue-300 rounded-2xl p-6 flex flex-col items-start justify-center transition-colors cursor-pointer group shadow-sm h-32">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 mb-4 group-hover:scale-110 transition-transform">
              <Copy className="w-5 h-5" />
            </div>
            <h4 className="text-[14px] font-bold text-slate-900">Website Copy Blocks</h4>
          </div>

          <div className="bg-white border border-slate-200 hover:border-blue-300 rounded-2xl p-6 flex flex-col items-start justify-center transition-colors cursor-pointer group shadow-sm h-32">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 mb-4 group-hover:scale-110 transition-transform">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h4 className="text-[14px] font-bold text-slate-900">FAQ Section</h4>
          </div>

          <div className="bg-white border border-slate-200 hover:border-blue-300 rounded-2xl p-6 flex flex-col items-start justify-center transition-colors cursor-pointer group shadow-sm h-32">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 mb-4 group-hover:scale-110 transition-transform">
              <Tag className="w-5 h-5" />
            </div>
            <h4 className="text-[14px] font-bold text-slate-900">Trust Badges</h4>
          </div>

          <div className="bg-white border border-slate-200 hover:border-blue-300 rounded-2xl p-6 flex flex-col items-start justify-center transition-colors cursor-pointer group shadow-sm h-32">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 mb-4 group-hover:scale-110 transition-transform">
              <Monitor className="w-5 h-5" />
            </div>
            <h4 className="text-[14px] font-bold text-slate-900">Social Captions</h4>
          </div>

        </div>
      </div>

    </div>
  );
}
