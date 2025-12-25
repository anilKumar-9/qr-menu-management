import { useEffect, useState } from "react";
import { getRestaurantQR } from "../api/restaurant.api";
import { useNavigate } from "react-router-dom";

export default function RestaurantCard({ restaurant }) {
  const navigate = useNavigate();
  const [qr, setQr] = useState("");
  const [loadingQR, setLoadingQR] = useState(true);

  useEffect(() => {
    if (!restaurant?._id) return;

    async function fetchQR() {
      try {
        const res = await getRestaurantQR(restaurant._id);
        setQr(res.data.data.qrCode);
      } catch (err) {
        console.error("Failed to load QR", err);
      } finally {
        setLoadingQR(false);
      }
    }

    fetchQR();
  }, [restaurant?._id]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h3 className="text-lg font-bold">{restaurant?.name}</h3>

      <p className="text-sm text-gray-500 mt-1">
        Status:{" "}
        <span
          className={restaurant?.isActive ? "text-green-600" : "text-red-500"}
        >
          {restaurant?.isActive ? "Active" : "Inactive"}
        </span>
      </p>

      {/* QR CODE */}
      {loadingQR ? (
        <p className="text-xs text-gray-400 text-center mt-4">Loading QR...</p>
      ) : (
        qr && <img src={qr} alt="QR Code" className="w-32 h-32 my-4 mx-auto" />
      )}

      <div className="flex gap-3">
        <button
          onClick={() => navigate(`/restaurant/${restaurant._id}`)}
          className="flex-1 border border-gray-300 rounded-xl py-2"
        >
          Manage
        </button>

        <button
          onClick={() => navigate(`/menu/${restaurant._id}`)}
          className="flex-1 bg-black text-white rounded-xl py-2"
        >
          Menu
        </button>
      </div>
    </div>
  );
}
