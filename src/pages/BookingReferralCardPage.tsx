import { useState, useRef } from "react";
import { Check, Copy, Download, ExternalLink, Hand, QrCode, ScanLine, Share2, TrendingUp, Scan, Car } from "lucide-react";
import { useGetReferralCardQuery, useGetSetupStateQuery } from "../store/api/Business/business.api";
import { copyToClipboard } from "../utils/clipboard";
import { toPng } from 'html-to-image';
import referralCardBg from "../assets/referralCardBg.png";

function downloadUrl(url: string, filename: string) {
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.target = "_blank";
  anchor.rel = "noopener noreferrer";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
}

export default function BookingReferralCardPage() {
  const { data: setup } = useGetSetupStateQuery();
  const { data: referral } = useGetReferralCardQuery();
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const url = referral?.data.bookingUrl || referral?.data.websiteUrl || (setup?.data.business.slug ? `https://${setup.data.business.slug}.quittheapp.com` : "");
  
  const copy = async () => {
    if (await copyToClipboard(url)) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    }
  };
  
  const share = async () => {
    if (navigator.share) await navigator.share({ title: "Book direct", url });
    else await copy();
  };

  const handleDownloadQr = () => {
    if (referral?.data.qrCodeUrl) downloadUrl(referral.data.qrCodeUrl, "booking-qr.png");
    else alert("QR Code not available yet.");
  };

  const handleFrontendDownload = async () => {
    if (!cardRef.current) return;
    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        skipFonts: true,
      });
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = "referral-card.png";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      console.error("Failed to generate image", err);
      alert("Failed to generate card image. Please try again.");
    }
  };

  const checklist = [
    "Booking page created", "Contact form active", "Notifications enabled", 
    "Print ready card", "Works direction", "Personal website", 
    "Resource & guide share", "Booking notifications enabled"
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Booking &amp; Referral Card</h2>
        <p className="mt-1 text-sm text-slate-500">
          Set up and manage your direct booking system, referral card, and booking link from one place.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <section className="rounded-xl bg-white p-5 shadow-sm">
          <h3 className="mb-4 flex items-center gap-2 font-semibold text-slate-900">
            <QrCode className="h-5 w-5 text-dashboard-rider" />
            QR Code
          </h3>
          {referral?.data.qrCodeUrl ? (
            <img src={referral.data.qrCodeUrl} alt="Booking QR code" className="mx-auto h-36 w-36" />
          ) : (
            <div className="grid h-36 place-items-center text-sm text-slate-400">QR code unavailable</div>
          )}
          <button type="button" onClick={handleDownloadQr} className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-dashboard-rider px-4 py-2.5 text-sm font-semibold text-white">
            <Download className="h-4 w-4" />
            Download QR Code
          </button>
        </section>

        <section className="rounded-xl bg-white p-5 shadow-sm">
          <h3 className="mb-4 flex items-center gap-2 font-semibold text-slate-900">
            <ExternalLink className="h-5 w-5 text-dashboard-rider" />
            Booking Link
          </h3>
          <input readOnly value={url} className="h-11 w-full rounded-lg bg-slate-50 px-3 text-sm text-slate-600" />
          <div className="mt-4 flex gap-2">
            <a href={url || "#"} onClick={(e) => { if (!url) { e.preventDefault(); alert("Booking link not available yet."); } }} target="_blank" rel="noopener noreferrer" className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-dashboard-rider px-3 py-2 text-sm font-semibold text-white">
              <ExternalLink className="h-4 w-4" />
              Open Page
            </a>
            <button type="button" onClick={copy} className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-dashboard-rider px-3 py-2 text-sm font-semibold text-dashboard-rider">
              <Copy className="h-4 w-4" />
              {copied ? "Copied" : "Copy link"}
            </button>
          </div>
        </section>

        <section className="rounded-xl bg-white p-5 shadow-sm">
          <h3 className="mb-4 font-semibold text-slate-900">Booking Setup</h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {checklist.map((item) => (
              <p key={item} className="flex items-center gap-2 text-sm text-slate-600">
                <Check className="h-4 w-4 rounded-full bg-green-100 p-0.5 text-green-600" />
                {item}
              </p>
            ))}
          </div>
        </section>
      </div>

      <div className="grid gap-5 rounded-2xl bg-white p-5 shadow-sm lg:grid-cols-[1.05fr_0.95fr]">
        
        {/* Referral Card Preview Panel */}
        <div className="rounded-xl bg-slate-100 p-5 overflow-x-auto flex items-center justify-center">
          <div 
            ref={cardRef}
            className="relative min-w-[600px] w-[600px] h-[360px] rounded-[1.5rem] overflow-hidden shadow-sm bg-slate-800"
            style={{ backgroundImage: `url(${referralCardBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            {/* Left slanted white shape */}
            <div 
              className="absolute top-0 bottom-0 left-0 w-[60%] bg-white z-10"
              style={{ clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0 100%)' }}
            >
              <div className="p-10 h-full flex flex-col pt-12">
                <h2 className="text-[2.5rem] font-bold text-black leading-[1.1] tracking-tight">
                  Book Direct<br/>Next Time
                </h2>
                <p className="mt-5 text-slate-800 text-[15px] max-w-[240px] font-medium leading-snug">
                  Private airport transportation you can actually afford.
                </p>
                
                <div className="mt-10 flex items-center gap-4">
                  <div className="w-[52px] h-[52px] rounded-full bg-[#111111] flex items-center justify-center text-white shrink-0 shadow-md">
                    <Scan className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-medium text-slate-800 leading-snug max-w-[140px]">
                    Scan to book your next ride.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Bottom left dark shape */}
            <div 
              className="absolute bottom-0 left-0 w-[55%] h-[72px] bg-[#111111] z-20 flex items-center px-10 gap-4"
              style={{ borderTopRightRadius: '2.5rem' }}
            >
              <Car className="w-8 h-8 text-white shrink-0" strokeWidth={1.5} />
              <span className="text-white font-semibold tracking-wide text-lg">
                Your Driver. Your Best Price
              </span>
            </div>

            {/* QR Code on the right */}
            <div className="absolute top-1/2 right-[10%] -translate-y-1/2 z-20">
              <div className="bg-white p-4 rounded-3xl shadow-2xl flex items-center justify-center">
                {referral?.data.qrCodeUrl ? (
                  <img src={referral.data.qrCodeUrl} crossOrigin="anonymous" alt="QR Code" className="w-[170px] h-[170px] object-cover" />
                ) : (
                  <div className="w-[170px] h-[170px] bg-slate-50 flex items-center justify-center text-slate-400 text-sm text-center p-4 rounded-xl border border-slate-100">
                    QR Code<br/>Not Generated
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-900">How it Works</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {[
              [Hand, "Hand Out", "Hand your referral card to every passenger after a successful ride."], 
              [ScanLine, "Scan the QR Code", "Passengers scan the QR code to access your booking page."], 
              [TrendingUp, "Book Direct", "They schedule future rides directly with you."], 
              [Share2, "Grow Your Business", "Increase repeat customers and referrals."]
            ].map(([Icon, title, text]) => (
              <div key={String(title)} className="rounded-lg border border-slate-100 p-3">
                <Icon className="h-5 w-5 text-dashboard-rider" />
                <p className="mt-2 text-sm font-semibold text-slate-900">{String(title)}</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">{String(text)}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 flex gap-3">
            <button type="button" onClick={handleFrontendDownload} className="flex-1 rounded-lg bg-dashboard-rider px-4 py-2.5 text-sm font-semibold text-white">
              <Download className="mr-2 inline h-4 w-4" />
              Download Print-Ready Card
            </button>
            <button type="button" onClick={share} className="flex-1 rounded-lg border border-dashboard-rider px-4 py-2.5 text-sm font-semibold text-dashboard-rider">
              <Share2 className="mr-2 inline h-4 w-4" />
              Share your card
            </button>
          </div>
          <p className="mt-3 text-xs text-slate-400">You can easily download and share your print ready card</p>
        </div>
      </div>
    </div>
  );
}
