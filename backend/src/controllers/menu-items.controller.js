import express from 'express';
import {
  createMenuItem,
  getMenuItems,
  updateMenuItem,
  toggleMenuItem,
  deleteMenuItem,
} from '../controllers/menuitem.controller.js';

import { accessTokenVerify } from '../middlewares/auth.middleware.js';

const router = express.Router();

/**
 * Menu Items Routes
 */

// get menu items
router.get('/menu/:menuId', accessTokenVerify, getMenuItems);

// create menu item
router.post('/menu/:menuId', accessTokenVerify, createMenuItem);

// update menu item
router.patch('/:itemId', accessTokenVerify, updateMenuItem);

// toggle availability
router.patch('/:itemId/toggle', accessTokenVerify, toggleMenuItem);

// delete menu item
router.delete('/:itemId', accessTokenVerify, deleteMenuItem);

export default router;
