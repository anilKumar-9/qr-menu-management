import { useEffect, useState } from "react";
import { getMe, logoutOwner } from "../api/auth.api";
import { getRestaurants } from "../api/restaurant.api";
import { useNavigate } from "react-router-dom";
import RestaurantCard from "../components/RestaurantCard";

export default function Dashboard() {
  const navigate = useNavigate();
  const [owner, setOwner] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const meRes = await getMe();
        const restRes = await getRestaurants();

        setOwner(meRes.data.data);
        setRestaurants(restRes.data.data);
      } catch (err) {
        navigate("/login");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleLogout = async () => {
    await logoutOwner();
    navigate("/login");
  };

  if (loading) return <p className="p-8">Loading dashboard...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-2xl font-bold">Welcome, {owner?.ownername}</h1>
          <p className="text-gray-500 text-sm">
            Manage your restaurants & QR menus
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-black text-white px-5 py-2 rounded-xl"
        >
          Logout
        </button>
      </div>

      {/* Restaurants */}
      {restaurants.length === 0 ? (
        <div className="bg-white p-10 rounded-2xl text-center shadow">
          <h2 className="text-xl font-bold mb-2">No restaurants yet</h2>
          <p className="text-gray-500 mb-6">
            Create your first restaurant to get started
          </p>
          <button
            onClick={() => navigate("/create-restaurant")}
            className="bg-black text-white px-6 py-3 rounded-xl"
          >
            Create Restaurant
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant._id} restaurant={restaurant} />
          ))}
        </div>
      )}
    </div>
  );
}
