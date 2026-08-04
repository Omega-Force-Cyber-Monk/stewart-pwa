import { useState } from "react";
import { 
  User, 
  Monitor, 
  Bell, 
  ShieldCheck,
  Camera,
  Edit,
  Shield,
  FileText
} from "lucide-react";
import { cn } from "../lib/cn";

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState("Account Settings");

  const tabs = [
    { name: "Account Settings", icon: User },
    { name: "Platform Settings", icon: Monitor },
    { name: "Notifications", icon: Bell },
    { name: "Legal & Compliance", icon: ShieldCheck },
  ];

  return (
    <div className="flex flex-col space-y-6 flex-1">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Settings</h2>
        <p className="text-slate-500 text-sm mt-1">
          Manage your platform settings, preferences, and system configuration.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-slate-200 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={cn(
              "flex items-center gap-2 pb-4 text-sm font-medium transition-colors relative whitespace-nowrap",
              activeTab === tab.name 
                ? "text-[#1a56ff]" 
                : "text-slate-500 hover:text-slate-700"
            )}
          >
            <tab.icon className="w-4 h-4" />
            {tab.name}
            {activeTab === tab.name && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1a56ff] rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content Area */}
      <div className="">
        {activeTab === "Account Settings" && <AccountSettingsTab />}
        {activeTab === "Platform Settings" && <PlatformSettingsTab />}
        {activeTab === "Notifications" && <NotificationsTab />}
        {activeTab === "Legal & Compliance" && <LegalComplianceTab />}
      </div>
    </div>
  );
}

function AccountSettingsTab() {
  return (
    <div className="space-y-6 max-w-4xl">
      {/* Personal Information */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-slate-800">Personal Information</h3>
          <p className="text-sm text-slate-500 mt-1">Update your account identity and contact details.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-[#1a56ff] text-white flex items-center justify-center text-4xl font-bold">
                SW
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#1a56ff] text-white border-2 border-white flex items-center justify-center shadow-sm hover:bg-blue-700 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <span className="text-sm text-slate-500 font-medium">Profile Picture</span>
          </div>

          <div className="flex-1 space-y-4 w-full">
            <div className="flex items-center gap-4">
              <label className="w-32 text-sm font-medium text-slate-500 flex-shrink-0">Full Name</label>
              <input 
                type="text" 
                defaultValue="Stewart"
                className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors text-slate-800"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-32 text-sm font-medium text-slate-500 flex-shrink-0">Email Address</label>
              <input 
                type="email" 
                defaultValue="stewart@gmail.com"
                className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors text-slate-800"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-32 text-sm font-medium text-slate-500 flex-shrink-0">Role</label>
              <input 
                type="text" 
                defaultValue="Administrator"
                className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors text-slate-800"
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end mt-8">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-blue-200 text-[#1a56ff] font-medium hover:bg-blue-50 transition-colors text-sm">
            Edit Profile
            <Edit className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Security */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Security</h3>
            <p className="text-sm text-slate-500 mt-1">Protect your account with a secure password</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-blue-200 text-[#1a56ff] font-medium hover:bg-blue-50 transition-colors text-sm">
            Edit Password
            <Edit className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-500 mb-2">Current Password</label>
            <input 
              type="password" 
              placeholder="Enter Current Password"
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors text-slate-800"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-500 mb-2">New Password</label>
              <input 
                type="password" 
                placeholder="Enter New Password"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors text-slate-800"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-500 mb-2">Confirm New Password</label>
              <input 
                type="password" 
                placeholder="Confirm New Password"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors text-slate-800"
              />
            </div>
          </div>
          <p className="text-xs text-slate-500">Minimum length. Uppercase and lowercase letters.</p>
          <div className="flex justify-end">
            <button className="px-4 py-2 rounded-lg bg-[#1a56ff] text-white font-medium hover:bg-blue-700 transition-colors text-sm">
              Save Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PlatformSettingsTab() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8 max-w-4xl">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Platform Settings</h3>
          <p className="text-sm text-slate-500 mt-1">Global configuration for the service instance</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-blue-200 text-[#1a56ff] font-medium hover:bg-blue-50 transition-colors text-sm">
          Edit
          <Edit className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-500 mb-2">Platform Name</label>
          <input 
            type="text" 
            defaultValue="QuitTheApp"
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors text-slate-800"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-500 mb-2">Support Email</label>
          <input 
            type="email" 
            defaultValue="support@quittheapp.io"
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors text-slate-800"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-500 mb-2">Platform Logo</label>
          <input 
            type="text" 
            defaultValue="QuitTheApp logo"
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors text-slate-800"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-500 mb-2">Default Notifications</label>
          <input 
            type="text" 
            defaultValue="Enabled"
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors text-slate-800"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-500 mb-2">Driver Categories</label>
          <input 
            type="text" 
            defaultValue="Women Focused, Couples, Drivers 50+, Main, Spanish"
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors text-slate-800"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-500 mb-2">Payment Settings</label>
          <input 
            type="text" 
            defaultValue="Stripe"
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors text-slate-800"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-500 mb-2">System Maintenance Messaging</label>
          <input 
            type="text" 
            defaultValue="No active maintenance message"
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors text-slate-800"
          />
        </div>
      </div>
    </div>
  );
}

function NotificationsTab() {
  const notifications = [
    { title: "New driver registration", time: "Enabled", unread: true },
    { title: "New payment", time: "Enabled", unread: false },
    { title: "Failed payment", time: "Enabled", unread: false },
    { title: "New support ticket", time: "Enabled", unread: false },
    { title: "Driver ready for review", time: "Enabled", unread: true },
    { title: "We Do It for You upgrade purchased", time: "Enabled", unread: true },
    { title: "New resource request", time: "Enabled", unread: true },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm max-w-4xl">
      <div className="flex justify-between items-center p-6 border-b border-slate-100">
        <h3 className="text-xl font-bold text-slate-800">Notifications</h3>
        <button className="px-4 py-2 rounded-lg bg-[#1a56ff] text-white font-medium hover:bg-blue-700 transition-colors text-sm">
          Read All
        </button>
      </div>

      <div className="divide-y divide-slate-100">
        {notifications.map((notif, idx) => (
          <div key={idx} className="flex items-center justify-between p-6 hover:bg-slate-50 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full border border-blue-200 text-blue-500 flex items-center justify-center flex-shrink-0">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <p className="text-slate-800 font-medium text-sm">{notif.title}</p>
                <p className="text-slate-500 text-xs mt-1">{notif.time}</p>
              </div>
            </div>
            {notif.unread && (
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400 flex-shrink-0"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function LegalComplianceTab() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8 max-w-4xl">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-800">Legal & Compliance</h3>
        <p className="text-sm text-slate-500 mt-1">Access and manage platform policies, terms, and legal guidelines to ensure proper usage and compliance.</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-slate-400" />
            <span className="font-medium text-slate-700">Privacy Policy</span>
          </div>
          <button className="text-[#1a56ff] font-bold text-sm hover:underline">
            View
          </button>
        </div>
        <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-slate-400" />
            <span className="font-medium text-slate-700">Terms of Service</span>
          </div>
          <button className="text-[#1a56ff] font-bold text-sm hover:underline">
            View
          </button>
        </div>
        {[
          "Refund Policy",
          "Business disclaimer",
          "Earnings disclaimer",
          "Transportation and insurance requirements",
          "Cookie notice",
        ].map((item) => (
          <div key={item} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-slate-400" />
              <span className="font-medium text-slate-700">{item}</span>
            </div>
            <button className="text-[#1a56ff] font-bold text-sm hover:underline">
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
