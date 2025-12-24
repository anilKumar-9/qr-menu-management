import express from "express"
import { changeCurrentPassword, forgotPassword, getUser, login, logout, refreshAccessToken, registerUser, resendEmailVerification, resetForgotPassword, verifyEmail } from '../controllers/auth.controller.js';
import { changePasswordValidator, forgotPasswordValidator, loginValidator, resetPasswordValidator, userRegistrationValidator } from "../validators/user.validate.js";

import {userAuthenticationMiddleware} from "../middlewares/validate.middleware.js"

import {accessTokenVerify} from "../middlewares/auth.middleware.js"


const authRouter=express.Router();

//unsecure routes

authRouter.post(
  '/register',
  userRegistrationValidator(),
  userAuthenticationMiddleware,
  registerUser,
);

authRouter.post(
  '/login',
  loginValidator(),
  userAuthenticationMiddleware,
  login,
);

authRouter.get('/verify-email/:token',verifyEmail);

authRouter.post('/refresh-token',refreshAccessToken);

authRouter.post(
  '/forgot-password',
  forgotPasswordValidator(),
  userAuthenticationMiddleware,
  forgotPassword,
);

authRouter.post(
  '/reset-password/:verificationToken',
  resetPasswordValidator(),
  userAuthenticationMiddleware,
  resetForgotPassword,
);

//secure routes which checks access token first

authRouter.get("/me",accessTokenVerify,getUser)

authRouter.post('/logout', accessTokenVerify, logout);

authRouter.post(
  '/change-password',
  accessTokenVerify,
  changePasswordValidator(),
  userAuthenticationMiddleware,
  changeCurrentPassword,
);

authRouter.post("/resend-email-verification",accessTokenVerify,resendEmailVerification)

export default authRouter;