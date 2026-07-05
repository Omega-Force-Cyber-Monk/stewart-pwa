import { CalendarClock, CarFront, CheckCircle2, MapPin, Plane, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { type FormEvent, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useAppSelector } from "../app/hooks";
import rectangle93 from "../assets/Rectangle 93.png";
import rectangle96 from "../assets/Rectangle 96.png";
import { Badge } from "../components/common/Badge";
import { Button } from "../components/common/Button";
import { PageContainer } from "../components/layout/PageContainer";
import { selectDriverProfile } from "../features/appFlow/appFlowSlice";
import { createDriverSlug, getDriverDisplayDomain } from "../lib/driverSite";

type BookingFormState = {
  customerName: string;
  email: string;
  phone: string;
  tripType: "hotel_to_airport" | "airport_to_hotel";
  pickup: string;
  dropoff: string;
  date: string;
  time: string;
  passengers: string;
};

const initialBookingForm: BookingFormState = {
  customerName: "",
  email: "",
  phone: "",
  tripType: "hotel_to_airport",
  pickup: "",
  dropoff: "",
  date: "",
  time: "",
  passengers: "1",
};

export default function PersonalizedDriverPage() {
  const { username } = useParams();
  const driverProfile = useAppSelector(selectDriverProfile);
  const [form, setForm] = useState<BookingFormState>(initialBookingForm);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const profileSlug = createDriverSlug(driverProfile);
  const displayDomain = driverProfile
    ? getDriverDisplayDomain(driverProfile)
    : `${username || profileSlug}.ourdomain.com`;
  const driverName = driverProfile?.fullName || "Your Private Airport Driver";
  const market = driverProfile?.targetCity || "your city";
  const airports = driverProfile?.regionalAirports || "regional airports";

  const updateField = <Field extends keyof BookingFormState>(
    field: Field,
    value: BookingFormState[Field],
  ) => {
    setForm((current) => ({ ...current, [field]: value }));
    setIsSubmitted(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <main className="bg-[#F2F2F2]">
      <section className="py-10 sm:py-14">
        <PageContainer size="lg">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Badge tone="accent">Customer website preview</Badge>
            <p className="text-sm font-semibold text-slate-600">{displayDomain}</p>
          </div>

          <div className="grid overflow-hidden rounded-[28px] bg-white shadow-sm lg:grid-cols-[1.02fr_0.98fr]">
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col justify-center p-6 sm:p-10 lg:p-14"
              initial={{ opacity: 0, y: 18 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <p className="text-sm font-semibold text-[#EE389C]">
                Private airport transportation in {market}
              </p>
              <h1 className="mt-4 text-[36px] font-semibold leading-[42px] tracking-normal text-[#101010] sm:text-[52px] sm:leading-[60px]">
                Book a trusted ride with {driverName}.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[#666060]">
                Professional hotel-to-airport and airport-to-hotel transportation
                serving {airports}. Choose your route, time, and passenger count
                below.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  { icon: ShieldCheck, label: "Trusted local service" },
                  { icon: Plane, label: "Airport-ready rides" },
                  { icon: CalendarClock, label: "Easy scheduling" },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div className="rounded-lg border border-pink-100 bg-pink-50 p-4" key={item.label}>
                      <Icon aria-hidden="true" className="size-5 text-[#EE389C]" />
                      <p className="mt-3 text-sm font-semibold leading-5 text-[#101010]">
                        {item.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            <div className="flex min-h-[360px] flex-col items-center justify-center gap-6 bg-pink-50 p-8 sm:min-h-[460px]">
              <img
                alt="Private airport transportation driver"
                className="aspect-square w-full max-w-[320px] rounded-full object-cover object-center shadow-lg ring-8 ring-white"
                src={rectangle93}
              />
              <div className="w-full max-w-md rounded-2xl bg-white p-5 text-center shadow-sm">
                <p className="text-sm font-semibold text-slate-500">Driver profile</p>
                <p className="mt-1 text-xl font-semibold text-[#101010]">{driverName}</p>
                <p className="mt-1 text-sm text-[#666060]">{market} airport transportation</p>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      <section className="pb-12 sm:pb-16">
        <PageContainer size="lg">
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
            <aside className="rounded-[20px] bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-semibold text-[#101010]">Service details</h2>
              <div className="mt-6 grid gap-4">
                {[
                  {
                    icon: MapPin,
                    title: "Coverage",
                    text: `${market} hotels, homes, and ${airports}`,
                  },
                  {
                    icon: CarFront,
                    title: "Trip types",
                    text: "Hotel to airport, airport to hotel, and private transfer requests.",
                  },
                  {
                    icon: CheckCircle2,
                    title: "Booking status",
                    text: "This demo collects appointment details locally. No real booking is sent.",
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div className="flex gap-4 rounded-xl border border-slate-100 p-4" key={item.title}>
                      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-pink-50 text-[#EE389C]">
                        <Icon aria-hidden="true" className="size-5" />
                      </span>
                      <div>
                        <h3 className="font-semibold text-[#101010]">{item.title}</h3>
                        <p className="mt-1 text-sm leading-6 text-[#666060]">{item.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <img
                alt=""
                className="mt-6 aspect-[16/10] w-full rounded-2xl object-cover object-center"
                src={rectangle96}
              />
            </aside>

            <motion.form
              animate={{ opacity: 1, y: 0 }}
              className="rounded-[20px] bg-white p-6 shadow-sm sm:p-8"
              initial={{ opacity: 0, y: 18 }}
              onSubmit={handleSubmit}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-[#EE389C]">
                    Acuity Scheduling Preview
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-[#101010]">
                    Schedule your airport ride
                  </h2>
                </div>
                <Badge tone="neutral">Frontend-only</Badge>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-semibold text-slate-700">
                  Full name
                  <input
                    className="min-h-11 rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-[#EE389C] focus:ring-2 focus:ring-pink-100"
                    onChange={(event) => updateField("customerName", event.target.value)}
                    required
                    value={form.customerName}
                  />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-slate-700">
                  Email
                  <input
                    className="min-h-11 rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-[#EE389C] focus:ring-2 focus:ring-pink-100"
                    onChange={(event) => updateField("email", event.target.value)}
                    required
                    type="email"
                    value={form.email}
                  />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-slate-700">
                  Phone
                  <input
                    className="min-h-11 rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-[#EE389C] focus:ring-2 focus:ring-pink-100"
                    onChange={(event) => updateField("phone", event.target.value)}
                    required
                    value={form.phone}
                  />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-slate-700">
                  Trip type
                  <select
                    className="min-h-11 rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-[#EE389C] focus:ring-2 focus:ring-pink-100"
                    onChange={(event) =>
                      updateField("tripType", event.target.value as BookingFormState["tripType"])
                    }
                    value={form.tripType}
                  >
                    <option value="hotel_to_airport">Hotel to airport</option>
                    <option value="airport_to_hotel">Airport to hotel</option>
                  </select>
                </label>
                <label className="grid gap-2 text-sm font-semibold text-slate-700">
                  Pickup location
                  <input
                    className="min-h-11 rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-[#EE389C] focus:ring-2 focus:ring-pink-100"
                    onChange={(event) => updateField("pickup", event.target.value)}
                    required
                    value={form.pickup}
                  />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-slate-700">
                  Dropoff location
                  <input
                    className="min-h-11 rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-[#EE389C] focus:ring-2 focus:ring-pink-100"
                    onChange={(event) => updateField("dropoff", event.target.value)}
                    required
                    value={form.dropoff}
                  />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-slate-700">
                  Date
                  <input
                    className="min-h-11 rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-[#EE389C] focus:ring-2 focus:ring-pink-100"
                    onChange={(event) => updateField("date", event.target.value)}
                    required
                    type="date"
                    value={form.date}
                  />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-slate-700">
                  Time
                  <input
                    className="min-h-11 rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-[#EE389C] focus:ring-2 focus:ring-pink-100"
                    onChange={(event) => updateField("time", event.target.value)}
                    required
                    type="time"
                    value={form.time}
                  />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-slate-700 sm:col-span-2">
                  Passengers
                  <input
                    className="min-h-11 rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-[#EE389C] focus:ring-2 focus:ring-pink-100"
                    max="8"
                    min="1"
                    onChange={(event) => updateField("passengers", event.target.value)}
                    required
                    type="number"
                    value={form.passengers}
                  />
                </label>
              </div>

              {isSubmitted && (
                <div className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800">
                  Appointment request preview created. In production, this would
                  be submitted through Acuity Scheduling.
                </div>
              )}

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Button className="bg-[#EE389C] hover:bg-[#d92d8b]" type="submit">
                  Request appointment
                </Button>
                <Link
                  className="text-sm font-semibold text-slate-600 transition hover:text-[#EE389C]"
                  to="/dashboard"
                >
                  Back to dashboard
                </Link>
              </div>
            </motion.form>
          </div>
        </PageContainer>
      </section>
    </main>
  );
}
