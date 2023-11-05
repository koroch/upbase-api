import { Router } from 'express';
import userRouter from './users.routes';

const routes = Router();

routes.use('/', userRouter);

export default routes;