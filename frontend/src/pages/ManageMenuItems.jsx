import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getMenuItemsByMenu,
  deleteMenuItem,
  toggleMenuItem,
} from "../api/menuitem.api";

export default function ManageMenuItems() {
  const { menuId } = useParams();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchItems = async () => {
    try {
      const res = await getMenuItemsByMenu(menuId);
      setItems(res.data.data);
    } catch (err) {
      setError("Failed to load menu items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [menuId]);

  const handleToggle = async (itemId) => {
    try {
      await toggleMenuItem(itemId);
      fetchItems();
    } catch {
      alert("Failed to update availability");
    }
  };

  const handleDelete = async (itemId) => {
    if (!window.confirm("Delete this item?")) return;

    try {
      await deleteMenuItem(itemId);
      fetchItems();
    } catch {
      alert("Failed to delete item");
    }
  };

  if (loading) return <p className="p-6">Loading items...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Menu Items</h1>

        <button
          onClick={() => navigate(`/menu/${menuId}/items/add`)}
          className="bg-black text-white px-4 py-2 rounded"
        >
          + Add Item
        </button>
      </div>

      {/* EMPTY STATE */}
      {items.length === 0 ? (
        <p className="text-gray-500">No items added yet.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="border rounded p-4 flex justify-between items-start"
            >
              {/* INFO */}
              <div>
                <h3 className="font-semibold capitalize">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
                <p className="mt-1 font-medium">₹ {item.price}</p>
                <p className="text-xs text-gray-400">
                  Category: {item.category}
                </p>
              </div>

              {/* ACTIONS */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleToggle(item._id)}
                  className={`px-3 py-1 rounded border text-sm ${
                    item.isAvailable
                      ? "border-green-600 text-green-600"
                      : "border-red-600 text-red-600"
                  }`}
                >
                  {item.isAvailable ? "Available" : "Unavailable"}
                </button>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="px-3 py-1 rounded border text-sm text-red-600 border-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
