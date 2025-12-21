import express from "express"
import { createRestaurantValidator } from "../validators/restaurant.validate.js";
import { accessTokenVerify } from "../middlewares/auth.middleware.js";
import { userAuthenticationMiddleware } from "../middlewares/validate.middleware.js";
import { activateRestaurant, createRestaurant, getRestaurantById, getRestaurants, softDeleteRestaurant, updateRestaurant } from "../controllers/restaurant.controller.js";


const restaurantRouter=express.Router();


restaurantRouter.post(
  '/restaurant',
  accessTokenVerify,
  createRestaurantValidator(),
  userAuthenticationMiddleware,
  createRestaurant,
);

restaurantRouter.get(
  '/',
  accessTokenVerify,
  getRestaurants,
);

restaurantRouter.get(
  '/:restaurantId',
  accessTokenVerify,
  getRestaurantById,
);

restaurantRouter.patch(
    '/:restaurantId', 
    accessTokenVerify, 
    updateRestaurant);

restaurantRouter.patch(
  '/delete/:restaurantId',
  accessTokenVerify,
  softDeleteRestaurant,
);

restaurantRouter.patch(
    '/activate/:restaurantId', 
    accessTokenVerify, 
    activateRestaurant
);





export default restaurantRouter;