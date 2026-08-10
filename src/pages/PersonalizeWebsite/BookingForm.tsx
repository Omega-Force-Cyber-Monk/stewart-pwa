import { useState } from "react";
import { MapPin, Plane, Calendar, Clock, User as UserIcon, ChevronRight } from "lucide-react";

interface BookingFormProps {
  onSubmit: (formData: {
    pickup: string;
    dropoff: string;
    date: string;
    time: string;
    passengers: string;
  }) => void;
}

export function BookingForm({ onSubmit }: BookingFormProps) {
  const [bookingForm, setBookingForm] = useState({
    pickup: "",
    dropoff: "",
    date: "",
    time: "",
    passengers: "1",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(bookingForm);
  };

  return (
    <div id="booking-card" className="bg-slate-950/95 border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-8 flex flex-col gap-6 backdrop-blur-md">
      <div className="text-center">
        <h3 className="text-lg font-bold text-white mb-1">Book Your Ride</h3>
        <p className="text-sm text-slate-400">Request transparent flat rates instantly</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-bold text-slate-400 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-green-500" /> Pickup Location
          </label>
          <input 
            type="text" 
            placeholder="Address, hotel, or location"
            value={bookingForm.pickup}
            onChange={(e) => setBookingForm(prev => ({ ...prev, pickup: e.target.value }))}
            required
            className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-green-500 transition"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-bold text-slate-400 flex items-center gap-1.5">
            <Plane className="w-4 h-4 text-green-500" /> Drop-off
          </label>
          <input 
            type="text" 
            placeholder="Airport, address, or location"
            value={bookingForm.dropoff}
            onChange={(e) => setBookingForm(prev => ({ ...prev, dropoff: e.target.value }))}
            required
            className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-green-500 transition"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-slate-400 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-green-500" /> Date
            </label>
            <input 
              type="date"
              value={bookingForm.date}
              onChange={(e) => setBookingForm(prev => ({ ...prev, date: e.target.value }))}
              required
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-green-500 transition"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-slate-400 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-green-500" /> Time
            </label>
            <input 
              type="time" 
              value={bookingForm.time}
              onChange={(e) => setBookingForm(prev => ({ ...prev, time: e.target.value }))}
              required
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-green-500 transition"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-bold text-slate-400 flex items-center gap-1.5">
            <UserIcon className="w-4 h-4 text-green-500" /> Passengers
          </label>
          <select
            value={bookingForm.passengers}
            onChange={(e) => setBookingForm(prev => ({ ...prev, passengers: e.target.value }))}
            className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-green-500 transition"
          >
            <option value="1">1 Passenger</option>
            <option value="2">2 Passengers</option>
            <option value="3">3 Passengers</option>
            <option value="4">4+ Passengers (SUV)</option>
          </select>
        </div>

        <button 
          type="submit"
          className="w-full bg-[#22c55e] hover:bg-[#1ea951] text-white py-3 rounded-xl text-sm font-bold transition flex items-center justify-center gap-1.5 shadow-lg mt-2"
        >
          CONTINUE TO BOOK
          <ChevronRight className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
