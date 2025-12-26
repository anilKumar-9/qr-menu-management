import instance from "../utils/axios";

// get items of a menu
export const getMenuItemsByMenu = (menuId) =>
  instance.get(`/menu-items/menu/${menuId}`);

// delete item
export const deleteMenuItem = (itemId) =>
  instance.delete(`/menu-items/${itemId}`);

// toggle availability
export const toggleMenuItem = (itemId) =>
  instance.patch(`/menu-items/${itemId}/toggle`);
