import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../utils/axios";

export default function ShowMenus() {
  const { restaurantId } = useParams();
  const navigate = useNavigate();

  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMenus() {
      try {
        setLoading(true);
        setError("");

        // ✅ MATCHES BACKEND EXACTLY
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

  if (loading) return <p className="p-6">Loading menus...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Menus</h1>

        <button
          onClick={() =>
            navigate(`/manage/restaurant/${restaurantId}/menu/create`)
          }
          className="bg-black text-white px-4 py-2 rounded"
        >
          + Create Menu
        </button>
      </div>

      {menus.length === 0 ? (
        <p className="text-gray-500">No menus created yet.</p>
      ) : (
        <div className="space-y-4">
          {menus.map((menu) => (
            <div
              key={menu._id}
              className="border rounded p-4 flex justify-between items-center"
            >
              <span className="font-semibold">{menu.name}</span>

              <button
                onClick={() => navigate(`/menu/${menu._id}/items`)}
                className="border px-3 py-1 rounded"
              >
                Manage Items
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
