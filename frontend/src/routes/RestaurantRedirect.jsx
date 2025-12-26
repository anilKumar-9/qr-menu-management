import { Navigate, useParams } from "react-router-dom";

export default function RestaurantRedirect() {
  const { restaurantId } = useParams();

  return <Navigate to={`/manage/restaurant/${restaurantId}/menus`} replace />;
}
