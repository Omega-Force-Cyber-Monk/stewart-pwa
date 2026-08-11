import { useState } from "react";
import { ChevronRight, ChevronDown, FileText, UserCheck, ShieldCheck, PlaneTakeoff, DollarSign, Copy, HelpCircle, Tag, Monitor, Download, Loader2 } from "lucide-react";
import { useGetBusinessResourcesQuery, useLazyDownloadBusinessResourceQuery } from "../store/api/Business/business.api";
import type { BusinessResource } from "../store/api/Business/business.type";

export default function ResourcesAndGuidesPage() {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const { data: resourcesData, isLoading } = useGetBusinessResourcesQuery();
  const [downloadResource, { isFetching: isDownloading }] = useLazyDownloadBusinessResourceQuery();

  const resources: BusinessResource[] = resourcesData?.resources ?? [];

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const handleDownload = async (resource: BusinessResource) => {
    try {
      const blob = await downloadResource(resource.id).unwrap();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = resource.fileUrl.split("/").pop() || `${resource.title}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
    }
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
          
          {isLoading ? (
            <div className="flex items-center justify-center py-8 text-slate-400">
              <Loader2 className="w-5 h-5 animate-spin" />
            </div>
          ) : (
          <div className="flex flex-col gap-3">
            {resources.length === 0 && (
              <p className="text-[13px] text-slate-500 text-center py-6">
                No resources available yet.
              </p>
            )}
            {resources.map((resource) => (
              <div key={resource.id} className="border border-slate-200 rounded-xl overflow-hidden">
                <button 
                  onClick={() => toggleAccordion(resource.id)}
                  className="w-full bg-white hover:bg-slate-50 transition-colors p-4 flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-slate-800">{resource.title}</span>
                      <span className="text-[12px] text-slate-500">{resource.description}</span>
                    </div>
                  </div>
                  <div className="shrink-0 ml-4">
                    {openAccordion === resource.id ? (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                </button>
                {openAccordion === resource.id && (
                  <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-4">
                    <p className="text-[13px] text-slate-600 leading-relaxed italic">
                      {resource.type.replace(/_/g, " ").toLowerCase()} — {resource.step.replace(/_/g, " ").toLowerCase()}
                    </p>
                    <button
                      onClick={() => handleDownload(resource)}
                      disabled={isDownloading}
                      className="shrink-0 bg-[#22c55e] hover:bg-[#1ea951] text-white px-4 py-2 rounded-lg font-bold text-[12px] transition-colors flex items-center gap-1.5 disabled:opacity-60"
                    >
                      {isDownloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                      Download
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
          )}
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
