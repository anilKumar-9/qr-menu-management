import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPublicMenu } from "../api/public.api";

export default function PublicMenu() {
  const { restaurantId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMenu() {
      try {
        const res = await getPublicMenu(restaurantId);
        setData(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchMenu();
  }, [restaurantId]);

  if (loading) return <p>Loading...</p>;
  if (!data) return <p>No data</p>;

  return (
    <div style={{ padding: "16px" }}>
      <h1>{data.restaurant.name}</h1>

      {data.menus.map((menu) => (
        <div key={menu._id}>
          <h2>{menu.title}</h2>

          {data.items
            .filter((item) => item.menuId === menu._id)
            .map((item) => (
              <p key={item._id}>
                {item.name} – ₹{item.price}
              </p>
            ))}
        </div>
      ))}
    </div>
  );
}
