import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Store, MapPin, Phone, ArrowLeft, Loader2 } from "lucide-react";
import { createRestaurant } from "../api/restaurant.api";
import { getMe } from "../api/auth.api";
import AdminLayout from "../components/layout/AdminLayout";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";

export default function CreateRestaurant() {
  const navigate = useNavigate();
  const [owner, setOwner] = useState(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getMe()
      .then((res) => setOwner(res?.data?.data || null))
      .catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !address || !contactNumber) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);

      await createRestaurant({
        name: name.trim(),
        address: address.trim(),
        contactNumber: contactNumber.trim(),
      });

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Failed to create restaurant");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout owner={owner}>
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-6 md:p-8">
            <div className="mb-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-500/20">
                <Store className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">
                Create Restaurant
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Add your restaurant details to generate a QR menu
              </p>
            </div>

            {error && (
              <div className="mb-6 p-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Restaurant Name"
                icon={Store}
                type="text"
                placeholder="e.g. Spice Garden"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <Input
                label="Address"
                icon={MapPin}
                type="text"
                placeholder="e.g. 123 Main Street, City"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />

              <Input
                label="Contact Number"
                icon={Phone}
                type="tel"
                placeholder="e.g. +91 98765 43210"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                required
              />

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="secondary"
                  className="flex-1"
                  onClick={() => navigate("/dashboard")}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  loading={loading}
                  className="flex-1"
                >
                  {loading ? "Creating..." : "Create Restaurant"}
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      </div>
    </AdminLayout>
  );
}
