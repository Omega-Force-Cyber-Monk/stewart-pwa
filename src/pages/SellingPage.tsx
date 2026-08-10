import { useState } from "react";
import { ExternalLink, Share2, Copy, QrCode, Download, Mail, Smartphone, Users, BadgeDollarSign, CalendarDays } from "lucide-react";
import sellingPageHero from "../assets/sellingPageHero.png";
import { useGetSetupStateQuery, useGetReferralCardQuery } from "../store/api/Business/business.api";

export default function SellingPage() {
  const [copied, setCopied] = useState(false);
  const { data: setupResponse } = useGetSetupStateQuery();
  const { data: referralResponse } = useGetReferralCardQuery();

  const businessSlug = setupResponse?.data?.business?.slug || "default-business";
  const personalizedUrl = referralResponse?.data?.digitalCardUrl || `${window.location.origin}/book/${businessSlug}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(personalizedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[24px] font-bold text-slate-900 mb-2">
          Personalized Selling Page™
        </h1>
        <p className="text-sm text-slate-500">
          Share your personalized booking page with passengers and let them book directly without third-party apps.
        </p>
      </div>

      {/* Landing Page Preview Card */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm mb-8 relative group">
        <img
          src={sellingPageHero}
          alt="Driver with premium SUV at airport"
          className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Overlay Content */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent flex flex-col justify-center p-8 sm:p-12 lg:p-16 w-full lg:w-2/3">
          <h2 className="text-[32px] sm:text-[40px] lg:text-[48px] font-extrabold text-slate-900 leading-tight mb-4">
            Reliable <span className="text-[#2ea043]">Airport<br />Transportation</span><br />
            You Can Trust
          </h2>
          <p className="text-[14px] sm:text-[15px] text-slate-700 max-w-md mb-8 leading-relaxed font-medium">
            Professional private airport transportation with on-time pickups, transparent pricing, and exceptional service. Travel comfortably with experienced drivers and premium vehicles.
          </p>

          <div className="flex items-center gap-4">
            <button className="bg-[#2ea043] hover:bg-[#238636] text-white px-6 py-3 rounded-lg font-bold text-[15px] transition-colors shadow-sm flex items-center gap-2">
              <CalendarDays className="w-5 h-5" />
              Book Now
            </button>
            <button className="bg-white/80 backdrop-blur-sm border-2 border-[#2ea043] text-[#2ea043] hover:bg-[#2ea043] hover:text-white px-6 py-3 rounded-lg font-bold text-[15px] transition-colors flex items-center gap-2">
              <Smartphone className="w-5 h-5" />
              Call Now
            </button>
          </div>
        </div>
      </div>

      {/* Share Section */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col shadow-sm mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[18px] font-bold text-slate-900">Landing page</h3>
          <a
            href={`/book/${businessSlug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[#2ea043] hover:text-[#238636] font-bold text-[14px] transition-colors"
          >
            Preview Landing page
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        <div className="flex flex-col xl:flex-row xl:items-center gap-6">
          <div className="flex items-center gap-3 w-full max-w-md">
            <Share2 className="w-5 h-5 text-slate-400 shrink-0" />
            <span className="font-bold text-slate-700 text-[15px] shrink-0">Share:</span>
            <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[14px] text-slate-600 truncate">
              {personalizedUrl}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleCopyLink}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-[14px] transition-colors shadow-sm ${copied
                ? "bg-slate-800 text-white border border-slate-800"
                : "bg-[#2ea043] hover:bg-[#238636] text-white border border-[#2ea043]"
                }`}
            >
              <Copy className="w-4 h-4" />
              {copied ? "Copied!" : "Copy link"}
            </button>

            <button className="flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 px-5 py-3 rounded-xl font-bold text-[14px] text-slate-700 transition-colors shadow-sm">
              <QrCode className="w-4 h-4 text-slate-500" />
              View QR Code
            </button>

            <button className="flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 px-5 py-3 rounded-xl font-bold text-[14px] text-slate-700 transition-colors shadow-sm">
              <Download className="w-4 h-4 text-slate-500" />
              <div className="flex flex-col items-start">
                <span>Download QR Code</span>
                <span className="text-[10px] text-slate-400 font-normal leading-none">PNG format</span>
              </div>
            </button>

            <div className="w-px h-10 bg-slate-200 mx-2 hidden sm:block"></div>

            <div className="flex items-center gap-2">
              <button className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:bg-[#0c63d4] transition-colors shadow-sm font-bold text-xl">
                f
              </button>
              <button className="w-10 h-10 rounded-full bg-[#0A66C2] text-white flex items-center justify-center hover:bg-[#084e96] transition-colors shadow-sm font-bold text-lg">
                in
              </button>
              <button className="w-10 h-10 rounded-full bg-[#EA4335] text-white flex items-center justify-center hover:bg-[#d33426] transition-colors shadow-sm">
                <Mail className="w-5 h-5" fill="currentColor" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* How Customers Book */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col shadow-sm">
        <h3 className="text-[18px] font-bold text-slate-900 mb-8">How Customers Book</h3>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2">

          {/* Step 1 */}
          <div className="flex flex-col items-center text-center max-w-[200px]">
            <div className="w-16 h-16 mb-4 flex items-center justify-center text-[#2ea043]">
              <Smartphone className="w-10 h-10" />
            </div>
            <h4 className="text-[15px] font-bold text-slate-900 mb-1">Visit Your Page</h4>
            <p className="text-[12px] text-slate-500">Customer Opens your landing page.</p>
          </div>

          <div className="hidden md:flex text-green-200">
            <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 12H38M38 12L28 2M38 12L28 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 4" />
            </svg>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center max-w-[200px]">
            <div className="w-16 h-16 mb-4 flex items-center justify-center text-[#2ea043]">
              <Users className="w-10 h-10" />
            </div>
            <h4 className="text-[15px] font-bold text-slate-900 mb-1">Review Service</h4>
            <p className="text-[12px] text-slate-500">They check your services, pricing and reviews.</p>
          </div>

          <div className="hidden md:flex text-green-200">
            <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 12H38M38 12L28 2M38 12L28 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 4" />
            </svg>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center max-w-[200px]">
            <div className="w-16 h-16 mb-4 flex items-center justify-center">
              <button className="bg-[#2ea043] text-white px-4 py-2 rounded-lg font-bold text-[14px] pointer-events-none shadow-sm">
                Book Now
              </button>
            </div>
            <h4 className="text-[15px] font-bold text-slate-900 mb-1">Click Book Now</h4>
            <p className="text-[12px] text-slate-500">They click the book now button to start booking.</p>
          </div>

          <div className="hidden md:flex text-green-200">
            <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 12H38M38 12L28 2M38 12L28 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 4" />
            </svg>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col items-center text-center max-w-[200px]">
            <div className="w-16 h-16 mb-4 flex items-center justify-center text-[#2ea043]">
              <BadgeDollarSign className="w-10 h-10" />
            </div>
            <h4 className="text-[15px] font-bold text-slate-900 mb-1">Booking Confirm</h4>
            <p className="text-[12px] text-slate-500">They complete the form and booking is sent.</p>
          </div>

        </div>
      </div>

    </div>
  );
}
