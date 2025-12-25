import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app=express();

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static("public"));

app.use(
  cors({
    origin: process.env.CORS_ORIGIN||'http://localhost:5173',
    credentials: true,
    allowedHeaders:['Authorization','Content-Type'],
    methods:["GET","POST","PUT","PATCH","DELETE"]
  }),
);

app.use(cookieParser())

import logger from './utils/logger.js';
import morgan from 'morgan';

const morganFormat = ':method :url :status :response-time ms';

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(' ')[0],
          url: message.split(' ')[1],
          status: message.split(' ')[2],
          responseTime: message.split(' ')[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  }),
);


import healthCheckRouter from "./routers/healthcheck.route.js";
import authRouter from "./routers/auth.route.js";
import restaurantRouter from "./routers/restaurant.route.js";
import menuRouter from "./routers/menu.route.js";
import menuItemRouter from "./routers/menu-items.route.js";
import publicRouter from "./routers/public.route.js";
import qrRouter from "./routers/qr.route.js";

app.get('/',(req,res)=>{
    res.status(200).json({data:"Welcome to home page"});
})

app.use('/api/v1/health', healthCheckRouter);

app.use('/api/v1/users',authRouter)

app.use('/api/v1/restaurants',restaurantRouter)

app.use('/api/v1/menus',menuRouter)

app.use('/api/v1',menuItemRouter)

app.use('/api/v1/public', publicRouter);

app.use('/api/v1/restaurants',qrRouter);
export default app;