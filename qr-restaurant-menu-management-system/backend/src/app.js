import express from "express"
import cors from "cors"

const app=express();

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static("public"));

app.use(
  cors({
    origin: process.env.CORS_ORGIN || 'http://localhost:5173',
    credentials: true,
    allowedHeaders:['Authorization','Content-Type'],
    methods:["GET","POST","PUT","PATCH","DELETE"]
  }),
);

import healthCheckRouter from "./routers/healthcheck.route.js";
app.get('/',(req,res)=>{
    console.log(req.method,req.url);
    res.status(200).json({data:"Welcome to home page without using ApiResponse"});
})

app.use('/api/health', healthCheckRouter);


export default app;