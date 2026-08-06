import instance from "../utils/axios";

// get items of a menu
export const getMenuItemsByMenu = (menuId) =>
  instance.get(`/menu-items/menu/${menuId}`);

// ✅ CREATE ITEM — FIXED
export const createMenuItem = (menuId, data) =>
  instance.post(`/menu-items/menu/${menuId}`, data);

// delete item
export const deleteMenuItem = (itemId) =>
  instance.delete(`/menu-items/${itemId}`);

// toggle availability
export const toggleMenuItem = (itemId) =>
  instance.patch(`/menu-items/${itemId}/toggle`);
