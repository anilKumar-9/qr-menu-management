import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, UtensilsCrossed, IndianRupee, Tag } from "lucide-react";
import { createMenuItem } from "../api/menuitem.api.js";
import { getMe } from "../api/auth.api";
import AdminLayout from "../components/layout/AdminLayout";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";

export default function AddMenuItem() {
  const { menuId } = useParams();
  const navigate = useNavigate();
  const [owner, setOwner] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getMe()
      .then((res) => setOwner(res?.data?.data || null))
      .catch(() => {});
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await createMenuItem(menuId, {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        category: form.category,
      });

      navigate(`/menu/${menuId}/items`);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to add menu item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout owner={owner}>
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate(`/menu/${menuId}/items`)}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Items
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-6 md:p-8">
            <div className="mb-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/20">
                <UtensilsCrossed className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Add Menu Item</h1>
              <p className="text-gray-500 text-sm mt-1">
                Add a new item to your menu
              </p>
            </div>

            {error && (
              <div className="mb-6 p-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Item Name"
                icon={UtensilsCrossed}
                type="text"
                name="name"
                placeholder="e.g. Butter Chicken"
                value={form.name}
                onChange={handleChange}
                required
              />

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  placeholder="Describe the item..."
                  required
                  rows={3}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Input
                  label="Price (₹)"
                  icon={IndianRupee}
                  type="number"
                  name="price"
                  placeholder="e.g. 299"
                  value={form.price}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                />

                <Input
                  label="Category"
                  icon={Tag}
                  type="text"
                  name="category"
                  placeholder="e.g. Veg, Non-Veg, Drinks"
                  value={form.category}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="secondary"
                  className="flex-1"
                  onClick={() => navigate(`/menu/${menuId}/items`)}
                >
                  Cancel
                </Button>
                <Button type="submit" loading={loading} className="flex-1">
                  {loading ? "Adding..." : "Add Item"}
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      </div>
    </AdminLayout>
  );
}
