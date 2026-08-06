import express from "express"
import { healthCheckController } from "../controllers/healthcheck.controller.js";

const healthCheckRouter=express.Router();

healthCheckRouter.get('/',healthCheckController)

export default healthCheckRouter;