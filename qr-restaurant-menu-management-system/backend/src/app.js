import express from "express"
import ApiResponse from "./utils/api-Response.js";

const app=express();

app.use(express.json())

import healthCheckRouter from "./routers/healthcheck.route.js";
app.get('/',(req,res)=>{
    console.log(req.method,req.url,req.path);
    res.status(200).send(new ApiResponse(200,{"Name":"Anil","gender":"male"}));
})

app.use('/api/health', healthCheckRouter);


export default app;