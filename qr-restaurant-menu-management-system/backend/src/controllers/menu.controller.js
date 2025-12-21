import ApiResponse from '../utils/api-response.js';
import ApiError from '../utils/api-error.js';
import asyncHandler from '../utils/async-handler.js';
import Restaurant from '../models/restaurant.model.js';
import Menu from '../models/menu.model.js';


const createMenu = asyncHandler(async (req, res) => {
  const { restaurantId } = req.params;
  const { title } = req.body;

  const restaurant = await Restaurant.findOne({
    _id: restaurantId,
    owner: req.user.id,
    isActive: true,
  });

  if (!restaurant) {
    throw new ApiError(403, 'Unauthorized or inactive restaurant');
  }

  const menu = await Menu.create({
    restaurantId,
    title,
    isPublished: false,
    isActive: true,
  });

  res.status(201).json(new ApiResponse(201, menu, 'Menu created successfully'));
});

const activateMenu = asyncHandler(async (req, res) => {
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
    throw new ApiError(403, 'Unauthorized or inactive restaurant');
  }

  menu.isActive = true;
  menu.isPublished = false; 
  await menu.save({ validateBeforeSave: false });

  res
    .status(200)
    .json(new ApiResponse(200, menu, 'Menu activated successfully'));
});

const deactivateMenu = asyncHandler(async (req, res) => {
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
    throw new ApiError(403, 'Unauthorized or inactive restaurant');
  }

  menu.isActive = false;
  menu.isPublished = false; 
  await menu.save({ validateBeforeSave: false });

  res
    .status(200)
    .json(new ApiResponse(200, {}, 'Menu deactivated successfully'));
});

const publishMenu = asyncHandler(async (req, res) => {
  const { menuId } = req.params;

  const menu = await Menu.findOne({
    _id: menuId,
    isActive: true,
    isPublished: false,
  });

  if (!menu) {
    throw new ApiError(404, 'Menu not found or already published');
  }

  const restaurant = await Restaurant.findOne({
    _id: menu.restaurantId,
    owner: req.user.id,
    isActive: true,
  });

  if (!restaurant) {
    throw new ApiError(403, 'Unauthorized or inactive restaurant');
  }

  menu.isPublished = true;
  await menu.save({ validateBeforeSave: false });

  res
    .status(200)
    .json(new ApiResponse(200, menu, 'Menu published successfully'));
});


const unPublishMenu = asyncHandler(async (req, res) => {
  const { menuId } = req.params;

  const menu = await Menu.findOne({
    _id: menuId,
    isActive: true,
    isPublished: true,
  });

  if (!menu) {
    throw new ApiError(404, 'Menu not found or already unpublished');
  }

  const restaurant = await Restaurant.findOne({
    _id: menu.restaurantId,
    owner: req.user.id,
    isActive: true,
  });

  if (!restaurant) {
    throw new ApiError(403, 'Unauthorized or inactive restaurant');
  }

  menu.isPublished = false;
  await menu.save({ validateBeforeSave: false });

  res
    .status(200)
    .json(new ApiResponse(200, menu, 'Menu unpublished successfully'));
});

const getMenus = asyncHandler(async (req, res) => {
  const { restaurantId } = req.params;


  const restaurant = await Restaurant.findOne({
    _id: restaurantId,
    owner: req.user.id,
    isActive: true,
  });

  if (!restaurant) {
    throw new ApiError(404, 'Restaurant not found or unauthorized');
  }

  const menus = await Menu.find({
    restaurantId,
    isActive: true,
  });

  res
    .status(200)
    .json(new ApiResponse(200, menus, 'Menus fetched successfully'));
});




export 
{ 
    createMenu, 
    activateMenu, 
    deactivateMenu, 
    publishMenu, 
    unPublishMenu ,
    getMenus
};
