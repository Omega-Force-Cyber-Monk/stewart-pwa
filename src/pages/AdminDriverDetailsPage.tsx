import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminDriverDetailsPage() {
  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/admin/drivers" className="text-slate-500 hover:text-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-baseline gap-2">
            <h2 className="text-xl font-bold text-slate-800">Eleanor Pena</h2>
            <span className="text-sm font-medium text-slate-400">#DR0001</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 text-green-600 border border-green-100">
          <CheckCircle2 className="w-4 h-4" />
          <span className="text-sm font-semibold">Verified</span>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Driver Information Card */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Driver Information</h3>
          
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-start">
            <img 
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&q=80" 
              alt="Eleanor Pena" 
              className="w-32 h-32 rounded-full object-cover border-4 border-slate-50 shadow-sm flex-shrink-0"
            />
            
            <div className="flex-1 w-full space-y-4">
              <div className="flex justify-between items-start border-b border-slate-50 pb-3">
                <span className="text-sm text-slate-500">Full name</span>
                <span className="text-sm font-medium text-slate-800 text-right">Eleanor Pena</span>
              </div>
              <div className="flex justify-between items-start border-b border-slate-50 pb-3">
                <span className="text-sm text-slate-500">Driver ID</span>
                <span className="text-sm font-medium text-slate-800 text-right">#DR0001</span>
              </div>
              <div className="flex justify-between items-start border-b border-slate-50 pb-3">
                <span className="text-sm text-slate-500">Email address</span>
                <span className="text-sm font-medium text-slate-800 text-right">eleanorpena@gmail.com</span>
              </div>
              <div className="flex justify-between items-start border-b border-slate-50 pb-3">
                <span className="text-sm text-slate-500">Phone number</span>
                <span className="text-sm font-medium text-slate-800 text-right">0000 123 1923</span>
              </div>
              <div className="flex justify-between items-start border-b border-slate-50 pb-3">
                <span className="text-sm text-slate-500">Driver Category</span>
                <span className="text-sm font-medium text-slate-800 text-right">Women</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-sm text-slate-500">Joined Date</span>
                <span className="text-sm font-medium text-slate-800 text-right">5 April, 2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* Business Information Card */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Business Information</h3>
          
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-start">
            <img 
              src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=300&h=300&fit=crop&q=80" 
              alt="Business Car" 
              className="w-32 h-32 rounded-full object-cover border-4 border-slate-50 shadow-sm flex-shrink-0"
            />
            
            <div className="flex-1 w-full space-y-4">
              <div className="flex justify-between items-start border-b border-slate-50 pb-3">
                <span className="text-sm text-slate-500">Business name</span>
                <span className="text-sm font-medium text-slate-800 text-right">Pena Airport Ride</span>
              </div>
              <div className="flex justify-between items-start border-b border-slate-50 pb-3">
                <span className="text-sm text-slate-500">Business area</span>
                <span className="text-sm font-medium text-slate-800 text-right">Miami, FL Airport area</span>
              </div>
              <div className="flex justify-between items-start border-b border-slate-50 pb-3">
                <span className="text-sm text-slate-500">Email address</span>
                <span className="text-sm font-medium text-slate-800 text-right">eleanorpena@gmail.com</span>
              </div>
              <div className="flex justify-between items-start border-b border-slate-50 pb-3">
                <span className="text-sm text-slate-500">Phone number</span>
                <span className="text-sm font-medium text-slate-800 text-right">0000 123 1923</span>
              </div>
              <div className="flex justify-between items-start pt-1">
                <span className="text-sm text-slate-500 flex-shrink-0 mr-4">Business details</span>
                <span className="text-sm font-medium text-slate-800 text-right leading-relaxed">
                  An independent transportation business designed to help you earn more through direct customer bookings.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end items-center gap-4 pt-4">
        <button className="px-6 py-2.5 rounded-lg border border-red-200 text-red-500 font-medium hover:bg-red-50 transition-colors text-sm">
          Delete Driver
        </button>
        <button className="px-6 py-2.5 rounded-lg bg-[#22c55e] hover:bg-[#16a34a] text-white font-medium shadow-sm shadow-green-500/20 transition-colors text-sm">
          Activate Account
        </button>
      </div>
    </div>
  );
}
