import ApiResponse from '../utils/api-response.js';
import ApiError from '../utils/api-error.js';
import asyncHandler from '../utils/async-handler.js';
import Restaurant from '../models/restaurant.model.js';
import Menu from '../models/menu.model.js';
import Menuitem from '../models/menu-item.model.js';

/**
 * CREATE MENU ITEM
 * POST /api/v1/menu-items/menu/:menuId
 */
const createMenuItem = asyncHandler(async (req, res) => {
  const { menuId } = req.params;
  const { name, description, price, category } = req.body;

  if (!menuId) {
    throw new ApiError(400, 'menuId is required');
  }

  const menu = await Menu.findOne({ _id: menuId, isActive: true });
  if (!menu) {
    throw new ApiError(404, 'Menu not found or inactive');
  }

  const restaurant = await Restaurant.findOne({
    _id: menu.restaurantId,
    owner: req.user.id,
    isActive: true,
  });

  if (!restaurant) {
    throw new ApiError(403, 'Unauthorized access');
  }

  const createdMenuItem = await Menuitem.create({
    menuId,
    name,
    description,
    price,
    category,
    isAvailable: true,
  });

  res
    .status(201)
    .json(
      new ApiResponse(201, createdMenuItem, 'Menu item created successfully'),
    );
});

/**
 * GET MENU ITEMS
 * GET /api/v1/menu-items/menu/:menuId
 */
const getMenuItems = asyncHandler(async (req, res) => {
  const { menuId } = req.params;

  const menu = await Menu.findById(menuId);
  if (!menu) {
    throw new ApiError(404, 'Menu not found');
  }

  const restaurant = await Restaurant.findOne({
    _id: menu.restaurantId,
    owner: req.user.id,
    isActive: true,
  });

  if (!restaurant) {
    throw new ApiError(403, 'Unauthorized access');
  }

  const items = await Menuitem.find({ menuId });

  res
    .status(200)
    .json(new ApiResponse(200, items, 'Menu items fetched successfully'));
});

/**
 * UPDATE MENU ITEM
 * PATCH /api/v1/menu-items/:itemId
 */
const updateMenuItem = asyncHandler(async (req, res) => {
  const { itemId } = req.params;

  const item = await Menuitem.findById(itemId);
  if (!item) {
    throw new ApiError(404, 'Menu item not found');
  }

  const menu = await Menu.findById(item.menuId);
  if (!menu) {
    throw new ApiError(404, 'Menu not found');
  }

  const restaurant = await Restaurant.findOne({
    _id: menu.restaurantId,
    owner: req.user.id,
    isActive: true,
  });

  if (!restaurant) {
    throw new ApiError(403, 'Unauthorized access');
  }

  Object.assign(item, req.body);
  await item.save({ validateBeforeSave: false });

  res
    .status(200)
    .json(new ApiResponse(200, item, 'Menu item updated successfully'));
});

/**
 * DEACTIVATE MENU ITEM (Availability OFF)
 * PATCH /api/v1/menu-items/:itemId/toggle
 */
const deactivateMenuItem = asyncHandler(async (req, res) => {
  const { itemId } = req.params;

  const item = await Menuitem.findById(itemId);
  if (!item) {
    throw new ApiError(404, 'Menu item not found');
  }

  const menu = await Menu.findById(item.menuId);
  if (!menu) {
    throw new ApiError(404, 'Menu not found');
  }

  const restaurant = await Restaurant.findOne({
    _id: menu.restaurantId,
    owner: req.user.id,
    isActive: true,
  });

  if (!restaurant) {
    throw new ApiError(403, 'Unauthorized access');
  }

  item.isAvailable = !item.isAvailable;
  await item.save({ validateBeforeSave: false });

  res
    .status(200)
    .json(new ApiResponse(200, item, 'Menu item availability updated'));
});

/**
 * DELETE MENU ITEM
 * DELETE /api/v1/menu-items/:itemId
 */
const deleteMenuItem = asyncHandler(async (req, res) => {
  const { itemId } = req.params;

  const item = await Menuitem.findById(itemId);
  if (!item) {
    throw new ApiError(404, 'Menu item not found');
  }

  const menu = await Menu.findById(item.menuId);
  if (!menu) {
    throw new ApiError(404, 'Menu not found');
  }

  const restaurant = await Restaurant.findOne({
    _id: menu.restaurantId,
    owner: req.user.id,
    isActive: true,
  });

  if (!restaurant) {
    throw new ApiError(403, 'Unauthorized access');
  }

  await item.deleteOne();

  res
    .status(200)
    .json(new ApiResponse(200, {}, 'Menu item deleted successfully'));
});

export {
  createMenuItem,
  getMenuItems,
  updateMenuItem,
  deactivateMenuItem,
  deleteMenuItem,
};
