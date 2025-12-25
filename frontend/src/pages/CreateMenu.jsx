import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createMenu } from "../api/menu.api";

export default function CreateMenu() {
  const { restaurantId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Menu name is required");
      return;
    }

    try {
      setLoading(true);

      await createMenu({
        restaurantId,
        name: name.trim(),
        description: description.trim(),
      });

      // After menu creation → go back
      navigate(`/restaurant/${restaurantId}`);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to create menu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-sm border w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4">Create Menu</h2>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <input
          type="text"
          placeholder="Menu name (e.g. Main Menu)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-xl px-4 py-2 mb-3"
        />

        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded-xl px-4 py-2 mb-4"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white rounded-xl py-2"
        >
          {loading ? "Creating..." : "Create Menu"}
        </button>
      </form>
    </div>
  );
}
