import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { getMe } from "../api/auth.api";
import AdminLayout from "../components/layout/AdminLayout";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import EmptyState from "../components/ui/EmptyState";
import { UtensilsCrossed } from "lucide-react";

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

  useEffect(() => {
    async function fetchItems() {
      try {
        const res = await axios.get(`/menu-items/menu/${menuId}`);
        setItems(res.data.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load menu items");
      } finally {
        setLoading(false);
      }
    }

    fetchItems();
  }, [menuId]);

  return (
    <AdminLayout owner={owner}>
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Manage Menu Items
          </h1>

          <Button onClick={() => navigate(`/menu/${menuId}/items/add`)}>
            + Add Item
          </Button>
        </div>

        {loading ? (
          <Card>
            <LoadingSpinner text="Loading items..." />
          </Card>
        ) : error ? (
          <Card className="p-6 text-center">
            <p className="text-red-500 mb-4">{error}</p>
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
            {items.map((item) => (
              <Card key={item._id} className="p-4 flex justify-between">
                <div>
                  <h3 className="font-semibold capitalize text-gray-900 dark:text-white">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.description}
                  </p>
                  <p className="mt-1 font-medium text-gray-900 dark:text-white">
                    ₹ {item.price}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    Category: {item.category}
                  </p>
                </div>

                <div className="text-sm">
                  <Badge color={item.isAvailable ? "green" : "red"}>
                    {item.isAvailable ? "Available" : "Unavailable"}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
