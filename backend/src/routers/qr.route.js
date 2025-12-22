import express from 'express';
import { accessTokenVerify } from '../middlewares/auth.middleware.js';
import { getRestaurantQR } from '../controllers/restaurant.controller.js';

const qrRouter = express.Router();

qrRouter.get('/:restaurantId/qr', accessTokenVerify, getRestaurantQR);

export default qrRouter;
