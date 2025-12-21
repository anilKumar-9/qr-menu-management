
import { body } from 'express-validator';

export const createRestaurantValidator = ()=>{
  return [
  body('name').notEmpty().withMessage('Restaurant name is required'),

  body('address').notEmpty().withMessage('Address is required'),

  body('contactNumber')
    .notEmpty()
    .withMessage('Contact number is required')
    .isLength({ min: 10, max: 10 })
    .withMessage('Contact number must be 10 digits'),
]};