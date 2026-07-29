import { useState } from "react";
import { FolderSearch, FileText, Mail, Printer, Headset, CheckCircle2, FileSpreadsheet, FileOutput } from "lucide-react";
import ContactSupportModal from "../components/dashboard/ContactSupportModal";

export default function CustomerAcquisitionPage() {
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const resourceCards = [
    {
      title: "Hotel & Local Partner Outreach Kit™",
      description: "Everything you need to confidently approach hotels, medical offices, and local businesses for referral partnerships.",
      icon: <FolderSearch className="w-6 h-6 text-blue-500" />,
      bg: "bg-blue-50/50",
      border: "border-blue-100",
      textColor: "text-blue-500",
    },
    {
      title: "Partner List Worksheet",
      description: "Organize and track potential referral partners in your area with an easy-to-use planning worksheet.",
      icon: <FileText className="w-6 h-6 text-green-500" />,
      bg: "bg-green-50/50",
      border: "border-green-100",
      textColor: "text-green-500",
    },
    {
      title: "Front Desk Script",
      description: "Use this ready-made conversation script to confidently introduce your services to hotel front desk staff.",
      icon: <Printer className="w-6 h-6 text-purple-500" />,
      bg: "bg-purple-50/50",
      border: "border-purple-100",
      textColor: "text-purple-500",
    },
    {
      title: "Hotel Manager Email",
      description: "A professional email template for introducing your transportation services to hotel managers.",
      icon: <Mail className="w-6 h-6 text-yellow-500" />,
      bg: "bg-yellow-50/50",
      border: "border-yellow-100",
      textColor: "text-yellow-500",
    },
    {
      title: "Local Partner Email",
      description: "Reach out to local businesses with a ready-to-use partnership email template.",
      icon: <Mail className="w-6 h-6 text-teal-500" />,
      bg: "bg-teal-50/50",
      border: "border-teal-100",
      textColor: "text-teal-500",
    },
    {
      title: "One-Page Partner Flyer",
      description: "A printable one-page flyer that highlights your services and encourages referral partnerships.",
      icon: <FileText className="w-6 h-6 text-indigo-500" />,
      bg: "bg-indigo-50/50",
      border: "border-indigo-100",
      textColor: "text-indigo-500",
    },
    {
      title: "Partner Tracking Sheet",
      description: "Track visits, follow-ups, referrals, and partner relationships in one organized place.",
      icon: <FileSpreadsheet className="w-6 h-6 text-cyan-500" />,
      bg: "bg-cyan-50/50",
      border: "border-cyan-100",
      textColor: "text-cyan-500",
    },
    {
      title: "Referral Thank-You System",
      description: "Send personalized thank-you messages to strengthen relationships and encourage more referrals.",
      icon: <FileOutput className="w-6 h-6 text-gray-500" />,
      bg: "bg-gray-50",
      border: "border-gray-200",
      textColor: "text-gray-500",
    },
  ];

  const checklistItems = [
    {
      title: "Build your partner list",
      description: "Create a list of hotels, medical offices, and local businesses you want to connect with.",
    },
    {
      title: "Print Your Referral Cards",
      description: "Print plenty of referral cards and keep them with you for every ride.",
    },
    {
      title: "Visit 5 Hotels or Local Businesses",
      description: "Introduce yourself, leave your referral cards, and explain your services.",
    },
    {
      title: "Send Follow-Up Emails",
      description: "Follow up within 24-48 hours to stay top of mind and build relationships.",
    },
    {
      title: "Track Every Contact",
      description: "Record every visit, email, and conversation to monitor your partnership progress.",
    },
  ];

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
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {resourceCards.map((card, idx) => (
          <div 
            key={idx} 
            className={`flex flex-col items-center text-center p-6 sm:p-8 rounded-3xl border ${card.bg} ${card.border}`}
          >
            <div className={`mb-4 ${card.textColor}`}>
              {card.icon}
            </div>
            <h3 className="text-[15px] font-bold text-slate-900 mb-2">
              {card.title}
            </h3>
            <p className="text-[13px] text-slate-500 leading-relaxed">
              {card.description}
            </p>
          </div>
        ))}
      </div>

      {/* Launch Checklist Guide & Need Help */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col shadow-sm">
        <h3 className="text-[17px] font-bold text-slate-900 mb-6">Launch Checklist Guide</h3>
        
        <div className="flex flex-col xl:flex-row gap-8 xl:gap-12">
          
          {/* Checklist (Left) */}
          <div className="flex-1 flex flex-col gap-3">
            {checklistItems.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 border border-slate-100 rounded-xl p-4 bg-white shadow-sm">
                <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                <div>
                  <h4 className="text-[14px] font-bold text-slate-900 mb-0.5">{item.title}</h4>
                  <p className="text-[12px] text-slate-500">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Need Help Card (Right) */}
          <div className="w-full xl:w-[350px] shrink-0 bg-green-50/50 border border-green-100 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-sm h-fit">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-4">
              <Headset className="w-5 h-5" />
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
