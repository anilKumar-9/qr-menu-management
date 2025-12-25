import { useEffect, useState, useCallback } from "react";
import { getMe, logoutOwner } from "../api/auth.api";
import { getRestaurants } from "../api/restaurant.api";
import { useNavigate } from "react-router-dom";
import RestaurantCard from "../components/RestaurantCard";

export default function Dashboard() {
  const navigate = useNavigate();

  const [owner, setOwner] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔥 Fetch owner + restaurants
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [meRes, restRes] = await Promise.all([getMe(), getRestaurants()]);

      // Owner
      setOwner(meRes?.data?.data || null);

      // ✅ MATCHES BACKEND RESPONSE SHAPE
      setRestaurants(restRes?.data?.data?.restaurant || []);
    } catch (err) {
      console.error("Dashboard Fetch Error:", err);

      if (err?.response?.status === 401) {
        navigate("/login");
      } else {
        setError("Failed to load dashboard data.");
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  // 🔁 Load dashboard on mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // 🚪 Logout
  const handleLogout = async () => {
    try {
      await logoutOwner();
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      navigate("/login");
    }
  };

  // ⏳ Loading UI
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg animate-pulse">Loading dashboard...</p>
      </div>
    );
  }

  // ❌ Error UI
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button onClick={fetchData} className="text-blue-600 underline">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* HEADER */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
        <div>
          <h1 className="text-2xl font-bold italic">
            Welcome, {owner?.ownername || "Owner"}
          </h1>
          <p className="text-gray-500 text-sm">
            Manage your restaurants & QR menus
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-black text-white px-5 py-2 rounded-xl hover:bg-gray-800 transition-colors"
        >
          Logout
        </button>
      </header>

      {/* BODY */}
      {restaurants.length === 0 ? (
        <section className="bg-white p-10 rounded-2xl text-center shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-4">No restaurants yet</h2>
          <button
            onClick={() => navigate("/create-restaurant")}
            className="bg-black text-white px-6 py-3 rounded-xl hover:scale-105 transition-transform"
          >
            + Create Your First Restaurant
          </button>
        </section>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant._id} restaurant={restaurant} />
          ))}
        </div>
      )}
    </div>
  );
}
