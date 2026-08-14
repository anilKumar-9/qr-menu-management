import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Mail, Lock, User, QrCode, ArrowLeft, AlertCircle, CheckCircle2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { registerOwner } from "../api/auth.api.js";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import ThemeToggle from "../components/ui/ThemeToggle";
import Card from "../components/ui/Card";

export default function OwnerRegister() {
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
      await registerOwner({
        ownername: data.name,
        email: data.email,
        password: data.password,
      });

      navigate("/login");
    } catch (err) {
      setApiError(
        err?.response?.data?.message ||
          "Registration failed or user already exists"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 sm:p-8 overflow-hidden bg-gray-50 dark:bg-gray-950">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-gray-300/40 dark:bg-gray-800/40 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-gray-400/20 dark:bg-gray-700/30 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen pointer-events-none" />

      <div className="w-full max-w-[1000px] grid lg:grid-cols-2 gap-8 lg:gap-0 items-center relative z-10">
        
        {/* Left Side - Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md mx-auto order-2 lg:order-1"
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
              <div className="w-14 h-14 bg-gradient-to-br from-gray-800 to-black dark:from-gray-200 dark:to-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-gray-900/20 dark:shadow-white/10">
                <QrCode className="w-7 h-7 text-white dark:text-gray-900" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create Account</h2>
            </div>

            <div className="hidden lg:block mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Sign Up</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Start managing your restaurant</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <Input
                label="Full Name"
                icon={User}
                type="text"
                placeholder="Anil Kumar"
                error={errors.name?.message}
                autoComplete="name"
                {...register("name", {
                  required: "Name is required",
                  minLength: { value: 3, message: "Minimum 3 characters" },
                })}
              />

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
                autoComplete="new-password"
                {...register("password", { 
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                })}
              />

              {apiError && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="flex items-center gap-3 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 p-3.5 rounded-xl mt-2"
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
                {loading ? "Creating..." : "Create Account"}
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Right Side - Brand/Hero Section */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="hidden lg:flex flex-col justify-center pl-12 order-1 lg:order-2"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-black dark:from-gray-200 dark:to-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-gray-900/20 dark:shadow-white/10">
            <QrCode className="w-8 h-8 text-white dark:text-gray-900" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4 tracking-tight">
            Elevate your <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-black dark:from-gray-300 dark:to-white">
              dining experience
            </span><br/>
            today.
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md">
            Join the platform that helps restaurants deploy contactless, beautifully designed digital menus in minutes.
          </p>
        </motion.div>

      </div>
    </div>
  );
}
