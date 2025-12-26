import express from 'express';
import { accessTokenVerify } from '../middlewares/auth.middleware.js';
import { createMenuItemsValidator } from '../validators/menu-items.validator.js';
import { userAuthenticationMiddleware } from '../middlewares/validate.middleware.js';
import {
  createMenuItem,
  updateMenuItem,
  getMenuItems,
  deactivateMenuItem,
  deleteMenuItem,
} from '../controllers/menu-items.controller.js';

const menuItemRouter = express.Router();

menuItemRouter.post(
  '/menu-items/menu/:menuId',
  accessTokenVerify,
  createMenuItemsValidator(),
  userAuthenticationMiddleware,
  createMenuItem,
);

menuItemRouter.get('/menu-items/menu/:menuId', accessTokenVerify, getMenuItems);

menuItemRouter.patch('/menu-items/:itemId', accessTokenVerify, updateMenuItem);

menuItemRouter.patch(
  '/menu-items/:itemId/toggle',
  accessTokenVerify,
  deactivateMenuItem,
);

// ✅ DELETE MENU ITEM
menuItemRouter.delete('/menu-items/:itemId', accessTokenVerify, deleteMenuItem);

export default menuItemRouter;
