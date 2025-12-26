
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../api/axios"; // your axios instance

export default function ManageMenuItems() {
  const { menuId } = useParams();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchItems() {
      try {
        const res = await axios.get(`/menu-items/${menuId}`);
        setItems(res.data.data);
      } catch (err) {
        setError("Failed to load menu items");
      } finally {
        setLoading(false);
      }
    }

    fetchItems();
  }, [menuId]);

  if (loading) return <p className="p-6">Loading items...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Menu Items</h1>

        <button
          onClick={() => navigate(`/menu/${menuId}/items/add`)}
          className="bg-black text-white px-4 py-2 rounded"
        >
          + Add Item
        </button>
      </div>

      {items.length === 0 ? (
        <p>No items added yet.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="border rounded p-4 flex justify-between"
            >
              <div>
                <h3 className="font-semibold capitalize">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
                <p className="mt-1">₹ {item.price}</p>
                <p className="text-xs text-gray-400">
                  Category: {item.category}
                </p>
              </div>

              <div className="text-sm">
                {item.isAvailable ? (
                  <span className="text-green-600">Available</span>
                ) : (
                  <span className="text-red-600">Unavailable</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
