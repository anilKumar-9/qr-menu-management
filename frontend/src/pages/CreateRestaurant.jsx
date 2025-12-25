import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createRestaurant } from "../api/restaurant.api";
import { Loader2 } from "lucide-react";

export default function CreateRestaurant() {
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
      await createRestaurant({
        name: data.name,
        address: data.address,
        phone: data.phone,
      });

      // ✅ success → go back to dashboard
      navigate("/dashboard");
    } catch (err) {
      setApiError(
        err?.response?.data?.message || "Failed to create restaurant"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white p-8 rounded-3xl shadow">
        <h1 className="text-2xl font-bold mb-2">Create Restaurant</h1>
        <p className="text-gray-500 mb-6">
          Add your restaurant details to get started
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label className="text-sm font-semibold">Restaurant Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              className="w-full mt-2 px-4 py-3 border rounded-xl"
              placeholder="My Restaurant"
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="text-sm font-semibold">Address</label>
            <input
              {...register("address")}
              className="w-full mt-2 px-4 py-3 border rounded-xl"
              placeholder="Hyderabad"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-semibold">Phone</label>
            <input
              {...register("phone")}
              className="w-full mt-2 px-4 py-3 border rounded-xl"
              placeholder="9876543210"
            />
          </div>

          {apiError && (
            <p className="text-sm text-red-600 bg-red-50 p-3 rounded-xl">
              {apiError}
            </p>
          )}

          <button
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-xl font-bold flex justify-center gap-2"
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Create Restaurant"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
