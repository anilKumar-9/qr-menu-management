import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../api/axios";

export default function ShowMenus() {
  const { restaurantId } = useParams();
  const navigate = useNavigate();
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMenus() {
      try {
        const res = await axios.get(`/menus/${restaurantId}`);
        setMenus(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchMenus();
  }, [restaurantId]);

  if (loading) return <p className="p-6">Loading menus...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Menus</h1>

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

              {/* ✅ THIS IS THE ONLY CORRECT NAVIGATION */}
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
