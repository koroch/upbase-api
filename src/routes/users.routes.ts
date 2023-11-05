import { Router } from 'express';

import UsersController from '../controllers/UserController';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post('/user', usersController.create);
usersRouter.get('/teachers', usersController.listTeachers);
usersRouter.get('/students', usersController.listStudents);


export default usersRouter;