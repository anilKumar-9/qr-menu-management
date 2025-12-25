import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRestaurant } from "../api/restaurant.api";

export default function CreateRestaurant() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !address || !contactNumber) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);

      await createRestaurant({
        name: name.trim(),
        address: address.trim(),
        contactNumber: contactNumber.trim(),
      });

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Failed to create restaurant");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4">Create Restaurant</h2>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <input
          type="text"
          placeholder="Restaurant name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-xl px-4 py-2 mb-3"
        />

        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border rounded-xl px-4 py-2 mb-3"
        />

        <input
          type="text"
          placeholder="Contact number"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          className="w-full border rounded-xl px-4 py-2 mb-4"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white rounded-xl py-2"
        >
          {loading ? "Creating..." : "Create Restaurant"}
        </button>
      </form>
    </div>
  );
}
