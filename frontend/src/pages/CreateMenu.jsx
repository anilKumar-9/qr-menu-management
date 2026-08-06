import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, UtensilsCrossed } from "lucide-react";
import { createMenu } from "../api/menu.api";
import { getMe } from "../api/auth.api";
import AdminLayout from "../components/layout/AdminLayout";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";

export default function CreateMenu() {
  const { restaurantId } = useParams();
  const navigate = useNavigate();
  const [owner, setOwner] = useState(null);
  const [title, setTitle] = useState("");
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

    if (!title.trim()) {
      setError("Menu title is required");
      return;
    }

    try {
      setLoading(true);

      await createMenu(restaurantId, {
        title: title.trim(),
      });

      navigate(`/manage/restaurant/${restaurantId}/menus`);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Failed to create menu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout owner={owner}>
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate(`/manage/restaurant/${restaurantId}/menus`)}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Menus
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-6 md:p-8">
            <div className="mb-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-500/20">
                <UtensilsCrossed className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Create Menu</h1>
              <p className="text-gray-500 text-sm mt-1">
                Add a new menu for your restaurant
              </p>
            </div>

            {error && (
              <div className="mb-6 p-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Menu Title"
                icon={UtensilsCrossed}
                type="text"
                placeholder="e.g. Main Menu, Breakfast, Dinner"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="secondary"
                  className="flex-1"
                  onClick={() =>
                    navigate(`/manage/restaurant/${restaurantId}/menus`)
                  }
                >
                  Cancel
                </Button>
                <Button type="submit" loading={loading} className="flex-1">
                  {loading ? "Creating..." : "Create Menu"}
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      </div>
    </AdminLayout>
  );
}
