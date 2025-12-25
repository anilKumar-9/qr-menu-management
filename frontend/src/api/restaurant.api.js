import instance from "../../utils/axios";

// ✅ create restaurant
export const createRestaurant = (data) => instance.post("/restaurants", data);

// ✅ get all restaurants
export const getRestaurants = () => instance.get("/restaurants");

// ✅ get single restaurant
export const getRestaurantById = (restaurantId) =>
  instance.get(`/restaurants/${restaurantId}`);

// ✅ 🔥 THIS WAS MISSING
export const getRestaurantQR = (restaurantId) =>
  instance.get(`/restaurants/${restaurantId}/qr`);
