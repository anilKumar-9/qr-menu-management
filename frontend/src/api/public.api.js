import axios from "../../utils/axios";

export const getPublicMenu = (restaurantId) => {
  return axios.get(`/public/menu/${restaurantId}`);
};
