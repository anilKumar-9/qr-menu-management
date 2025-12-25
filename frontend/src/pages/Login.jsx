import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Mail, Lock, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { loginOwner } from "../api/auth.api.js";

export default function OwnerLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [verifyHint, setVerifyHint] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setApiError("");
    setVerifyHint(false);
    setLoading(true);

    try {
      await loginOwner({
        email: data.email,
        password: data.password,
      });

      // ✅ only after successful login
      navigate("/dashboard");
    } catch (err) {
      const message = err?.response?.data?.message;

      if (
        message?.toLowerCase().includes("verify") ||
        message?.toLowerCase().includes("not verified")
      ) {
        setApiError("Please verify your email before logging in.");
        setVerifyHint(true);
      } else {
        setApiError(message || "Invalid email or password");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8"
      >
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="w-14 h-14 bg-black text-white rounded-2xl flex items-center justify-center font-bold text-xl mx-auto mb-4">
            Q
          </div>
          <h1 className="text-2xl font-extrabold">Owner Login</h1>
          <p className="text-gray-500 text-sm mt-2">Access your dashboard</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="text-sm font-semibold">Email</label>
            <div className="relative mt-2">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200"
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-semibold">Password</label>
            <div className="relative mt-2">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                })}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200"
              />
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Error */}
          {apiError && (
            <p className="text-sm text-red-600 bg-red-50 p-3 rounded-xl">
              {apiError}
            </p>
          )}

          {/* Verify hint */}
          {verifyHint && (
            <p className="text-sm text-blue-600 bg-blue-50 p-3 rounded-xl">
              Didn’t get the email?{" "}
              <Link
                to="/resend-verification"
                className="font-semibold underline"
              >
                Resend verification
              </Link>
            </p>
          )}

          <button
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-xl font-bold flex justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Login"}
          </button>
        </form>

        <p className="text-sm text-center mt-6">
          Don’t have an account?{" "}
          <Link to="/register" className="font-semibold text-black">
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
