import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPublicMenu } from "../api/public.api";

const PublicMenu = () => {
  const { restaurantId } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [restaurant, setRestaurant] = useState(null);
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await getPublicMenu(restaurantId);
        const data = res.data.data;

        setRestaurant(data.restaurant);
        setMenus(data.menus);
      } catch (err) {
        setError("Menu not available");
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [restaurantId]);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        Loading menu...
      </div>
    );

  if (error)
    return (
      <div className="h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Restaurant Header */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {restaurant.name}
        </h1>
        <p className="text-sm text-gray-500">
          {restaurant.address}
        </p>
      </div>

      {/* Menus */}
      {menus.map((menu) => (
        <div key={menu._id} className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">
            {menu.name}
          </h2>

          <div className="space-y-3">
            {menu.items.map((item) => (
              <div
                key={item._id}
                className="bg-white p-4 rounded-md shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="pr-4">
                    <p className="font-medium text-gray-800">
                      {item.name}
                    </p>

                    {/* ✅ ITEM DESCRIPTION */}
                    {(item.description || item.itemDescription) && (
                      <p className="text-sm text-gray-500 mt-1">
                        {item.description || item.itemDescription}
                      </p>
                    )}

                    <p className="text-sm text-gray-600 mt-1">
                      ₹{item.price}
                    </p>
                  </div>

                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      item.isAvailable
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.isAvailable ? "Available" : "Unavailable"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PublicMenu;
