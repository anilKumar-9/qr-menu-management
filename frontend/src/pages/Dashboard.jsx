import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getMe, logoutOwner } from "../api/auth.api";
import { getRestaurants } from "../api/restaurant.api";
import RestaurantCard from "../components/RestaurantCard";

// Mock Icons (You can use Lucide-React or HeroIcons)
const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.5v15m7.5-7.5h-15"
    />
  </svg>
);
const LogOutIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
    />
  </svg>
);

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
      const list = restRes?.data?.data?.restaurant || [];
      setRestaurants(Array.isArray(list) ? list.filter(Boolean) : []);
    } catch (err) {
      if (err?.response?.status === 401) navigate("/login");
      else setError("Failed to load dashboard");
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
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-black rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 font-medium">Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#111827]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* HEADER SECTION */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-gray-400">
              Overview
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight mt-1">
              Welcome, {owner?.ownername || "Owner"}
            </h1>
            <p className="text-lg text-gray-500 mt-2">
              You have{" "}
              <span className="text-black font-semibold">
                {restaurants.length}
              </span>{" "}
              active restaurants.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-all font-medium text-sm"
            >
              <LogOutIcon /> Logout
            </button>
            <button
              onClick={() => navigate("/create-restaurant")}
              className="flex items-center gap-2 bg-black text-white px-6 py-2.5 rounded-xl hover:bg-gray-800 transition-all shadow-sm font-medium text-sm"
            >
              <PlusIcon /> Create Restaurant
            </button>
          </div>
        </header>

        <hr className="border-gray-200 mb-12" />

        {/* CONTENT SECTION */}
        {error ? (
          <div className="bg-red-50 border border-red-100 p-6 rounded-2xl text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchData}
              className="bg-red-600 text-white px-6 py-2 rounded-lg text-sm"
            >
              Retry Connection
            </button>
          </div>
        ) : restaurants.length === 0 ? (
          <div className="bg-white border-2 border-dashed border-gray-200 p-20 rounded-[2rem] text-center">
            <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <PlusIcon />
            </div>
            <h2 className="text-2xl font-bold mb-2">No restaurants found</h2>
            <p className="text-gray-500 mb-8 max-w-xs mx-auto">
              Get started by creating your first restaurant menu and generating
              your QR codes.
            </p>
            <button
              onClick={() => navigate("/create-restaurant")}
              className="bg-black text-white px-8 py-3 rounded-xl hover:scale-105 transition-transform font-bold shadow-lg"
            >
              Create Your First Restaurant
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {restaurants.map((r) => (
              <div
                key={r._id}
                className="hover:-translate-y-1 transition-transform duration-300"
              >
                <RestaurantCard restaurant={r} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
