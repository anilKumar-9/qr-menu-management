import express from "express"
import { createMenuValidator } from "../validators/menu.validate.js";
import { userAuthenticationMiddleware } from "../middlewares/validate.middleware.js";
import { accessTokenVerify } from "../middlewares/auth.middleware.js";
import {
  createMenu,
  activateMenu,
  deactivateMenu,
  publishMenu,
  unPublishMenu,
  getMenus,
} from '../controllers/menu.controller.js';

const menuRouter=express.Router();

menuRouter.post(
  '/:restaurantId',
  accessTokenVerify,
  createMenuValidator(),
  userAuthenticationMiddleware,
  createMenu,
);

menuRouter.get(
  '/restaurants/:restaurantId',
  accessTokenVerify,
  getMenus,
);

menuRouter.patch("/:menuId/activate",accessTokenVerify,activateMenu)
menuRouter.patch('/:menuId/deactivate', accessTokenVerify, deactivateMenu);
menuRouter.patch('/:menuId/publish', accessTokenVerify, publishMenu);
menuRouter.patch('/:menuId/unpublish', accessTokenVerify,unPublishMenu);


export default menuRouter;