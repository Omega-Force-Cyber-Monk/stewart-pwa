import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../store/api/Auth/auth.api";
import { useAppDispatch } from "../../hooks/storeHooks";
import { setCredentials } from "../../store/features/auth/authSlice";
import { AuthLayout } from "../../components/layout/AuthLayout";
import { Loader2, Mail, Lock, Eye, EyeOff, AlertTriangle } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [loginUser, { isLoading, error }] = useLoginUserMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    if (!email.trim() || !password.trim()) {
      setValidationError("Please fill in all fields.");
      return;
    }

    try {
      const result = await loginUser({ email, password }).unwrap();
      if (result.success) {
        dispatch(
          setCredentials({
            accessToken: result.accessToken,
            refreshToken: result.refreshToken,
            user: result.user,
          })
        );
        // Admins go to the admin dashboard; riders are routed by the
        // DashboardLayout guard (purchase state comes from the backend),
        // so send everyone to /dashboard and let the guard decide.
        if (result.user?.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      }
    } catch (err) {
      console.error("Login failed:", err);
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
      return data.message || "Invalid credentials. Please try again.";
    }
    return "Something went wrong. Please check your connection.";
  };

  const errorMessage = getErrorMessage();

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your rider account to manage your booking pipeline, referral cards, and launch settings."
    >
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-100">
          Sign in
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          Or{" "}
          <Link to="/signup" className="font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">
            create a new rider account
          </Link>
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
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium text-slate-300">
              Password
            </label>
          </div>
          <div className="mt-2 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="size-5 text-slate-500" />
            </div>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
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
          <Link
            to="/forgot-password"
            className="text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center gap-2 h-10 px-4 border border-transparent rounded-md text-sm font-semibold text-white bg-brand-btn hover:bg-brand-btn-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-page focus:ring-cyan-500 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading && <Loader2 className="size-4 animate-spin" />}
            Sign in
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}
