import axios from "./axios";

export const getRestaurantQR = (restaurantId) => {
  return axios.get(`/qr/${restaurantId}`, {
    withCredentials: true,
  });
};
