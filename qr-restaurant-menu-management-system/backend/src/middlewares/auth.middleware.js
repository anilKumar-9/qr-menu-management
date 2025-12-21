import jwt from "jsonwebtoken"
import ApiError from "../utils/api-error.js";
import Owner from "../models/owner.model.js";
import asyncHandler from "../utils/async-handler.js";

export const accessTokenVerify=asyncHandler(async (req,res,next)=>{
    const accessToken =
      req.cookies?.accessToken ||
      (req.headers.authorization?.replace('Bearer ', ''));

    if (!accessToken) {
      throw new ApiError(401,"UnAuthorized Access");
    }

    
    try{
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

      const user = await Owner.findById(decoded?.id).select(
        '-password -refreshToken -emailVerificationToken -emailVerificationExpiry',
      );;

      if(!user)
      {
        throw new ApiError(401, 'Invalid Access');
      }

      req.user=user;

    }catch(err)
    {
        throw new ApiError(401,"Invalid Access");
    }

    next();

})