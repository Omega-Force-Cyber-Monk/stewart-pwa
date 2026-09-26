import { useEffect, useState } from "react";
import { Camera, Edit, Loader2, Save, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { updateUser } from "../store/features/auth/authSlice";
import {
  useChangeRiderPasswordMutation,
  useGetRiderProfileQuery,
  useUpdateRiderProfileMutation,
  useUploadAvatarMutation
} from "../store/api/Auth/auth.api";

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return "MN";
}

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Settings</h2>
        <p className="mt-1 text-sm text-slate-500">Manage your profile, preferences, and account security.</p>
      </div>
      <AccountSettings />
    </div>
  );
}

function AccountSettings() {
  const dispatch = useAppDispatch();
  const fallback = useAppSelector((state) => state.auth.user);
  const { data, isLoading } = useGetRiderProfileQuery();
  const [updateProfile, { isLoading: saving }] = useUpdateRiderProfileMutation();
  const [uploadAvatar, { isLoading: uploadingAvatar }] = useUploadAvatarMutation();
  const [changePassword, { isLoading: changing }] = useChangeRiderPasswordMutation();

  const profile = data?.user || fallback;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setEmail(profile.email || "");
      setPhone(profile.phone || "");
    }
  }, [profile]);

  const saveProfile = async () => {
    setMessage(null);
    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedName) {
      setMessage({ type: "error", text: "Full name is required." });
      return;
    }

    try {
      const response = await updateProfile({
        name: trimmedName,
        phone: trimmedPhone || null,
      }).unwrap();
      if (response.user) dispatch(updateUser(response.user));
      setMessage({ type: "success", text: "Profile information updated." });
    } catch {
      setMessage({ type: "error", text: "Unable to update profile information." });
    }
  };

  const avatar = async (file: File) => {
    setMessage(null);
    const form = new FormData();
    form.append("file", file);
    try {
      const response = await uploadAvatar(form).unwrap();
      if (response.user) {
        dispatch(updateUser(response.user));
      } else if (profile) {
        dispatch(updateUser({ ...profile, avatarUrl: response.avatarUrl }));
      }
      setMessage({ type: "success", text: "Profile image updated." });
    } catch {
      setMessage({ type: "error", text: "Unable to upload profile image." });
    }
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
              getInitials(name || profile?.name || "Mark Nelson")
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
            <label className="text-sm text-slate-500">
              Phone Number
              <input
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="mt-1 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-800"
                placeholder="+1 555 123 4567"
              />
            </label>
          </div>
        </div>
        {message && (
          <p className={`mt-4 rounded-lg px-3 py-2 text-sm font-medium ${message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
            {message.text}
          </p>
        )}
        <button
          type="button"
          onClick={saveProfile}
          disabled={saving || uploadingAvatar}
          className="mt-5 rounded-lg border border-blue-600 px-4 py-2 text-sm font-semibold text-blue-600 disabled:opacity-50"
        >
          {saving ? <Loader2 className="mr-2 inline h-4 w-4 animate-spin" /> : <Save className="mr-2 inline h-4 w-4" />}
          Save Profile
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

