
import { body } from 'express-validator';

export const createMenuItemsValidator = ()=>{
  return [
    body('name').notEmpty().withMessage('Restaurant name is required'),

    body('description').notEmpty().withMessage('description is required'),

    body('category').notEmpty().withMessage('category is required'),


  ];};