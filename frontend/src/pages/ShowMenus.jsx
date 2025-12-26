import { useNavigate, useParams } from "react-router-dom";

export default function ShowMenus({ menus }) {
  const navigate = useNavigate();
  const { restaurantId } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Menus</h1>

      {menus.map((menu) => (
        <div
          key={menu._id}
          className="border p-4 mb-3 flex justify-between items-center"
        >
          <span className="font-semibold">{menu.name}</span>

          <button
            onClick={() => navigate(`/menu/${menu._id}/items`)}
            className="border px-3 py-1 rounded"
          >
            Manage Items
          </button>
        </div>
      ))}
    </div>
  );
}
