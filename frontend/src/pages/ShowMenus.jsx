import { useNavigate, useParams } from "react-router-dom";

export default function ShowMenus({ menus }) {
  const navigate = useNavigate();
  const { restaurantId } = useParams();

  return (
    <div>
      {menus.map((menu) => (
        <div key={menu._id}>
          <h3>{menu.name}</h3>

          <button onClick={() => navigate(`/menu/${menu._id}/items`)}>
            Manage Items
          </button>
        </div>
      ))}
    </div>
  );
}
