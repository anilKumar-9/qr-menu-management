import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Mail, Lock, QrCode, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { loginOwner } from "../api/auth.api.js";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import ThemeToggle from "../components/ui/ThemeToggle";

export default function OwnerLogin() {
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
      await loginOwner({
        email: data.email,
        password: data.password,
      });

      navigate("/dashboard");
    } catch (err) {
      const message = err?.response?.data?.message;
      setApiError(message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <ThemeToggle />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-200 dark:border-gray-700 p-8"
        >
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="w-16 h-16 bg-gray-900 dark:bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
              <QrCode className="w-8 h-8 text-white dark:text-gray-900" />
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
              Welcome Back
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              Sign in to your owner dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              label="Email"
              icon={Mail}
              type="email"
              placeholder="owner@email.com"
              error={errors.email?.message}
              autoComplete="email"
              {...register("email", { required: "Email is required" })}
            />

            <Input
              label="Password"
              icon={Lock}
              type="password"
              placeholder="••••••••"
              error={errors.password?.message}
              autoComplete="current-password"
              {...register("password", { required: "Password is required" })}
            />

            {apiError && (
              <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 p-3 rounded-xl">
                {apiError}
              </p>
            )}

            <Button
              type="submit"
              loading={loading}
              className="w-full"
              size="lg"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <p className="text-sm text-center mt-6 text-gray-500 dark:text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-gray-900 dark:text-white hover:underline"
            >
              Create Account
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
