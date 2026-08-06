import instance from "../utils/axios";

export const createMenu = (restaurantId, data) =>
  instance.post(`/menus/${restaurantId}`, data);

export const getMenus = (restaurantId) =>
  instance.get(`/menus/restaurants/${restaurantId}`);

export const getMenuCount = () => instance.get(`/menus/count`);

export const getMenuById = (menuId) => instance.get(`/menus/${menuId}`);

export const deleteMenu = (menuId) => instance.delete(`/menus/${menuId}`);
