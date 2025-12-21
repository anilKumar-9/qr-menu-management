import express from 'express';
import { getPublicMenu } from '../controllers/public.controller.js';

const publicRouter = express.Router();

publicRouter.get('/menu/:restaurantId', getPublicMenu);

export default publicRouter;
