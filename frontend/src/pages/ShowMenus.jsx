import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMenus } from "../api/menu.api.js";

export default function ShowMenus() {
  const { restaurantId } = useParams();
  const navigate = useNavigate();

  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMenus() {
      try {
        const res = await getMenus(restaurantId);
        setMenus(res?.data?.data || []);
      } catch (err) {
        console.error("Failed to load menus", err);
      } finally {
        setLoading(false);
      }
    }

    fetchMenus();
  }, [restaurantId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading menus...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Menus</h1>

        {menus.length === 0 ? (
          <div className="bg-white p-6 rounded-xl text-center">
            <p className="text-gray-500 mb-4">No menus created yet</p>
            <button
              onClick={() =>
                navigate(`/manage/restaurant/${restaurantId}/menu/create`)
              }
              className="bg-black text-white px-6 py-2 rounded-xl"
            >
              Create Menu
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {menus.map((menu) => (
              <div
                key={menu._id}
                className="bg-white p-5 rounded-xl border flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold">{menu.title}</h3>
                  <p className="text-xs text-gray-500">
                    {menu.isPublished ? "Published" : "Draft"}
                  </p>
                </div>

                <button
                  onClick={() => navigate(`/manage/menu/${menu._id}/items`)}
                  className="border px-4 py-1 rounded-lg text-sm"
                >
                  Manage Items
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
