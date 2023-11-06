import { Router } from 'express';
import userRouter from './users.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/', userRouter);
routes.use('/', sessionsRouter);

export default routes;