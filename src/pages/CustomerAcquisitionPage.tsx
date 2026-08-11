import { useState } from "react";
import { FolderSearch, FileText, Printer, CheckCircle2, Download, Loader2 } from "lucide-react";
import ContactSupportModal from "../components/dashboard/ContactSupportModal";
import { useGetBusinessResourcesQuery, useGetChecklistItemsQuery, useLazyDownloadBusinessResourceQuery } from "../store/api/Business/business.api";
import type { BusinessResource, ChecklistItem } from "../store/api/Business/business.type";

const iconByType: Record<string, React.ReactNode> = {
  PDF_DOCUMENT: <FileText className="w-6 h-6 text-green-500" />,
  WORD_DOCUMENT: <FileText className="w-6 h-6 text-blue-500" />,
  IMAGE: <Printer className="w-6 h-6 text-purple-500" />,
};

const bgByIndex = [
  "bg-blue-50/50 border-blue-100",
  "bg-green-50/50 border-green-100",
  "bg-purple-50/50 border-purple-100",
  "bg-yellow-50/50 border-yellow-100",
  "bg-teal-50/50 border-teal-100",
  "bg-indigo-50/50 border-indigo-100",
  "bg-cyan-50/50 border-cyan-100",
  "bg-gray-50 border-gray-200",
];

export default function CustomerAcquisitionPage() {
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const { data: resourcesData, isLoading: isLoadingResources } =
    useGetBusinessResourcesQuery({ step: "CUSTOMER_ACQUISITION" });
  const { data: checklistData, isLoading: isLoadingChecklist } =
    useGetChecklistItemsQuery({ step: "CUSTOMER_ACQUISITION" });
  const [downloadResource] = useLazyDownloadBusinessResourceQuery();

  const resourceCards: BusinessResource[] = resourcesData?.resources ?? [];
  const checklistItems: ChecklistItem[] = checklistData?.checklistItems ?? [];

  const handleDownload = async (resource: BusinessResource) => {
    setDownloadingId(resource.id);
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
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-[24px] font-bold text-slate-900 mb-2">
            Customer Acquisition™
          </h1>
          <p className="text-sm text-slate-500">
            Build relationships with hotels, medical offices, and local businesses.
          </p>
        </div>
        
      </div>

      {/* Resource Cards Grid */}
      {isLoadingResources ? (
        <div className="flex items-center justify-center py-12 text-slate-400">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {resourceCards.length === 0 && (
          <p className="text-[13px] text-slate-500 col-span-full text-center py-8">
            No customer acquisition resources uploaded yet.
          </p>
        )}
        {resourceCards.map((card, idx) => (
          <div 
            key={card.id} 
            className={`flex flex-col items-center text-center p-6 sm:p-8 rounded-3xl border ${bgByIndex[idx % bgByIndex.length]}`}
          >
            <div className="mb-4">
              {iconByType[card.type] ?? <FolderSearch className="w-6 h-6 text-blue-500" />}
            </div>
            <h3 className="text-[15px] font-bold text-slate-900 mb-2">
              {card.title}
            </h3>
            <p className="text-[13px] text-slate-500 leading-relaxed mb-4">
              {card.description}
            </p>
            <button
              onClick={() => handleDownload(card)}
              disabled={downloadingId === card.id}
              className="mt-auto bg-[#22c55e] hover:bg-[#1ea951] text-white px-4 py-2 rounded-lg font-bold text-[12px] transition-colors flex items-center gap-1.5 disabled:opacity-60"
            >
              {downloadingId === card.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              Download
            </button>
          </div>
        ))}
      </div>
      )}

      {/* Launch Checklist Guide & Need Help */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col shadow-sm">
        <h3 className="text-[17px] font-bold text-slate-900 mb-6">Launch Checklist Guide</h3>
        
        <div className="flex flex-col xl:flex-row gap-8 xl:gap-12">
          
          {/* Checklist (Left) */}
          <div className="flex-1 flex flex-col gap-3">
            {isLoadingChecklist ? (
              <div className="flex items-center justify-center py-6 text-slate-400">
                <Loader2 className="w-5 h-5 animate-spin" />
              </div>
            ) : checklistItems.length === 0 ? (
              <p className="text-[13px] text-slate-500 text-center py-6">
                No checklist items yet.
              </p>
            ) : (
              checklistItems.map((item) => (
                <div key={item.id} className={`flex items-center gap-4 border rounded-xl p-4 bg-white shadow-sm ${item.completed ? "border-green-200 bg-green-50/40" : "border-slate-100"}`}>
                  <CheckCircle2 className={`w-6 h-6 shrink-0 ${item.completed ? "text-green-500" : "text-slate-300"}`} />
                  <div>
                    <h4 className="text-[14px] font-bold text-slate-900 mb-0.5">{item.title}</h4>
                    <p className="text-[12px] text-slate-500">{item.description}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Need Help Card (Right) */}
          <div className="w-full xl:w-[350px] shrink-0 bg-green-50/50 border border-green-100 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-sm h-fit">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-4">
              <FolderSearch className="w-5 h-5" />
            </div>
            <h4 className="text-[15px] font-bold text-slate-900 mb-1">Need Help?</h4>
            <p className="text-[13px] text-slate-500 mb-6">We're here for you.</p>
            <button 
              onClick={() => setIsSupportModalOpen(true)}
              className="w-full bg-[#22c55e] hover:bg-[#1ea951] text-white px-4 py-3 rounded-xl font-bold text-[14px] transition-colors"
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
