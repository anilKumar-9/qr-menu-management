import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Store, PlusCircle, UtensilsCrossed, QrCode } from "lucide-react";
import { getMe } from "../api/auth.api";
import { getMenuCount } from "../api/menu.api";
import { getRestaurants, deleteRestaurant } from "../api/restaurant.api";
import AdminLayout from "../components/layout/AdminLayout";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import EmptyState from "../components/ui/EmptyState";
import RestaurantCard from "../components/RestaurantCard";
import ThemeToggle from "../components/ui/ThemeToggle";

export default function Dashboard() {
  const navigate = useNavigate();
  const [owner, setOwner] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [menuCount, setMenuCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const [meRes, restRes, menuCountRes] = await Promise.all([
        getMe(),
        getRestaurants(),
        getMenuCount(),
      ]);

      setOwner(meRes?.data?.data || null);

      const list = restRes?.data?.data?.restaurant || [];
      setRestaurants(Array.isArray(list) ? list.filter(Boolean) : []);
      setMenuCount(menuCountRes?.data?.data?.count ?? 0);
    } catch (err) {
      console.error("Dashboard error:", err);
      if (err?.response?.status === 401) {
        navigate("/login");
      } else {
        setError("Failed to load dashboard");
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <LoadingSpinner text="Loading dashboard..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={fetchData} variant="secondary">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  const stats = [
    {
      label: "Total Restaurants",
      value: restaurants.length,
      icon: Store,
    },
    {
      label: "Active Restaurants",
      value: restaurants.filter((r) => r.isActive).length,
      icon: QrCode,
    },
    {
      label: "Total Menus",
      value: menuCount,
      icon: UtensilsCrossed,
    },
  ];

  return (
    <AdminLayout owner={owner}>
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {owner?.ownername || "Owner"} 👋
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage your restaurants and QR menus from one place.
          </p>
        </div>
        <ThemeToggle className="self-start sm:self-center" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-gray-900 dark:bg-white rounded-xl flex items-center justify-center shadow-sm">
                <stat.icon className="w-6 h-6 text-white dark:text-gray-900" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {stat.label}
                </p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <Button onClick={() => navigate("/create-restaurant")} size="lg">
          <PlusCircle className="w-5 h-5" />
          Create New Restaurant
        </Button>
      </div>

      {/* Restaurants */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Your Restaurants
        </h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {restaurants.length} total
        </span>
      </div>

      {restaurants.length === 0 ? (
        <Card>
          <EmptyState
            title="No restaurants yet"
            description="Create your first restaurant to start generating QR menus for your customers."
            actionLabel="Create First Restaurant"
            onAction={() => navigate("/create-restaurant")}
            icon={Store}
          />
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {restaurants.map((r, i) => (
            <motion.div
              key={r._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <RestaurantCard
                restaurant={r}
                onDelete={async (restaurantId) => {
                  if (
                    !window.confirm(
                      "Delete this restaurant? This will disable it and remove it from your list.",
                    )
                  )
                    return;

                  try {
                    await deleteRestaurant(restaurantId);
                    setRestaurants((prev) =>
                      prev.filter((rest) => rest._id !== restaurantId),
                    );
                  } catch (err) {
                    console.error("Delete restaurant error:", err);
                    setError("Failed to delete restaurant");
                  }
                }}
              />
            </motion.div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
