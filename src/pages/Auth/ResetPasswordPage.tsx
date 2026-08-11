import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useResetUserPasswordMutation } from "../../store/api/Auth/auth.api";
import { AuthLayout } from "../../components/layout/AuthLayout";
import { Loader2, Mail, Lock, Eye, EyeOff, KeyRound, AlertTriangle, CheckCircle } from "lucide-react";

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState(() => searchParams.get("email") ?? "");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [successReset, setSuccessReset] = useState(false);

  const navigate = useNavigate();
  const [resetPassword, { isLoading, error }] = useResetUserPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    if (!email.trim() || !otp.trim() || !password.trim() || !confirmPassword.trim()) {
      setValidationError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setValidationError("Passwords do not match.");
      return;
    }

    try {
      const result = await resetPassword({ email, otp, password, confirmPassword }).unwrap();
      if (result.success) {
        setSuccessReset(true);
      }
    } catch (err) {
      console.error("Password reset failed:", err);
    }
  };

  // Safe cast for RTK Query error message
  const getErrorMessage = () => {
    if (validationError) return validationError;
    if (!error) return "";
    if ("data" in error) {
      const data = error.data as { message?: string | string[] };
      if (Array.isArray(data.message)) {
        return data.message[0];
      }
      return data.message || "Failed to reset password. Please check input parameters.";
    }
    return "Something went wrong. Please check your connection.";
  };

  const errorMessage = getErrorMessage();

  return (
    <AuthLayout
      title="Create New Password"
      subtitle="Complete your verification by entering your 6-digit OTP code and choose a secure new password for your account."
    >
      {!successReset ? (
        <>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-100">
              Reset your password
            </h2>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {errorMessage && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start gap-3">
                <AlertTriangle className="size-5 text-red-400 shrink-0 mt-0.5" />
                <span className="text-sm text-red-200 leading-snug">{errorMessage}</span>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                Email address
              </label>
              <div className="mt-2 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-slate-500" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="block w-full pl-10 pr-3 py-2.5 bg-brand-input border border-brand-border rounded-md text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
                />
              </div>
            </div>

            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-slate-300">
                OTP verification code
              </label>
              <div className="mt-2 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <KeyRound className="size-5 text-slate-500" />
                </div>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  required
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="6-digit reset code"
                  className="block w-full pl-10 pr-3 py-2.5 bg-brand-input border border-brand-border rounded-md text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 tracking-wider text-center transition"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                New Password
              </label>
              <div className="mt-2 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-slate-500" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full pl-10 pr-10 py-2.5 bg-brand-input border border-brand-border rounded-md text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-300">
                Confirm New Password
              </label>
              <div className="mt-2 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-slate-500" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full pl-10 pr-10 py-2.5 bg-brand-input border border-brand-border rounded-md text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300"
                >
                  {showConfirmPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center gap-2 h-10 px-4 border border-transparent rounded-md text-sm font-semibold text-white bg-brand-btn hover:bg-brand-btn-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-page focus:ring-cyan-500 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading && <Loader2 className="size-4 animate-spin" />}
                Reset Password
              </button>
            </div>
          </form>
        </>
      ) : (
        <div className="text-center py-6">
          <CheckCircle className="size-16 text-cyan-400 mx-auto animate-pulse" />
          <p className="mt-4 text-slate-200 text-sm font-semibold leading-relaxed">
            Your password has been successfully updated. You can now use your new password to sign in.
          </p>
          <div className="mt-8">
            <button
              onClick={() => navigate("/login")}
              className="w-full flex justify-center items-center h-10 px-4 border border-transparent rounded-md text-sm font-semibold text-white bg-brand-btn hover:bg-brand-btn-hover transition"
            >
              Proceed to Login
            </button>
          </div>
        </div>
      )}
    </AuthLayout>
  );
}
