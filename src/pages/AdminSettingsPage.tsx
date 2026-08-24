import { useEffect, useState } from "react";
import { Camera, Edit, Loader2, Monitor, Save, ShieldCheck, User, Eye, EyeOff } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { updateUser } from "../store/features/auth/authSlice";
import {
  useChangeRiderPasswordMutation,
  useGetRiderProfileQuery,
  useUpdateRiderProfileMutation,
  useUploadAvatarMutation
} from "../store/api/Auth/auth.api";
import { useGetAdminSettingsQuery, useUpdateAdminSettingMutation } from "../store/api/Admin/admin.api";
import type { SettingKey } from "../store/api/Admin/admin.type";

const tabs: Array<{ key: "account" | SettingKey; label: string; icon: typeof User }> = [
  { key: "account", label: "Account Settings", icon: User },
  { key: "platform", label: "Platform Settings", icon: Monitor }
];

export default function AdminSettingsPage() {
  const [active, setActive] = useState<"account" | SettingKey>("account");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Settings</h2>
        <p className="mt-1 text-sm text-slate-500">Manage your platform settings, preferences, and system configuration.</p>
      </div>
      <div className="flex gap-5 overflow-x-auto border-b border-slate-200">
        {tabs.map((tab) => (
          <button
            type="button"
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-1 pb-3 text-sm ${
              active === tab.key ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500"
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>
      {active === "account" ? (
        <AccountSettings />
      ) : (
        <JsonSettings settingKey={active} label={tabs.find((tab) => tab.key === active)?.label || active} />
      )}
    </div>
  );
}

function AccountSettings() {
  const dispatch = useAppDispatch();
  const fallback = useAppSelector((state) => state.auth.user);
  const { data, isLoading } = useGetRiderProfileQuery();
  const [updateProfile, { isLoading: saving }] = useUpdateRiderProfileMutation();
  const [uploadAvatar] = useUploadAvatarMutation();
  const [changePassword, { isLoading: changing }] = useChangeRiderPasswordMutation();

  const profile = data?.user || fallback;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setEmail(profile.email || "");
    }
  }, [profile]);

  const saveProfile = async () => {
    const response = await updateProfile({ name, phone: profile?.phone }).unwrap();
    if (response.user) dispatch(updateUser(response.user));
  };

  const avatar = async (file: File) => {
    const form = new FormData();
    form.append("file", file);
    await uploadAvatar(form).unwrap();
  };

  if (isLoading) return <Loader2 className="mx-auto my-12 h-7 w-7 animate-spin text-blue-600" />;

  return (
    <div className="space-y-5">
      <section className="rounded-xl bg-white p-6 shadow-sm">
        <h3 className="border-b border-slate-100 pb-4 text-lg font-semibold text-slate-900">Personal Information</h3>
        <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-center">
          <label className="relative grid h-28 w-28 shrink-0 cursor-pointer place-items-center rounded-full bg-blue-600 text-3xl font-bold text-white">
            {profile?.avatarUrl ? (
              <img src={profile.avatarUrl} alt="Profile" className="h-full w-full rounded-full object-cover" />
            ) : (
              (name || "A").slice(0, 2).toUpperCase()
            )}
            <span className="absolute bottom-0 right-0 grid h-8 w-8 place-items-center rounded-full bg-blue-500">
              <Camera className="h-4 w-4" />
            </span>
            <input
              type="file"
              accept="image/png,image/jpeg,image/svg+xml"
              className="hidden"
              onChange={(event) => event.target.files?.[0] && avatar(event.target.files[0])}
            />
          </label>
          <div className="grid flex-1 gap-4">
            <label className="text-sm text-slate-500">
              Full Name
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="mt-1 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-800"
              />
            </label>
            <label className="text-sm text-slate-500">
              Email Address
              <input
                value={email}
                readOnly
                className="mt-1 h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-500"
              />
            </label>
          </div>
        </div>
        <button
          type="button"
          onClick={saveProfile}
          disabled={saving}
          className="mt-5 rounded-lg border border-blue-600 px-4 py-2 text-sm font-semibold text-blue-600"
        >
          <Save className="mr-2 inline h-4 w-4" />
          Edit Profile
        </button>
      </section>

      <section className="rounded-xl bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Security</h3>
            <p className="mt-1 text-sm text-slate-500">Protect your account with a secure password</p>
          </div>
          <ShieldCheck className="h-5 w-5 text-blue-600" />
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Current Password"
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
              className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 pr-10 text-sm text-slate-900 placeholder:text-slate-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 pr-10 text-sm text-slate-900 placeholder:text-slate-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirm}
              onChange={(event) => setConfirm(event.target.value)}
              className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 pr-10 text-sm text-slate-900 placeholder:text-slate-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
        <button
          type="button"
          disabled={changing || !currentPassword || !password || password !== confirm}
          onClick={() => {
            changePassword({ currentPassword, password, confirmPassword: confirm });
            setCurrentPassword("");
            setPassword("");
            setConfirm("");
          }}
          className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
        >
          <Edit className="mr-2 inline h-4 w-4" />
          Edit Password
        </button>
      </section>
    </div>
  );
}

function JsonSettings({ settingKey, label }: { settingKey: SettingKey; label: string }) {
  const { data, isLoading } = useGetAdminSettingsQuery();
  const [save, { isLoading: saving }] = useUpdateAdminSettingMutation();
  const source = data?.settings?.[settingKey] || {};
  const [form, setForm] = useState<Record<string, string>>({});

  useEffect(() => {
    setForm(Object.fromEntries(Object.entries(source).map(([key, value]) => [key, String(value)])));
  }, [settingKey, data, source]);

  if (isLoading) return <Loader2 className="mx-auto my-12 h-7 w-7 animate-spin text-blue-600" />;

  return (
    <section className="max-w-4xl rounded-xl bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">{label}</h3>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {Object.entries(form).map(([key, value]) => (
          <label key={key} className="text-sm capitalize text-slate-500">
            {key.replace(/([A-Z])/g, " $1")}
            <input
              value={value}
              onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))}
              className="mt-1 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-800"
            />
          </label>
        ))}
      </div>
      <button
        type="button"
        disabled={saving}
        onClick={() =>
          save({
            key: settingKey,
            value: Object.fromEntries(
              Object.entries(form).map(([key, value]) => [key, value === "true" ? true : value === "false" ? false : value])
            )
          })
        }
        className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
      >
        <Save className="mr-2 inline h-4 w-4" />
        Save changes
      </button>
    </section>
  );
}
