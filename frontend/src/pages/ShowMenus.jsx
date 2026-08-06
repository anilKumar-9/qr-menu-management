import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  PlusCircle,
  UtensilsCrossed,
  Eye,
  EyeOff,
  Trash2,
} from "lucide-react";
import axios from "../utils/axios";
import { getMe } from "../api/auth.api";
import { deleteMenu } from "../api/menu.api";
import AdminLayout from "../components/layout/AdminLayout";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import EmptyState from "../components/ui/EmptyState";

export default function ShowMenus() {
  const { restaurantId } = useParams();
  const navigate = useNavigate();
  const [owner, setOwner] = useState(null);
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getMe()
      .then((res) => setOwner(res?.data?.data || null))
      .catch(() => {});
  }, []);

  useEffect(() => {
    async function fetchMenus() {
      try {
        setLoading(true);
        setError("");

        const res = await axios.get(`/menus/restaurants/${restaurantId}`);

        const list = res?.data?.data || [];
        setMenus(Array.isArray(list) ? list : []);
      } catch (err) {
        console.error("Fetch menus error:", err);
        setError("Failed to load menus");
      } finally {
        setLoading(false);
      }
    }

    fetchMenus();
  }, [restaurantId]);

  const handleTogglePublish = async (menu) => {
    try {
      const endpoint = menu.isPublished ? "unpublish" : "publish";
      await axios.patch(`/menus/${menu._id}/${endpoint}`);
      setMenus((prev) =>
        prev.map((m) =>
          m._id === menu._id ? { ...m, isPublished: !m.isPublished } : m,
        ),
      );
    } catch (err) {
      console.error("Toggle publish error:", err);
    }
  };

  const handleDeleteMenu = async (menuId) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this menu? This action cannot be undone.",
      )
    ) {
      return;
    }

    try {
      await deleteMenu(menuId);
      setMenus((prev) => prev.filter((menu) => menu._id !== menuId));
    } catch (err) {
      console.error("Delete menu error:", err);
      setError("Failed to delete menu");
    }
  };

  return (
    <AdminLayout owner={owner}>
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Menus</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              Manage your restaurant menus
            </p>
          </div>

          <Button
            onClick={() =>
              navigate(`/manage/restaurant/${restaurantId}/menu/create`)
            }
          >
            <PlusCircle className="w-4 h-4" />
            Create Menu
          </Button>
        </div>

        {loading ? (
          <Card>
            <LoadingSpinner text="Loading menus..." />
          </Card>
        ) : error ? (
          <Card className="p-6 text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <Button
              variant="secondary"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </Card>
        ) : menus.length === 0 ? (
          <Card>
            <EmptyState
              title="No menus created yet"
              description="Create your first menu to start adding items."
              actionLabel="Create Menu"
              onAction={() =>
                navigate(`/manage/restaurant/${restaurantId}/menu/create`)
              }
              icon={UtensilsCrossed}
            />
          </Card>
        ) : (
          <div className="space-y-4">
            {menus.map((menu, i) => (
              <motion.div
                key={menu._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-12 h-12 bg-gray-900 dark:bg-white rounded-xl flex items-center justify-center shrink-0">
                        <UtensilsCrossed className="w-6 h-6 text-white dark:text-gray-900" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-gray-900 dark:text-white truncate">
                          {menu.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge color={menu.isPublished ? "green" : "yellow"}>
                            {menu.isPublished ? "Published" : "Draft"}
                          </Badge>
                          <Badge color={menu.isActive ? "blue" : "gray"}>
                            {menu.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleTogglePublish(menu)}
                      >
                        {menu.isPublished ? (
                          <>
                            <EyeOff className="w-4 h-4" />
                            Unpublish
                          </>
                        ) : (
                          <>
                            <Eye className="w-4 h-4" />
                            Publish
                          </>
                        )}
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() =>
                          navigate(`/menu/${menu._id}/items`, {
                            state: { restaurantId },
                          })
                        }
                      >
                        Manage Items
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeleteMenu(menu._id)}
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
