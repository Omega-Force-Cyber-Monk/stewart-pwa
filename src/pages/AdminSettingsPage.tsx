import { useState } from "react";
import {
  User,
  Monitor,
  Bell,
  ShieldCheck,
  Edit,
  Loader2,
  Save,
} from "lucide-react";
import { cn } from "../lib/cn";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { logOut, updateUser } from "../store/features/auth/authSlice";
import {
  useGetRiderProfileQuery,
  useUpdateRiderProfileMutation,
  useChangeRiderPasswordMutation,
} from "../store/api/Auth/auth.api";
import {
  useGetAdminSettingsQuery,
  useUpdateAdminSettingMutation,
} from "../store/api/Admin/admin.api";
import type { SettingKey } from "../store/api/Admin/admin.type";
import { useConfirmDialog } from "../hooks/useConfirmDialog";

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
      <div>
        {activeTab === "Account Settings" && <AccountSettingsTab />}
        {activeTab === "Platform Settings" && <SettingsTab title="Platform Settings" settingKey="platform" />}
        {activeTab === "Notifications" && <SettingsTab title="Notifications" settingKey="notifications" />}
        {activeTab === "Legal & Compliance" && <SettingsTab title="Legal & Compliance" settingKey="legalCompliance" />}
      </div>
    </div>
  );
}

function AccountSettingsTab() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const { data: profileResponse, isLoading: isLoadingProfile } = useGetRiderProfileQuery();
  const [updateProfile, { isLoading: isUpdatingProfile }] = useUpdateRiderProfileMutation();
  const [changePassword, { isLoading: isChangingPassword }] = useChangeRiderPasswordMutation();

  const profile = profileResponse?.user || user;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [hasEdited, setHasEdited] = useState(false);
  // Hydrate only from the fresh /auth/me response — the store/localStorage copy
  // is a login-time snapshot and can be stale after a profile edit.
  if (!hasEdited && profileResponse?.user) {
    setName(profileResponse.user.name || "");
    setPhone(profileResponse.user.phone || "");
    setHasEdited(true);
  }
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { showAlert, alertDialog } = useConfirmDialog();

  const handleSaveProfile = async () => {
    try {
      const res = await updateProfile({ name, phone }).unwrap();
      if (res.user) {
        dispatch(updateUser(res.user));
      }
      showAlert({ title: "Success", message: "Profile updated.", type: "success" });
    } catch (err) {
      console.error("Failed to update profile:", err);
      showAlert({ title: "Error", message: "Failed to update profile.", type: "error" });
    }
  };

  const handleSavePassword = async () => {
    setPasswordError("");
    if (!currentPassword || !password || !confirmPassword) {
      setPasswordError("All password fields are required.");
      return;
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/.test(password)) {
      setPasswordError("Password must be at least 8 characters with upper, lower, number, and special character.");
      return;
    }
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }
    try {
      await changePassword({ currentPassword, password, confirmPassword }).unwrap();
      // Password change revokes all refresh tokens — force re-login
      dispatch(logOut());
      navigate("/login");
    } catch (err) {
      console.error("Failed to change password:", err);
      setPasswordError("Password change failed. Current password may be incorrect.");
    }
  };

  if (isLoadingProfile) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-8 h-8 text-[#1a56ff] animate-spin" />
      </div>
    );
  }

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
            {profile?.avatarUrl ? (
              <img src={profile.avatarUrl} alt="Profile" className="w-32 h-32 rounded-full object-cover border-4 border-slate-50 shadow-sm" />
            ) : (
              <div className="w-32 h-32 rounded-full bg-[#1a56ff] text-white flex items-center justify-center text-4xl font-bold">
                {(profile?.name || profile?.email || "?").slice(0, 2).toUpperCase()}
              </div>
            )}
            <span className="text-sm text-slate-500 font-medium">Profile Picture</span>
          </div>

          <div className="flex-1 space-y-4 w-full">
            <div className="flex items-center gap-4">
              <label className="w-32 text-sm font-medium text-slate-500 flex-shrink-0">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => { setHasEdited(true); setName(e.target.value); }}
                className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors text-slate-800"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-32 text-sm font-medium text-slate-500 flex-shrink-0">Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => { setHasEdited(true); setPhone(e.target.value); }}
                className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors text-slate-800"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-32 text-sm font-medium text-slate-500 flex-shrink-0">Email Address</label>
              <input
                type="email"
                value={profile?.email || ""}
                disabled
                className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-32 text-sm font-medium text-slate-500 flex-shrink-0">Role</label>
              <input
                type="text"
                value={profile?.role || "rider"}
                disabled
                className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed capitalize"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <button
            onClick={handleSaveProfile}
            disabled={isUpdatingProfile}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1a56ff] text-white font-medium hover:bg-blue-700 transition-colors text-sm disabled:opacity-50"
          >
            {isUpdatingProfile ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Profile
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
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-500 mb-2">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter Current Password"
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors text-slate-800"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-500 mb-2">New Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter New Password"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors text-slate-800"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-500 mb-2">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm New Password"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors text-slate-800"
              />
            </div>
          </div>
          {passwordError && <p className="text-sm text-red-500">{passwordError}</p>}
          <p className="text-xs text-slate-500">Minimum 8 chars with upper, lower, number, and special character.</p>
          <div className="flex justify-end">
            <button
              onClick={handleSavePassword}
              disabled={isChangingPassword}
              className="px-4 py-2 rounded-lg bg-[#1a56ff] text-white font-medium hover:bg-blue-700 transition-colors text-sm disabled:opacity-50"
            >
              {isChangingPassword ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Password"}
            </button>
          </div>
        </div>
      </div>

      {/* Sweet-alert style modal */}
      {alertDialog}
    </div>
  );
}

