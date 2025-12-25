import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getMe, logoutOwner } from "../api/auth.api";
import { getRestaurants } from "../api/restaurant.api";
import RestaurantCard from "../components/RestaurantCard";

export default function Dashboard() {
  const navigate = useNavigate();

  const [owner, setOwner] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const [meRes, restRes] = await Promise.all([getMe(), getRestaurants()]);

      setOwner(meRes?.data?.data || null);

      // ✅ VERY IMPORTANT: normalize data
      const list = restRes?.data?.data?.restaurant || [];
      setRestaurants(Array.isArray(list) ? list.filter(Boolean) : []);
    } catch (err) {
      console.error("Dashboard error:", err);
      if (err?.response?.status === 401) {
        navigate("/login");
      } else {
        setError("Failed to load dashboard");
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleLogout = async () => {
    try {
      await logoutOwner();
    } finally {
      navigate("/login");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <button onClick={fetchData} className="underline">
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* HEADER */}
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {owner?.ownername}</h1>
          <p className="text-gray-500">Manage your restaurants & QR menus</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/create-restaurant")}
            className="bg-black text-white px-6 py-2 rounded-xl"
          >
            + Create Restaurant
          </button>

          <button
            onClick={handleLogout}
            className="border px-6 py-2 rounded-xl"
          >
            Logout
          </button>
        </div>
      </header>

      {/* CONTENT */}
      {restaurants.length === 0 ? (
        <div className="bg-white p-10 rounded-2xl text-center">
          <h2 className="text-xl font-bold mb-4">No restaurants yet</h2>
          <button
            onClick={() => navigate("/create-restaurant")}
            className="bg-black text-white px-6 py-3 rounded-xl"
          >
            Create First Restaurant
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((r) => (
            <RestaurantCard key={r._id} restaurant={r} />
          ))}
        </div>
      )}
    </div>
  );
}
