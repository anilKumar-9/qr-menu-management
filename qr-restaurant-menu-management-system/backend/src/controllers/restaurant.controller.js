import ApiResponse from '../utils/api-response.js';
import ApiError from '../utils/api-error.js';
import asyncHandler from '../utils/async-handler.js';
import Restaurant from '../models/restaurant.model.js';
import { generateRestaurantQR } from '../utils/qr.js';

const createRestaurant = asyncHandler(async (req,res)=>{
    const {name,contactNumber,address}=req.body;

    const exists= await Restaurant.findOne({
        name,
        owner:req.user.id,
    })

    if (exists) {
        throw new ApiError(409, 'Restaurant already exists');
    }

    const createdRestaurant=await Restaurant.create({
        owner:req.user.id,
        name,
        address,
        contactNumber,
        isActive:true
    })
    const qrCode = await generateRestaurantQR(createdRestaurant._id.toString());
    createdRestaurant.qrCode = qrCode;
    await createdRestaurant.save({ validateBeforeSave: false });

    res.status(201).json(new ApiResponse(201,createdRestaurant,"created sucessfully"))
})


 const getRestaurants = asyncHandler(async(req,res)=>{

    const ownerId = req.user.id;
    if (!ownerId) {
      throw new ApiError(400, 'Invalid restaurant id');
    }

    const restaurant = await Restaurant.find({
      owner: ownerId,
      isActive:true
    });

    res.status(200).json(new ApiResponse(200,{restaurant},"restaurant fetched sucessfully"));
 })


const getRestaurantById = asyncHandler(async (req, res) => {
   const { restaurantId } = req.params;

   if (!restaurantId) {
     throw new ApiError(400, 'Restaurant ID is required');
   }

   const restaurant = await Restaurant.findOne({
     _id: restaurantId,
     owner: req.user.id,
     isActive:true
   });

   if (!restaurant) {
     throw new ApiError(404, 'Restaurant not found');
   }

  
   res
     .status(200)
     .json(new ApiResponse(200, restaurant, 'Restaurant fetched successfully'));
 });

const updateRestaurant = asyncHandler(async (req, res) => {
  const { restaurantId } = req.params;
  const updates = req.body;
  if (!restaurantId) {
    throw new ApiError(404, 'Invalid restaurant id');
  }

  const restaurant = await Restaurant.findOne({
    _id: restaurantId,
    owner: req.user.id,
  });

  if (!restaurant) {
    throw new ApiError(404, 'no restaurant found');
  }

  const forbiddenFields = ['_id', 'owner', 'createdAt', 'updatedAt'];
  forbiddenFields.forEach((field) => delete updates[field]);

  Object.keys(updates).forEach((key) => {
    restaurant[key] = updates[key];
  });

  await restaurant.save({ validateBeforeSave: false });

  res
    .status(200)
    .json(new ApiResponse(200, restaurant, 'Updates completed sucessfully'));
})

const softDeleteRestaurant = asyncHandler(async (req, res) => {
  const { restaurantId } = req.params;


  if (!restaurantId) {
    throw new ApiError(404, 'Restaurant ID is required');
  }

  const restaurant = await Restaurant.findOne({
    _id: restaurantId,
    owner: req.user.id,
    isActive:true
  });

  if (!restaurant) {
    throw new ApiError(404, 'restaurant not found');
  }
  
   restaurant.isActive=true;

   await restaurant.save({validateBeforeSave:false})

  res
    .status(200)
    .json(new ApiResponse(200, restaurant, 'disable completed sucessfully'));
});

const activateRestaurant = asyncHandler(async (req, res) => {
  const { restaurantId } = req.params;

  if (!restaurantId) {
    throw new ApiError(404, 'Restaurant ID is required');
  }

  const restaurant = await Restaurant.findOne({
    _id: restaurantId,
    owner: req.user.id,
    isActive:false
  });

  if (!restaurant) {
    throw new ApiError(404, 'restaurant not found');
  }

  restaurant.isActive = true;

  await restaurant.save({ validateBeforeSave: false });

  res
    .status(200)
    .json(new ApiResponse(200, restaurant, 'Restaurant activated sucessfully'));
});

const getRestaurantQR = asyncHandler(async (req, res) => {
  const { restaurantId } = req.params;

  const restaurant = await Restaurant.findOne({
    _id: restaurantId,
    owner: req.user.id,
    isActive: true,
  });

  if (!restaurant) {
    throw new ApiError(404, 'Restaurant not found');
  }

  if (!restaurant.qrCode) {
    const qrCode = await generateRestaurantQR(restaurant._id.toString());
    restaurant.qrCode = qrCode;
    await restaurant.save({ validateBeforeSave: false });
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { qrCode: restaurant.qrCode },
        'QR fetched successfully',
      ),
    );
});


export {
  createRestaurant,
  getRestaurants,
  getRestaurantById,
  updateRestaurant,
  softDeleteRestaurant,
  activateRestaurant,
  getRestaurantQR
};