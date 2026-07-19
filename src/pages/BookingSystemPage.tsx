import { useState } from "react";
import {
  Link2,
  Copy,
  Scan,
  Settings,
  Package,
  SlidersHorizontal,
  Eye,
  CheckCircle2,
  QrCode,
} from "lucide-react";
import bookingPreview from "../assets/bookingPreview.png";

export default function BookingSystemPage() {
  const [preferences, setPreferences] = useState({
    airportPickup: true,
    airportDropoff: true,
    roundTrip: true,
    advanceBooking: true,
    sameDayBooking: true,
    emailConfirmation: true,
    smsNotifications: true,
  });

  const handleToggle = (key: keyof typeof preferences) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSavePreferences = () => {
    console.log("Saving preferences:", preferences);
    alert("Preferences saved successfully!");
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-[24px] font-bold text-slate-900 mb-2">
          Booking System™
        </h1>
        <p className="text-sm text-slate-500 max-w-3xl">
          Set up and manage your direct booking system. Access your booking
          link, QR code, setup status, and booking preferences from one place.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Top Row (4 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {/* Card 1: Booking Link */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                <Link2 className="w-4 h-4" />
              </div>
              <h3 className="text-[15px] font-bold text-slate-900">
                Booking Link
              </h3>
            </div>

            <div className="bg-slate-100 rounded-lg p-3 text-center text-slate-600 text-[13px] font-medium mb-auto overflow-hidden text-ellipsis whitespace-nowrap">
              http://joindriver/booking.com
            </div>

            <div className="flex items-center gap-3 mt-6">
              <button className="flex-1 bg-[#22c55e] hover:bg-[#1ea951] text-white px-4 py-2.5 rounded-lg font-bold text-[13px] transition-colors flex items-center justify-center gap-2">
                <Link2 className="w-4 h-4" />
                Open Page
              </button>
              <button className="flex-1 bg-white border border-green-500 text-green-600 hover:bg-green-50 px-4 py-2.5 rounded-lg font-bold text-[13px] transition-colors flex items-center justify-center gap-2">
                <Copy className="w-4 h-4" />
                Copy link
              </button>
            </div>
          </div>

          {/* Card 2: QR Code */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                <Scan className="w-4 h-4" />
              </div>
              <h3 className="text-[15px] font-bold text-slate-900">QR Code</h3>
            </div>

            <div className="flex-1 flex items-center justify-center mb-6">
              {/* Dummy QR Code */}
              <div className="w-32 h-32 bg-white border-2 border-slate-900 rounded-xl flex items-center justify-center p-2 relative">
                <QrCode className="w-full h-full text-slate-900" />
              </div>
            </div>

            <button className="w-full bg-[#22c55e] hover:bg-[#1ea951] text-white px-4 py-2.5 rounded-lg font-bold text-[13px] transition-colors flex items-center justify-center gap-2">
              <Scan className="w-4 h-4" />
              Download QR Code
            </button>
          </div>

          {/* Card 3: Booking Setup */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                <Settings className="w-4 h-4" />
              </div>
              <h3 className="text-[15px] font-bold text-slate-900">
                Booking Setup
              </h3>
            </div>

            <div className="flex-1 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 fill-green-100 shrink-0" />
                <span className="text-[13px] text-slate-700 font-medium">
                  Booking page created
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 fill-green-100 shrink-0" />
                <span className="text-[13px] text-slate-700 font-medium">
                  Contact form active
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 fill-green-100 shrink-0" />
                <span className="text-[13px] text-slate-700 font-medium">
                  Booking notifications enabled
                </span>
              </div>
            </div>

            <button className="w-full mt-6 bg-[#22c55e] hover:bg-[#1ea951] text-white px-4 py-2.5 rounded-lg font-bold text-[13px] transition-colors">
              Manage Setup
            </button>
          </div>

          {/* Card 4: Booking Add-on */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col shadow-sm text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                <Package className="w-4 h-4" />
              </div>
              <h3 className="text-[15px] font-bold text-slate-900">
                Booking Add-on
              </h3>
            </div>
            <p className="text-[11px] text-slate-500 font-medium mb-6 uppercase tracking-wider">
              Booking Setup Package
            </p>

            <div className="flex-1 flex items-center justify-center px-4">
              <p className="text-[14px] text-slate-900 font-medium leading-relaxed">
                Your $199 Booking Setup Add-on has been successfully activated.
              </p>
            </div>

            <button className="w-full mt-6 bg-[#22c55e] hover:bg-[#1ea951] text-white px-4 py-2.5 rounded-lg font-bold text-[13px] transition-colors">
              View Details
            </button>
          </div>
        </div>

        {/* Bottom Row (2 Columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card 5: Booking Preferences */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col shadow-sm relative">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 shrink-0 mt-1">
                <SlidersHorizontal className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-[17px] font-bold text-slate-900 mb-1">
                  Booking Preferences
                </h3>
                <p className="text-[13px] text-slate-500">
                  Choose which booking options are available to your customers.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8 mb-16">
              {/* Left Column Checkboxes */}
              <div className="flex flex-col gap-5">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-5 h-5 accent-green-500 cursor-pointer border-slate-300 rounded"
                    checked={preferences.airportPickup}
                    onChange={() => handleToggle("airportPickup")}
                  />
                  <span className="text-[14px] text-slate-800 font-medium select-none">
                    Airport Pickup
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-5 h-5 accent-green-500 cursor-pointer border-slate-300 rounded"
                    checked={preferences.airportDropoff}
                    onChange={() => handleToggle("airportDropoff")}
                  />
                  <span className="text-[14px] text-slate-800 font-medium select-none">
                    Airport Drop-off
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-5 h-5 accent-green-500 cursor-pointer border-slate-300 rounded"
                    checked={preferences.roundTrip}
                    onChange={() => handleToggle("roundTrip")}
                  />
                  <span className="text-[14px] text-slate-800 font-medium select-none">
                    Round Trip
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-5 h-5 accent-green-500 cursor-pointer border-slate-300 rounded"
                    checked={preferences.advanceBooking}
                    onChange={() => handleToggle("advanceBooking")}
                  />
                  <span className="text-[14px] text-slate-800 font-medium select-none">
                    Advance Booking
                  </span>
                </label>
              </div>

              {/* Right Column Checkboxes */}
              <div className="flex flex-col gap-5">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-5 h-5 accent-green-500 cursor-pointer border-slate-300 rounded"
                    checked={preferences.sameDayBooking}
                    onChange={() => handleToggle("sameDayBooking")}
                  />
                  <span className="text-[14px] text-slate-800 font-medium select-none">
                    Same-Day Booking
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-5 h-5 accent-green-500 cursor-pointer border-slate-300 rounded"
                    checked={preferences.emailConfirmation}
                    onChange={() => handleToggle("emailConfirmation")}
                  />
                  <span className="text-[14px] text-slate-800 font-medium select-none">
                    Email Confirmation
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-5 h-5 accent-green-500 cursor-pointer border-slate-300 rounded"
                    checked={preferences.smsNotifications}
                    onChange={() => handleToggle("smsNotifications")}
                  />
                  <span className="text-[14px] text-slate-800 font-medium select-none">
                    SMS Notifications
                  </span>
                </label>
              </div>
            </div>

            <button
              onClick={handleSavePreferences}
              className="absolute bottom-6 right-6 bg-[#22c55e] hover:bg-[#1ea951] text-white px-6 py-2.5 rounded-lg font-bold text-[14px] transition-colors"
            >
              Save Preferences
            </button>
          </div>

          {/* Card 6: Booking Page Preview */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col shadow-sm relative">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 shrink-0 mt-1">
                <Eye className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-[17px] font-bold text-slate-900 mb-1">
                  Booking Page Preview
                </h3>
                <p className="text-[13px] text-slate-500">
                  Preview the booking page your customers will see before making
                  a reservation.
                </p>
              </div>
            </div>

            <div className="flex-1 rounded-xl overflow-hidden mb-16 border border-slate-100 bg-slate-50 relative min-h-[220px]">
              <img
                src={bookingPreview}
                alt="Booking Page Preview"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            </div>

            <button className="absolute bottom-6 right-6 bg-[#22c55e] hover:bg-[#1ea951] text-white px-6 py-2.5 rounded-lg font-bold text-[14px] transition-colors">
              Preview Full Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
