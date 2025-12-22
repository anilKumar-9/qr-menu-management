import { validationResult } from "express-validator";
import ApiError from "../utils/api-error.js";

export const userAuthenticationMiddleware= (req,res,next)=>{
    const errors=validationResult(req);
    if(errors.isEmpty())
    {
        return next();
    }
    
    console.log(errors.array());
    
    throw new ApiError(400, 'The request is not correct', errors.array());
}