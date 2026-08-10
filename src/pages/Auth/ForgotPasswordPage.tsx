import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForgotUserPasswordMutation } from "../../store/api/Auth/auth.api";
import { AuthLayout } from "../../components/layout/AuthLayout";
import { Loader2, Mail, ArrowLeft, AlertTriangle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [validationError, setValidationError] = useState("");

  const navigate = useNavigate();
  const [forgotPassword, { isLoading, error }] = useForgotUserPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    if (!email.trim()) {
      setValidationError("Please enter your email address.");
      return;
    }

    try {
      const result = await forgotPassword({ email }).unwrap();
      if (result.success) {
        navigate(`/reset-password?email=${encodeURIComponent(email)}`);
      }
    } catch (err) {
      console.error("Forgot password request failed:", err);
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
      return data.message || "Failed to submit request. Please try again.";
    }
    return "Something went wrong. Please check your connection.";
  };

  const errorMessage = getErrorMessage();

  return (
    <AuthLayout
      title="Recover Your Password"
      subtitle="Enter your registered email address below, and we will send you a 6-digit OTP code to safely reset your password."
    >
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-100">
          Forgot password?
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          We will send you a reset code.
        </p>
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
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center gap-2 h-10 px-4 border border-transparent rounded-md text-sm font-semibold text-white bg-brand-btn hover:bg-brand-btn-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-page focus:ring-cyan-500 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading && <Loader2 className="size-4 animate-spin" />}
            Send Reset Code
          </button>
        </div>
      </form>

      <div className="mt-6 border-t border-brand-border pt-6 text-center">
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to Sign In
        </Link>
      </div>
    </AuthLayout>
  );
}
