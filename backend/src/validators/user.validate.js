import { body } from 'express-validator';

export const userRegistrationValidator = () => {
  return [
    body('ownername')
      .trim()
      .notEmpty()
      .withMessage('owner name is required')
      .isLength({ min: 3 })
      .withMessage('Owner name should be of minimum length of 3'),

    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email should not be empty')
      .isEmail()
      .withMessage('Enter valid Email address'),

    body('password')
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 8 })
      .withMessage('Password should be of minimum length of 8'),
  ];
};

export const loginValidator = () => {
  return [
    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email should not be empty')
      .isEmail()
      .withMessage('Enter valid Email address'),

    body('password')
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 8 })
      .withMessage('Password should be of minimum length of 8'),
  ];
};

export const changePasswordValidator = () => {
  return [
    body('oldPassword')
      .notEmpty()
      .withMessage('Password is required'),

    body('newPassword')
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 8 })
      .withMessage('Password should be of minimum length of 8'),
  ];
};

export const forgotPasswordValidator = () => {
  return [
    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email should not be empty')
      .isEmail()
      .withMessage('Enter valid Email address'),
  ];
};

export const resetPasswordValidator=()=>{
  return [
    body('newPassword')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password should be of minimum length of 8')
  ]
}