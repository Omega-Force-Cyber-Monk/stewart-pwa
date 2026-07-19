import { useState } from "react";
import { Play, ChevronRight, ChevronDown, FileText, History, FileSpreadsheet, Headset } from "lucide-react";
import ContactSupportModal from "../components/dashboard/ContactSupportModal";

export default function RepeatRiderPage() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const messages = [
    {
      title: "Same-Day Thank You",
      content: "Hi [Name], thanks for riding with me today! I appreciate your business. If you need a ride in the future, just let me know. - [Your Name]"
    },
    {
      title: "Review Request",
      content: "Hi [Name], I hope you had a great trip. If you have a moment, I'd really appreciate it if you could leave me a quick review on [Platform/Link]. It helps my business a lot!"
    },
    {
      title: "Return Trip Reminder",
      content: "Hi [Name], just checking in about your return trip on [Date]. Do you still need a ride from the airport? Let me know and I'll get you on my schedule."
    },
    {
      title: "Future Trip Follow Up",
      content: "Hi [Name], it's been a while! Are you planning any upcoming trips? Reach out when you have your flight details and I'll make sure you're taken care of."
    },
    {
      title: "Holiday & Seasonal Check-In",
      content: "Happy Holidays, [Name]! Wishing you the best this season. If you have any holiday travel coming up, book early to guarantee your ride."
    },
    {
      title: "Business Traveler Messages",
      content: "Hi [Name], I know you travel often for work. I have some new flat-rate packages for corporate clients. Let me know if you're interested!"
    },
    {
      title: "Family Traveler Messages",
      content: "Hi [Name], traveling with the family can be stressful. Just a reminder that my SUV has plenty of room for luggage and car seats if you need a ride for your next vacation."
    },
    {
      title: "Pickup Confirmations",
      content: "Hi [Name], confirming our pickup tomorrow at [Time] from [Location]. See you then!"
    }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-[24px] font-bold text-slate-900 mb-2">
            Repeat Rider Follow Up System™
          </h1>
          <p className="text-sm text-slate-500">
            Follow up the right way. Get more bookings, reviews, and referrals.
          </p>
        </div>
        
        <div className="flex items-center gap-4 shrink-0">
          <span className="text-[14px] font-bold text-slate-700 hidden sm:block">Learn Proven Outreach Strategies</span>
          <button className="flex items-center gap-2 bg-green-50 text-green-600 hover:bg-green-100 px-5 py-2.5 rounded-full font-bold text-[13px] transition-colors">
            <div className="w-6 h-6 rounded-full bg-green-200 flex items-center justify-center">
              <Play className="w-3 h-3 fill-current" />
            </div>
            Watch Guide
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col xl:flex-row gap-6 mb-6">
        
        {/* Left Column: Your Daily Rhythm */}
        <div className="flex-[1] bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col shadow-sm">
          <h3 className="text-[17px] font-bold text-slate-900 mb-6">Your Daily Rhythm</h3>
          
          <div className="flex flex-col gap-4">
            
            {/* Step 1 */}
            <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 flex items-center gap-5">
              <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-[22px] shrink-0">
                1
              </div>
              <div>
                <h4 className="text-[15px] font-bold text-slate-900 mb-0.5">After Every Ride</h4>
                <p className="text-[12px] text-slate-500">Save rider info & referral source</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 flex items-center gap-5">
              <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-[22px] shrink-0">
                2
              </div>
              <div>
                <h4 className="text-[15px] font-bold text-slate-900 mb-0.5">Within 2 Hours</h4>
                <p className="text-[12px] text-slate-500">Send same-day thank-you text</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 flex items-center gap-5">
              <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-[22px] shrink-0">
                3
              </div>
              <div>
                <h4 className="text-[15px] font-bold text-slate-900 mb-0.5">Next Morning</h4>
                <p className="text-[12px] text-slate-500">Send review request</p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 flex items-center gap-5">
              <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-[22px] shrink-0">
                4
              </div>
              <div>
                <h4 className="text-[15px] font-bold text-slate-900 mb-0.5">Every Monday (15 min)</h4>
                <p className="text-[12px] text-slate-500">Work your list & send reminders</p>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Message Library */}
        <div className="flex-[1.5] bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col shadow-sm">
          <h3 className="text-[17px] font-bold text-slate-900 mb-6">Message Library</h3>
          
          <div className="flex flex-col gap-3">
            {messages.map((message, idx) => (
              <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
                <button 
                  onClick={() => toggleAccordion(idx)}
                  className="w-full bg-white hover:bg-slate-50 transition-colors p-4 flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <span className="text-[14px] font-bold text-slate-800">{message.title}</span>
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
                    <p className="text-[13px] text-slate-600 italic leading-relaxed">
                      "{message.content}"
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Section: Tools & Tracking */}
      <div>
        <h3 className="text-[17px] font-bold text-slate-900 mb-4 px-1">Tools & Tracking</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Follow Up Timeline */}
          <div className="bg-blue-50/50 hover:bg-blue-50 border border-blue-100 rounded-3xl p-8 flex flex-col items-center justify-center text-center transition-colors cursor-pointer group shadow-sm">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mb-4 group-hover:scale-110 transition-transform">
              <History className="w-5 h-5" />
            </div>
            <h4 className="text-[15px] font-bold text-slate-900 mb-1">Follow Up Timeline</h4>
            <p className="text-[13px] text-slate-500">See the full sequence</p>
          </div>

          {/* Card 2: Repeat Customer Tracking Sheet */}
          <div className="bg-blue-50/50 hover:bg-blue-50 border border-blue-100 rounded-3xl p-8 flex flex-col items-center justify-center text-center transition-colors cursor-pointer group shadow-sm">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mb-4 group-hover:scale-110 transition-transform">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <h4 className="text-[15px] font-bold text-slate-900 mb-1">Repeat Customer Tracking Sheet</h4>
            <p className="text-[13px] text-slate-500">Track your repeat riders</p>
          </div>

          {/* Card 3: Need Help */}
          <div className="bg-green-50/50 border border-green-100 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-sm">
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
