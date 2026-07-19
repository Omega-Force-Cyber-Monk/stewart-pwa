import { useState } from "react";
import {
  Play,
  QrCode,
  Download,
  ChevronRight,
  ChevronDown,
  HandHeart,
  Scan,
  Link2,
  TrendingUp,
  Copy,
  Mail,
  CalendarDays,
  UserPlus,
  Users,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";
import referralCardImage from "../assets/referralCard.png";

export default function ReferralCardPage() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const scripts = [
    {
      title: "First Ride Handoff Script",
      subtitle: "Help first-time passengers book directly with confidence.",
      icon: <UserPlus className="w-5 h-5 text-green-600" />,
      content:
        "Hi there! I hope you enjoyed the ride. If you ever need reliable transportation to the airport again, here is my direct booking card. You can scan the QR code to book me directly next time, which helps me avoid platform fees and guarantees you a familiar face.",
    },
    {
      title: "Conquest Ride Script",
      subtitle:
        "Confidently introduce the benefits of booking directly with you.",
      icon: <HandHeart className="w-5 h-5 text-green-600" />,
      content:
        "Thanks for riding with me today. Did you know you can book me directly for future rides? It's often cheaper than using the apps, and you'll always get me as your driver. Here's my card—just scan it next time you need a ride.",
    },
    {
      title: "Friends & Family Script",
      subtitle:
        "A simple way to grow your business through personal recommendations.",
      icon: <Users className="w-5 h-5 text-green-600" />,
      content:
        "Hey! I'm growing my independent driving business. If you know anyone heading to the airport soon, I'd love it if you could share this card with them. They just scan the code to book me directly. I really appreciate your support!",
    },
    {
      title: "Partner Handoff Script",
      subtitle:
        "A simple script for connecting with hotels and local businesses.",
      icon: <MessageSquare className="w-5 h-5 text-green-600" />,
      content:
        "Hello! I provide premium airport transportation for guests in the area. If your concierge desk ever needs a reliable driver for VIP guests, here is my direct booking card. I'd love to partner with you to ensure your guests have a flawless experience.",
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-[24px] font-bold text-slate-900 mb-2">
            Referral Card System™
          </h1>
          <p className="text-sm text-slate-500">
            Your referral card is ready. Print it, carry it, and hand it out on
            every ride.
          </p>
        </div>

        <button className="flex items-center gap-2 bg-green-50 text-green-600 hover:bg-green-100 px-5 py-2.5 rounded-full font-bold text-[13px] transition-colors shrink-0">
          <div className="w-6 h-6 rounded-full bg-green-200 flex items-center justify-center">
            <Play className="w-3 h-3 fill-current" />
          </div>
          Watch Guide
        </button>
      </div>

      <div className="flex flex-col gap-6">
        {/* Hero Card Area */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col xl:flex-row gap-8 shadow-sm">
          {/* Left: Card Preview */}
          <div className="flex-1 rounded-2xl overflow-hidden shadow-md relative min-h-[300px] xl:min-h-[400px]">
            <img
              src={referralCardImage}
              alt="Referral Card Mockup"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Right: Features List */}
          <div className="w-full xl:w-[400px] shrink-0 flex flex-col justify-between py-4">
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-4">
                <CalendarDays className="w-5 h-5 text-slate-400" />
                <span className="text-[15px] text-slate-700 font-medium">
                  Reliable airport pickup
                </span>
              </div>
              <div className="flex items-center gap-4">
                <MessageSquare className="w-5 h-5 text-slate-400" />
                <span className="text-[15px] text-slate-700 font-medium">
                  Direct communication
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-5 h-5 flex items-center justify-center border-2 border-slate-400 rounded-sm text-[12px] font-bold text-slate-400">
                  $
                </div>
                <span className="text-[15px] text-slate-700 font-medium">
                  Flat rate pricing
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-5 h-5 rounded-full border-2 border-slate-400 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                </div>
                <span className="text-[15px] text-slate-700 font-medium">
                  Flight tracking
                </span>
              </div>
              <div className="flex items-center gap-4">
                <CheckCircle2 className="w-5 h-5 text-slate-400" />
                <span className="text-[15px] text-slate-700 font-medium">
                  Same driver every time
                </span>
              </div>
            </div>

            <div className="mt-12 flex items-end gap-2">
              <span className="text-[13px] text-slate-500 font-medium shrink-0">
                Referred By:
              </span>
              <div className="flex-1 border-b-2 border-slate-300 pb-1" />
            </div>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-white border border-slate-200 hover:border-green-400 hover:text-green-600 text-slate-700 px-6 py-4 rounded-xl font-bold text-[14px] transition-all flex items-center justify-center gap-2 shadow-sm">
            <QrCode className="w-5 h-5 text-green-500" />
            View QR Code
          </button>
          <button className="bg-white border border-slate-200 hover:border-green-400 hover:text-green-600 text-slate-700 px-6 py-4 rounded-xl font-bold text-[14px] transition-all flex items-center justify-center gap-2 shadow-sm">
            <Download className="w-5 h-5 text-green-500" />
            <div className="flex flex-col items-center">
              <span>Download Referral Card System Guide</span>
              <span className="text-[10px] font-normal text-slate-400 uppercase tracking-wide mt-0.5">
                PNG format
              </span>
            </div>
          </button>
          <button className="bg-[#22c55e] hover:bg-[#1ea951] text-white px-6 py-4 rounded-xl font-bold text-[14px] transition-colors flex items-center justify-center gap-2 shadow-sm">
            <Download className="w-5 h-5" />
            Download Print-Ready Card
          </button>
        </div>

        {/* Handoff Scripts Area */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col shadow-sm mt-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-[17px] font-bold text-slate-900 mb-1">
                Handoff Scripts
              </h3>
              <p className="text-[13px] text-slate-500">
                Ready-to-use scripts to confidently introduce your referral card
                after every ride.
              </p>
            </div>
            <div className="bg-green-100 text-green-700 px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider">
              SCRIPT
            </div>
          </div>

          <div className="mt-6 flex flex-col border-t border-slate-100">
            {scripts.map((script, idx) => (
              <div
                key={idx}
                className="border-b border-slate-100 last:border-b-0"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full py-5 flex items-center justify-between text-left hover:bg-slate-50/50 transition-colors px-2 -mx-2 rounded-lg"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                      {script.icon}
                    </div>
                    <div>
                      <h4 className="text-[14px] font-bold text-slate-900 mb-0.5">
                        {script.title}
                      </h4>
                      <p className="text-[12px] text-slate-500">
                        {script.subtitle}
                      </p>
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
                  <div className="pb-5 pl-16 pr-8 text-[13px] text-slate-600 leading-relaxed">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 italic">
                      "{script.content}"
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
          {/* How it Works */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col shadow-sm">
            <h3 className="text-[17px] font-bold text-slate-900 mb-6">
              How it Works
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              <div className="flex flex-col gap-3">
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                  <HandHeart className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-slate-900 mb-1">
                    Hand Out
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Hand your referral card to every passenger after a
                    successful ride.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                  <Scan className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-slate-900 mb-1">
                    Scan the QR Code
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Passengers scan the QR code with their phone to access your
                    booking page.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                  <Link2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-slate-900 mb-1">
                    Book Direct
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    They schedule future rides directly with you—no third-party
                    apps required.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-slate-900 mb-1">
                    Grow Your Business
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Increase repeat customers, referrals, and direct bookings
                    while reducing commission fees.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Share your Page */}
          <div className="lg:col-span-1 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col shadow-sm">
            <h3 className="text-[17px] font-bold text-slate-900 mb-1">
              Share your Page
            </h3>
            <p className="text-[12px] text-slate-500 mb-6">
              Share your direct booking page link with passengers
            </p>

            <div className="flex items-center gap-2 mb-8">
              <div className="flex-1 bg-white border border-slate-200 rounded-lg p-2.5 text-[13px] text-slate-600 font-medium">
                eleanorpena.com/book
              </div>
              <button className="bg-[#22c55e] hover:bg-[#1ea951] text-white px-4 py-2.5 rounded-lg font-bold text-[13px] transition-colors flex items-center gap-2 shrink-0">
                <Copy className="w-4 h-4" />
                Copy link
              </button>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[13px] font-bold text-slate-900">
                Share on :
              </span>
              <button className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 transition-colors font-bold text-sm">
                f
              </button>
              <button className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white hover:bg-blue-600 transition-colors font-bold text-sm">
                in
              </button>
              <button className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-white hover:bg-blue-500 transition-colors">
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
