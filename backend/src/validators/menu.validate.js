import { body } from 'express-validator';

export const createMenuValidator = ()=>{
  return [
  body('title')
  .notEmpty()
  .withMessage('title is required'),
]};