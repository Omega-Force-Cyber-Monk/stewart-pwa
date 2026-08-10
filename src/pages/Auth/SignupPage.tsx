import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useRegisterRiderMutation,
  useVerifyRegistrationOtpMutation,
  useResendRegistrationOtpMutation,
} from "../../store/api/Auth/auth.api";
import { AuthLayout } from "../../components/layout/AuthLayout";
import { Loader2, Mail, Lock, Eye, EyeOff, AlertTriangle, KeyRound, CheckCircle } from "lucide-react";

type SignupStep = "register" | "verify-otp" | "success";

export default function SignupPage() {
  const [step, setStep] = useState<SignupStep>("register");

  // Registration form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // OTP Verification state
  const [otp, setOtp] = useState("");
  const [devOtpCode, setDevOtpCode] = useState("");

  const [validationError, setValidationError] = useState("");

  const navigate = useNavigate();

  const [registerRider, { isLoading: isRegistering, error: registerError }] = useRegisterRiderMutation();
  const [verifyOtp, { isLoading: isVerifying, error: verifyError }] = useVerifyRegistrationOtpMutation();
  const [resendOtp, { isLoading: isResending, error: resendError }] = useResendRegistrationOtpMutation();

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      setValidationError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setValidationError("Passwords do not match.");
      return;
    }

    try {
      const result = await registerRider({ email, password, confirmPassword }).unwrap();
      if (result.success) {
        if (result.delivery?.devOtp) {
          setDevOtpCode(result.delivery.devOtp);
        }
        setStep("verify-otp");
      }
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    if (!otp.trim()) {
      setValidationError("Please enter the OTP verification code.");
      return;
    }

    try {
      const result = await verifyOtp({ email, otp }).unwrap();
      if (result.success) {
        setStep("success");
      }
    } catch (err) {
      console.error("OTP verification failed:", err);
    }
  };

  const handleResendOtp = async () => {
    setValidationError("");
    try {
      const result = await resendOtp({ email }).unwrap();
      if (result.success) {
        alert("OTP has been resent to your email.");
      }
    } catch (err) {
      console.error("Resending OTP failed:", err);
    }
  };

  // Safe cast for RTK Query error messages
  const getErrorMessage = () => {
    if (validationError) return validationError;

    const activeError = step === "register" ? registerError : (verifyError || resendError);
    if (!activeError) return "";

    if ("data" in activeError) {
      const data = activeError.data as { message?: string | string[] };
      if (Array.isArray(data.message)) {
        return data.message[0];
      }
      return data.message || "Failed to complete the action. Please check inputs.";
    }
    return "Something went wrong. Please check your connection.";
  };

  const errorMessage = getErrorMessage();

  return (
    <AuthLayout
      title="Start Your Transport Business"
      subtitle="Register a new rider profile today, verify your credentials, and get complete access to the launch kit."
    >
      {step === "register" && (
        <>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-100">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Or{" "}
              <Link to="/login" className="font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">
                sign in to your existing account
              </Link>
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleRegisterSubmit}>
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
              <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                Password
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
                Confirm Password
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
                disabled={isRegistering}
                className="w-full flex justify-center items-center gap-2 h-10 px-4 border border-transparent rounded-md text-sm font-semibold text-white bg-brand-btn hover:bg-brand-btn-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-page focus:ring-cyan-500 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isRegistering && <Loader2 className="size-4 animate-spin" />}
                Sign up
              </button>
            </div>
          </form>
        </>
      )}

      {step === "verify-otp" && (
        <>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-100">
              Verify your email
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              We sent a verification code to <span className="font-medium text-slate-200">{email}</span>
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleOtpSubmit}>
            {errorMessage && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start gap-3">
                <AlertTriangle className="size-5 text-red-400 shrink-0 mt-0.5" />
                <span className="text-sm text-red-200 leading-snug">{errorMessage}</span>
              </div>
            )}

            {devOtpCode && (
              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4 text-center">
                <p className="text-sm text-cyan-200 font-medium">
                  Development OTP: <span className="text-cyan-400 font-bold text-lg select-all">{devOtpCode}</span>
                </p>
              </div>
            )}

            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-slate-300">
                Verification Code
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
                  placeholder="Enter OTP"
                  className="block w-full pl-10 pr-3 py-2.5 bg-brand-input border border-brand-border rounded-md text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 tracking-wider text-center transition"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                type="submit"
                disabled={isVerifying}
                className="w-full flex justify-center items-center gap-2 h-10 px-4 border border-transparent rounded-md text-sm font-semibold text-white bg-brand-btn hover:bg-brand-btn-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-page focus:ring-cyan-500 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isVerifying && <Loader2 className="size-4 animate-spin" />}
                Confirm Verification
              </button>

              <button
                type="button"
                onClick={handleResendOtp}
                disabled={isResending}
                className="w-full text-center text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isResending ? "Resending..." : "Resend OTP Code"}
              </button>
            </div>
          </form>
        </>
      )}

      {step === "success" && (
        <div className="text-center py-6">
          <CheckCircle className="size-16 text-cyan-400 mx-auto animate-pulse" />
          <p className="mt-4 text-slate-200 text-sm font-semibold leading-relaxed">
            Your rider account has been verified successfully. You can now log in and configure your transport setup.
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
