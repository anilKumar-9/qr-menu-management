import instance from "../../utils/axios";

export const createMenuItem = (menuId, data) =>
  instance.post(`/menu-items/menu/${menuId}`, data);

export const getMenuItems = (menuId) => instance.get(`/menu-items/menu/${menuId}`);
