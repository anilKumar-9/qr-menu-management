import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Mail, Lock, QrCode, ArrowLeft, AlertCircle, CheckCircle2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { loginOwner } from "../api/auth.api.js";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import ThemeToggle from "../components/ui/ThemeToggle";
import Card from "../components/ui/Card";

export default function OwnerLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, touchedFields },
  } = useForm({
    mode: "onChange",
  });

  const emailValue = watch("email");
  const isEmailValid = touchedFields.email && !errors.email && emailValue;

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
    <div className="min-h-screen relative flex items-center justify-center p-4 sm:p-8 overflow-hidden bg-gray-50 dark:bg-gray-950">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-400/30 dark:bg-primary-600/20 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-400/30 dark:bg-blue-600/20 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen pointer-events-none" />

      <div className="w-full max-w-[1000px] grid lg:grid-cols-2 gap-8 lg:gap-0 items-center relative z-10">
        
        {/* Left Side - Brand/Hero Section */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="hidden lg:flex flex-col justify-center pr-12"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-primary-500 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-primary-500/30">
            <QrCode className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4 tracking-tight">
            Manage your <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-500">
              restaurant menus
            </span><br/>
            effortlessly.
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md">
            Sign in to access your digital menu dashboard, track orders, and delight your customers with a seamless QR experience.
          </p>
        </motion.div>

        {/* Right Side - Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="w-full max-w-md mx-auto"
        >
          <div className="flex items-center justify-between mb-4 lg:mb-8">
            <Link
              to="/"
              className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
            <ThemeToggle />
          </div>

          <Card className="p-8 sm:p-10 border-white/40 dark:border-gray-800/60 shadow-2xl shadow-gray-200/50 dark:shadow-black/50">
            <div className="mb-8 lg:hidden text-center">
              <div className="w-14 h-14 bg-gradient-to-br from-primary-600 to-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary-500/30">
                <QrCode className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome Back</h2>
            </div>

            <div className="hidden lg:block mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Sign In</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Access your dashboard</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="relative">
                <Input
                  label="Email address"
                  icon={Mail}
                  type="email"
                  placeholder="name@restaurant.com"
                  error={errors.email?.message}
                  autoComplete="email"
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                />
                {isEmailValid && (
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute right-3 top-10"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  </motion.div>
                )}
              </div>

              <Input
                label="Password"
                icon={Lock}
                type="password"
                placeholder="••••••••"
                error={errors.password?.message}
                autoComplete="current-password"
                {...register("password", { required: "Password is required" })}
              />

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:checked:bg-primary-500 transition-colors cursor-pointer"
                  />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors">
                    Remember me
                  </span>
                </label>
                
                <Link
                  to="/forgot-password"
                  className="text-sm font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {apiError && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="flex items-center gap-3 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 p-3.5 rounded-xl"
                >
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <p>{apiError}</p>
                </motion.div>
              )}

              <Button
                type="submit"
                loading={loading}
                className="w-full mt-2"
                size="lg"
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
