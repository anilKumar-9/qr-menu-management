import ApiResponse from '../utils/api-response.js';
import ApiError from '../utils/api-error.js';
import asyncHandler from '../utils/async-handler.js';
import Restaurant from '../models/restaurant.model.js';
import Menu from '../models/menu.model.js';
import MenuItem from '../models/menu-item.model.js';

export const getPublicMenu = asyncHandler(async (req, res) => {
  const { restaurantId } = req.params;

  const restaurant = await Restaurant.findOne({
    _id: restaurantId,
    isActive: true,
  });

  if (!restaurant) {
    throw new ApiError(404, 'Restaurant not found');
  }

  const menus = await Menu.find({
    restaurantId,
    isActive: true,
    isPublished: true,
  });

  if (!menus.length) {
    return res
      .status(200)
      .json(new ApiResponse(200, { restaurant, menus: [], items: [] }));
  }

 
  const menuIds = menus.map((m) => m._id);

  const items = await MenuItem.find({
    menuId: { $in: menuIds },
    isAvailable: true,
  });

  res.status(200).json(
    new ApiResponse(
      200,
      {
        restaurant,
        menus,
        items,
      },
      'Public menu fetched successfully',
    ),
  );
});
