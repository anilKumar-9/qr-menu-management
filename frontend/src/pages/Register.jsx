import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  Store,
  MapPin,
  Phone,
  ArrowRight,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function RestaurantRegistration() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      address: "",
      contactNumber: "",
    },
  });

  // Live preview values
  const watchedName = watch("name");
  const watchedAddress = watch("address");

  const onSubmit = async (data) => {
    setLoading(true);
    setApiError("");

    try {
      // 🔗 Replace with real API call
      // await createRestaurant(data);

      console.log("Restaurant data:", data);

      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSuccess(true);
    } catch (err) {
      setApiError(
        err?.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- SUCCESS STATE ---------------- */
  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl text-center"
        >
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900">
            Restaurant Registered
          </h2>

          <p className="text-gray-500 mt-2">
            Your restaurant profile is ready. Next, let’s add menus and items.
          </p>

          <button
            onClick={() => navigate("/dashboard")}
            className="w-full mt-8 bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-all"
          >
            Go to Dashboard →
          </button>

          <p className="text-xs text-gray-400 mt-3">
            You can edit restaurant details anytime
          </p>
        </motion.div>
      </div>
    );
  }

  /* ---------------- FORM ---------------- */
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col lg:flex-row">
      {/* LEFT — FORM */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="max-w-md w-full">
          <header className="mb-8">
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
              Step 2 of 4 · Restaurant Setup
            </p>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">
              Register Restaurant
            </h1>
            <p className="text-gray-500 mt-2">
              Create your restaurant profile to generate a QR menu.
            </p>
          </header>

          {/* API ERROR */}
          {apiError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 flex items-start gap-2 rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700"
            >
              <AlertCircle className="w-5 h-5 mt-0.5" />
              <span>{apiError}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* NAME */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Restaurant Name
              </label>
              <div className="relative">
                <Store className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  {...register("name", {
                    required: "Restaurant name is required",
                    minLength: { value: 3, message: "Name too short" },
                  })}
                  aria-invalid={!!errors.name}
                  placeholder="e.g. The Golden Grill"
                  className={`w-full pl-12 pr-4 py-4 bg-white border ${
                    errors.name ? "border-red-500" : "border-gray-200"
                  } rounded-2xl focus:ring-4 focus:ring-black/5 focus:border-black outline-none`}
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* PHONE */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Contact Number
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  {...register("contactNumber", {
                    required: "Contact number is required",
                  })}
                  placeholder="+91 98765 43210"
                  className={`w-full pl-12 pr-4 py-4 bg-white border ${
                    errors.contactNumber ? "border-red-500" : "border-gray-200"
                  } rounded-2xl focus:ring-4 focus:ring-black/5 focus:border-black outline-none`}
                />
              </div>
              {errors.contactNumber && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {errors.contactNumber.message}
                </p>
              )}
            </div>

            {/* ADDRESS */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Full Address
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <textarea
                  {...register("address", {
                    required: "Address is required",
                  })}
                  rows={3}
                  placeholder="Street, City, State"
                  className={`w-full pl-12 pr-4 py-4 bg-white border ${
                    errors.address ? "border-red-500" : "border-gray-200"
                  } rounded-2xl focus:ring-4 focus:ring-black/5 focus:border-black outline-none resize-none`}
                />
              </div>
              {errors.address && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {errors.address.message}
                </p>
              )}
            </div>

            {/* SUBMIT */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.02 }}
              disabled={loading}
              type="submit"
              className="w-full bg-black text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all disabled:bg-gray-400 shadow-lg"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Complete Setup <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>

            <p className="text-xs text-gray-400 text-center mt-2">
              You can edit restaurant details later
            </p>
          </form>
        </div>
      </div>

      {/* RIGHT — LIVE PREVIEW */}
      <div className="hidden lg:flex flex-1 bg-black items-center justify-center p-12 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_55%)]" />

        <div className="relative z-10 w-full max-w-sm">
          <p className="text-white/50 text-center text-xs font-bold mb-6 uppercase tracking-widest">
            Live Preview
          </p>

          <div className="bg-white rounded-[3rem] p-4 shadow-2xl border-[8px] border-gray-800 aspect-[9/19]">
            <div className="h-full bg-[#FAFAFA] rounded-[2.5rem] overflow-hidden">
              <div className="h-24 bg-gray-200 animate-pulse" />
              <div className="p-6 -mt-10">
                <div className="w-16 h-16 bg-white rounded-2xl shadow border flex items-center justify-center text-2xl mb-4">
                  {watchedName ? watchedName[0].toUpperCase() : "Q"}
                </div>
                <h3 className="text-xl font-black">
                  {watchedName || "Your Restaurant"}
                </h3>
                <p className="text-gray-400 text-xs mt-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {watchedAddress || "Restaurant location"}
                </p>

                <div className="mt-6 space-y-3">
                  <div className="h-12 bg-gray-100 rounded-xl" />
                  <div className="h-12 bg-gray-100 rounded-xl" />
                  <div className="h-12 bg-gray-100 rounded-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
