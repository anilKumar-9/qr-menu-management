import ApiResponse from "../utils/api-Response.js"
import { asyncHandler } from "../utils/async-handler.js"

export const healthCheckController = asyncHandler(async (req,res)=>{
    res.status(200).json(new ApiResponse(200,{
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    },"server is up and running"))
})