import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "../utils/axios";


export default function AddMenuItem() {
  const { menuId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await axios.post("/menu-items", {
        ...form,
        menuId,
      });

      // go back to manage items page
      navigate(`/menu/${menuId}/items`);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to add menu item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add Menu Item</h1>

      {error && <p className="mb-4 text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Item name"
          required
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          required
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          required
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <input
          type="text"
          name="category"
          placeholder="Category (e.g. veg, non-veg)"
          required
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded w-full"
        >
          {loading ? "Adding..." : "Add Item"}
        </button>
      </form>
    </div>
  );
}
