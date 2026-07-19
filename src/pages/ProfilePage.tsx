import { useState } from "react";
import { Copy, Share2, Download, ImagePlus, X, Edit3 } from "lucide-react";
import eleanorAvatar from "../assets/eleanorAvatar.png";
import carCover from "../assets/carCover.png";

export default function ProfilePage() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isEditInfoModalOpen, setIsEditInfoModalOpen] = useState(false);
  const [isEditPasswordModalOpen, setIsEditPasswordModalOpen] = useState(false);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto w-full relative">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[24px] font-bold text-slate-900 mb-2">My Profile</h1>
        <p className="text-sm text-slate-500">
          Manage your account preferences, security settings, notifications, and business configuration in one place.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mb-6">
        {/* Left Column */}
        <div className="flex-1 flex flex-col gap-6">
          
          {/* Personal Information */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm relative">
            <div className="flex items-start justify-between mb-8">
              <h3 className="text-[16px] font-bold text-slate-900">Personal Information</h3>
              <div className="text-right">
                <p className="text-[12px] text-slate-400 mb-0.5">Member since</p>
                <p className="text-[14px] font-medium text-slate-700">5 April, 2026</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
              
              <div className="relative shrink-0">
                <img src={eleanorAvatar} alt="Eleanor Pena" className="w-32 h-32 rounded-full object-cover shadow-sm border border-slate-100" />
                <button 
                  onClick={() => setIsUploadModalOpen(true)}
                  className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-md transition-colors border-2 border-white"
                >
                  <ImagePlus className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4 w-full">
                <div>
                  <p className="text-[12px] text-slate-400 mb-1">Full name</p>
                  <p className="text-[14px] font-bold text-slate-800">Eleanor Pena</p>
                </div>
                <div>
                  <p className="text-[12px] text-slate-400 mb-1">Email address</p>
                  <p className="text-[14px] font-bold text-slate-800">eleanorpena@gmail.com</p>
                </div>
                <div>
                  <p className="text-[12px] text-slate-400 mb-1">Phone number</p>
                  <p className="text-[14px] font-bold text-slate-800">0000 123 1923</p>
                </div>
              </div>
              
              <div className="shrink-0 mt-4 sm:mt-0 sm:absolute sm:bottom-8 sm:right-8">
                <button 
                  onClick={() => setIsEditInfoModalOpen(true)}
                  className="bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-lg font-bold text-[13px] transition-colors shadow-sm w-full sm:w-auto"
                >
                  Edit Information
                </button>
              </div>
            </div>
          </div>

          {/* Security System */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <h3 className="text-[16px] font-bold text-slate-900 mb-4">Security System</h3>
              <p className="text-[12px] text-slate-400 mb-1">Password</p>
              <p className="text-[18px] font-bold text-slate-800 leading-none">*******</p>
            </div>
            <button 
              onClick={() => setIsEditPasswordModalOpen(true)}
              className="bg-green-100 hover:bg-green-200 text-green-700 px-5 py-2.5 rounded-lg font-bold text-[13px] transition-colors shadow-sm"
            >
              Edit Password
            </button>
          </div>
          
        </div>

        {/* Right Column */}
        <div className="flex-1">
          {/* Business Information */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm h-full relative">
            <h3 className="text-[16px] font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">Business Information</h3>
            
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
              
              <div className="relative shrink-0">
                <img src={carCover} alt="Business Cover" className="w-32 h-32 rounded-full object-cover shadow-sm border border-slate-100" />
                <button 
                  onClick={() => setIsUploadModalOpen(true)}
                  className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-md transition-colors border-2 border-white"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4 w-full">
                <div>
                  <p className="text-[12px] text-slate-400 mb-1">Business name</p>
                  <p className="text-[14px] font-bold text-slate-800">Pena Airport Ride</p>
                </div>
                <div>
                  <p className="text-[12px] text-slate-400 mb-1">Email address</p>
                  <p className="text-[14px] font-bold text-slate-800">eleanorpena@gmail.com</p>
                </div>
                <div>
                  <p className="text-[12px] text-slate-400 mb-1">Driver ID</p>
                  <p className="text-[14px] font-bold text-slate-800">#DR0001</p>
                </div>
                <div>
                  <p className="text-[12px] text-slate-400 mb-1">Phone number</p>
                  <p className="text-[14px] font-bold text-slate-800">0000 123 1923</p>
                </div>
                <div>
                  <p className="text-[12px] text-slate-400 mb-1">Business area</p>
                  <p className="text-[14px] font-bold text-slate-800">Miami, FL Airport area</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-[12px] text-slate-400 mb-1">Business details</p>
                  <p className="text-[13px] text-slate-800 leading-relaxed max-w-sm">
                    An independent transportation business designed to help you earn more through direct customer bookings.
                  </p>
                </div>
              </div>
              
              <div className="shrink-0 mt-4 sm:mt-0 sm:absolute sm:bottom-8 sm:right-8">
                <button 
                  onClick={() => setIsEditInfoModalOpen(true)}
                  className="bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-lg font-bold text-[13px] transition-colors shadow-sm w-full sm:w-auto"
                >
                  Edit Information
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Referral Information */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-end justify-between gap-8">
        
        <div className="flex-1 max-w-2xl border-t border-slate-100 pt-6 md:border-none md:pt-0">
          <h3 className="text-[16px] font-bold text-slate-900 mb-6">Referral Information</h3>
          
          <div className="flex flex-col sm:flex-row gap-6 mb-6">
            <div className="flex flex-col gap-2">
              <p className="text-[13px] font-bold text-slate-700">Your referral code</p>
              <div className="bg-slate-100 rounded-lg px-4 py-3 text-[14px] font-bold text-slate-800 border border-slate-200">
                PENA2026
              </div>
            </div>
            
            <div className="flex flex-col gap-2 flex-1 max-w-xs">
              <p className="text-[13px] font-bold text-slate-700">Referral link</p>
              <div className="bg-slate-100 rounded-lg px-4 py-3 text-[14px] font-bold text-slate-800 border border-slate-200 truncate">
                joindriver.com/book
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button className="flex items-center justify-center gap-2 bg-green-100 hover:bg-green-200 text-green-700 px-5 py-2.5 rounded-lg font-bold text-[13px] transition-colors shadow-sm">
              <Copy className="w-4 h-4" />
              Copy link
            </button>
            <button className="flex items-center justify-center gap-2 bg-green-100 hover:bg-green-200 text-green-700 px-5 py-2.5 rounded-lg font-bold text-[13px] transition-colors shadow-sm">
              <Share2 className="w-4 h-4" />
              Share link
            </button>
            <button className="flex items-center justify-center gap-2 bg-green-100 hover:bg-green-200 text-green-700 px-5 py-2.5 rounded-lg font-bold text-[13px] transition-colors shadow-sm">
              <Download className="w-4 h-4" />
              Download QR Code
            </button>
          </div>
        </div>

        <div className="shrink-0 mx-auto md:mx-0 bg-slate-50 p-4 rounded-2xl border border-slate-100">
          {/* Static Mock QR Code SVG */}
          <svg width="120" height="120" viewBox="0 0 100 100" fill="currentColor" className="text-slate-900">
            <path d="M0,0 h30 v30 h-30 z M10,10 h10 v10 h-10 z" />
            <path d="M70,0 h30 v30 h-30 z M80,10 h10 v10 h-10 z" />
            <path d="M0,70 h30 v30 h-30 z M10,80 h10 v10 h-10 z" />
            <path d="M40,0 h20 v10 h-20 z M40,20 h10 v10 h-10 z" />
            <path d="M0,40 h10 v10 h-10 z M20,40 h20 v10 h-20 z M50,40 h10 v20 h-10 z M70,40 h30 v10 h-30 z" />
            <path d="M10,60 h20 v10 h-20 z M40,60 h10 v30 h-10 z M60,60 h20 v10 h-20 z M90,60 h10 v20 h-10 z" />
            <path d="M70,80 h10 v10 h-10 z M90,90 h10 v10 h-10 z" />
            <path d="M40,90 h20 v10 h-20 z" />
          </svg>
        </div>
      </div>

      {/* --- MODALS --- */}
      
      {/* Upload Image Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-[500px] shadow-xl p-8 relative zoom-in-95 animate-in duration-200">
            <button onClick={() => setIsUploadModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-[18px] font-bold text-slate-900 mb-8">Update Profile Image</h2>
            
            <div className="flex flex-col items-center justify-center mb-8">
              <div className="w-32 h-32 rounded-full border-2 border-dashed border-slate-300 bg-slate-50 flex items-center justify-center relative mb-4 cursor-pointer hover:bg-slate-100 transition-colors">
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center shadow-sm border-4 border-white">
                  <ImagePlus className="w-5 h-5" />
                </div>
              </div>
              <p className="text-[12px] text-slate-500">Upload PNG, SVG format Img</p>
            </div>
            
            <div className="flex justify-center">
              <button onClick={() => setIsUploadModalOpen(false)} className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-bold text-[14px] transition-colors shadow-sm">
                Upload Profile Image
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Information Modal */}
      {isEditInfoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-[650px] shadow-xl p-8 relative zoom-in-95 animate-in duration-200">
            <button onClick={() => setIsEditInfoModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-[18px] font-bold text-slate-900 mb-6">Edit Personal Information</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-bold text-slate-700">Name</label>
                <input type="text" defaultValue="Eleanor Pena" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[14px] font-medium text-slate-600 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-bold text-slate-700">Email Address</label>
                <input type="email" defaultValue="Eleanor Pena" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[14px] font-medium text-slate-600 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-bold text-slate-700">Phone Number</label>
                <input type="text" defaultValue="Eleanor Pena" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[14px] font-medium text-slate-600 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-bold text-slate-700">Business name</label>
                <input type="text" defaultValue="Eleanor Pena" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[14px] font-medium text-slate-600 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-bold text-slate-700">Business area (City)</label>
                <input type="text" defaultValue="Eleanor Pena" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[14px] font-medium text-slate-600 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-bold text-slate-700">Business area (Airport)</label>
                <input type="text" defaultValue="Eleanor Pena" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[14px] font-medium text-slate-600 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-colors" />
              </div>
            </div>
            
            <div className="flex justify-center">
              <button onClick={() => setIsEditInfoModalOpen(false)} className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-bold text-[14px] transition-colors shadow-sm">
                Update Information
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Password Modal */}
      {isEditPasswordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-[500px] shadow-xl p-8 relative zoom-in-95 animate-in duration-200">
            <button onClick={() => setIsEditPasswordModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-[18px] font-bold text-slate-900 mb-6">Edit Password</h2>
            
            <div className="flex flex-col gap-6 mb-8">
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-bold text-slate-700">Old Password</label>
                <input type="password" defaultValue="******" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-[14px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-bold text-slate-700">New Password</label>
                <input type="password" defaultValue="******" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-[14px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-bold text-slate-700">Confirm Password</label>
                <input type="password" defaultValue="******" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-[14px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-colors" />
              </div>
            </div>
            
            <div className="flex justify-start">
              <button onClick={() => setIsEditPasswordModalOpen(false)} className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-bold text-[14px] transition-colors shadow-sm">
                Update Password
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
