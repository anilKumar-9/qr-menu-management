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
          className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 mb-6"
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
              <div className="w-16 h-16 bg-gray-900 dark:bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                <UtensilsCrossed className="w-8 h-8 text-white dark:text-gray-900" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Add Menu Item</h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                Add a new item to your menu
              </p>
            </div>

            {error && (
              <div className="mb-6 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 text-sm text-red-600 dark:text-red-400">
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
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  placeholder="Describe the item..."
                  required
                  rows={3}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400/30 focus:border-gray-500 dark:focus:ring-gray-500/30 dark:focus:border-gray-400 transition-all"
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
