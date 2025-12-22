import axios from "./axios";

export const getPublicMenu = (restaurantId) => {
  return axios.get(`/public/menu/${restaurantId}`);
};
