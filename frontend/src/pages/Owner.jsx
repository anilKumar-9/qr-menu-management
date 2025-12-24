import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
// import { registerOwner } from "../api/auth.api";

export default function OwnerRegister() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setApiError("");
    setLoading(true);

    try {
      // 🔗 CONNECT BACKEND HERE
      // await registerOwner(data);

      console.log("Owner Register Payload:", data);

      // Mock delay
      await new Promise((r) => setTimeout(r, 1500));

      navigate("/login");
    } catch (err) {
      setApiError("Owner already exists or something went wrong");
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
        {/* HEADER */}
        <div className="mb-8 text-center">
          <div className="w-14 h-14 bg-black text-white rounded-2xl flex items-center justify-center font-bold text-xl mx-auto mb-4">
            Q
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">
            Create Owner Account
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Register as a restaurant owner to get started
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* NAME */}
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Full Name
            </label>
            <div className="relative mt-2">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                {...register("name", {
                  required: "Name is required",
                  minLength: { value: 3, message: "Minimum 3 characters" },
                })}
                placeholder="Anil Kumar"
                className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
                  errors.name ? "border-red-500" : "border-gray-200"
                } focus:outline-none focus:ring-4 focus:ring-black/5`}
              />
            </div>
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Email Address
            </label>
            <div className="relative mt-2">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email",
                  },
                })}
                placeholder="owner@email.com"
                className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
                  errors.email ? "border-red-500" : "border-gray-200"
                } focus:outline-none focus:ring-4 focus:ring-black/5`}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Password
            </label>
            <div className="relative mt-2">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters",
                  },
                })}
                placeholder="••••••••"
                className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
                  errors.password ? "border-red-500" : "border-gray-200"
                } focus:outline-none focus:ring-4 focus:ring-black/5`}
              />
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* API ERROR */}
          {apiError && (
            <p className="text-sm text-red-600 bg-red-50 p-3 rounded-xl">
              {apiError}
            </p>
          )}

          {/* SUBMIT */}
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-black text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition disabled:bg-gray-400"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Create Account <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-sm text-gray-500 text-center mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-black hover:underline"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
