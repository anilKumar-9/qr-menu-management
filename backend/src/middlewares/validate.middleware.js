import { validationResult } from "express-validator";
import ApiError from "../utils/api-error.js";

export const userAuthenticationMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const error = new ApiError(400, 'The request is not correct', errors.array());
  next(error);
};
