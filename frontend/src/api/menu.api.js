import api from "../utils/axios";

export const createMenu = (restaurantId, data) =>
  api.post(`/menus/${restaurantId}`, data);

export const getMenus = (restaurantId) => api.get(`/menus/${restaurantId}`);
