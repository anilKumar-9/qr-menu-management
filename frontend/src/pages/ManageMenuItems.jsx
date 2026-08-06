import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  PlusCircle,
  Trash2,
  CheckCircle2,
  XCircle,
  UtensilsCrossed,
} from "lucide-react";
import {
  getMenuItemsByMenu,
  deleteMenuItem,
  toggleMenuItem,
} from "../api/menuitem.api";
import { getMe } from "../api/auth.api";
import AdminLayout from "../components/layout/AdminLayout";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import EmptyState from "../components/ui/EmptyState";

export default function ManageMenuItems() {
  const { menuId } = useParams();
  const navigate = useNavigate();
  const [owner, setOwner] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getMe()
      .then((res) => setOwner(res?.data?.data || null))
      .catch(() => {});
  }, []);

  const fetchItems = async () => {
    try {
      const res = await getMenuItemsByMenu(menuId);
      setItems(res.data.data);
    } catch {
      setError("Failed to load menu items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [menuId]);

  const handleToggle = async (itemId) => {
    await toggleMenuItem(itemId);
    fetchItems();
  };

  const handleDelete = async (itemId) => {
    if (!window.confirm("Delete this item?")) return;
    await deleteMenuItem(itemId);
    fetchItems();
  };

  return (
    <AdminLayout owner={owner}>
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Manage Menu Items
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              Add, update, and manage your menu items
            </p>
          </div>

          <Button onClick={() => navigate(`/menu/${menuId}/items/add`)}>
            <PlusCircle className="w-4 h-4" />
            Add Item
          </Button>
        </div>

        {loading ? (
          <Card>
            <LoadingSpinner text="Loading items..." />
          </Card>
        ) : error ? (
          <Card className="p-6 text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <Button variant="secondary" onClick={fetchItems}>
              Try Again
            </Button>
          </Card>
        ) : items.length === 0 ? (
          <Card>
            <EmptyState
              title="No items added yet"
              description="Add your first menu item to start building your menu."
              actionLabel="Add Item"
              onAction={() => navigate(`/menu/${menuId}/items/add`)}
              icon={UtensilsCrossed}
            />
          </Card>
        ) : (
          <div className="space-y-4">
            {items.map((item, i) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-gray-900 dark:text-white">
                          {item.name}
                        </h3>
                        <Badge color={item.isAvailable ? "green" : "red"}>
                          {item.isAvailable ? "Available" : "Unavailable"}
                        </Badge>
                        <Badge color="indigo">{item.category}</Badge>
                      </div>

                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5 leading-relaxed">
                        {item.description}
                      </p>

                      <p className="mt-2 text-lg font-bold text-gray-900 dark:text-white">
                        ₹{item.price}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 shrink-0">
                      <Button
                        variant={item.isAvailable ? "outline" : "secondary"}
                        size="sm"
                        onClick={() => handleToggle(item._id)}
                      >
                        {item.isAvailable ? (
                          <>
                            <XCircle className="w-4 h-4" />
                            Mark Unavailable
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-4 h-4" />
                            Mark Available
                          </>
                        )}
                      </Button>

                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(item._id)}
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