function SettingsTab({ title, settingKey }: { title: string; settingKey: SettingKey }) {
  const { data, isLoading, isError } = useGetAdminSettingsQuery();
  const [updateSetting, { isLoading: isSaving }] = useUpdateAdminSettingMutation();
  const { showAlert, alertDialog } = useConfirmDialog();

  const value = (data?.settings?.[settingKey] || {}) as Record<string, unknown>;

  const [form, setForm] = useState<Record<string, string>>({});
  const [editing, setEditing] = useState(false);

  const startEditing = () => {
    const entries: Record<string, string> = {};
    for (const [k, v] of Object.entries(value)) {
      entries[k] = typeof v === "boolean" ? (v ? "true" : "false") : String(v ?? "");
    }
    setForm(entries);
    setEditing(true);
  };

  const handleSave = async () => {
    // Convert "true"/"false" back to booleans, keep everything else as strings
    const payload: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(form)) {
      if (v === "true") payload[k] = true;
      else if (v === "false") payload[k] = false;
      else payload[k] = v;
    }
    try {
      await updateSetting({ key: settingKey, value: payload }).unwrap();
      setEditing(false);
      showAlert({ title: "Success", message: "Settings saved.", type: "success" });
    } catch (err) {
      console.error("Failed to save settings:", err);
      showAlert({ title: "Error", message: "Failed to save settings.", type: "error" });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-8 h-8 text-[#1a56ff] animate-spin" />
      </div>
    );
  }

  if (isError) {
    return <p className="text-sm text-slate-500">Failed to load settings.</p>;
  }

  const entries = Object.entries(value);

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8 max-w-4xl">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-800">{title}</h3>
          <p className="text-sm text-slate-500 mt-1">Global configuration for the service instance</p>
        </div>
        {!editing && (
          <button
            onClick={startEditing}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-blue-200 text-[#1a56ff] font-medium hover:bg-blue-50 transition-colors text-sm"
          >
            <Edit className="w-4 h-4" />
            Edit
          </button>
        )}
      </div>

      {entries.length === 0 && !editing ? (
        <p className="text-sm text-slate-400">No settings saved yet for this section.</p>
      ) : editing ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.keys(form).map((key) => (
            <div key={key}>
              <label className="block text-sm font-medium text-slate-500 mb-2 capitalize">
                {key.replace(/([A-Z])/g, " $1")}
              </label>
              <input
                type="text"
                value={form[key]}
                onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors text-slate-800"
              />
            </div>
          ))}
          <div className="md:col-span-2 flex justify-end gap-3 mt-4">
            <button
              onClick={() => setEditing(false)}
              className="px-4 py-2 rounded-lg border border-slate-300 text-slate-600 font-medium hover:bg-slate-50 transition-colors text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1a56ff] text-white font-medium hover:bg-blue-700 transition-colors text-sm disabled:opacity-50"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {entries.map(([key, val]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-slate-500 mb-2 capitalize">
                {key.replace(/([A-Z])/g, " $1")}
              </label>
              <div className="px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 text-sm">
                {typeof val === "boolean" ? (val ? "Enabled" : "Disabled") : String(val ?? "—")}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Sweet-alert style modal */}
      {alertDialog}
    </div>
  );
}
