import api from "../utils/axios";

export const createMenuItem = (menuId, data) =>
  api.post(`/menu-items/menu/${menuId}`, data);

export const getMenuItems = (menuId) => api.get(`/menu-items/menu/${menuId}`);
