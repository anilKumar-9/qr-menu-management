import instance from "../../utils/axios";

export const createMenu = (restaurantId, data) =>
  instance.post(`/menus/${restaurantId}`, data);

export const getMenus = (restaurantId) => instance.get(`/menus/${restaurantId}`);
