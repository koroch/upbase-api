import { Router } from 'express';

import UsersController from '../controllers/UserController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post('/user', usersController.create);
usersRouter.get('/teachers', usersController.listTeachers);
usersRouter.get('/students', usersController.listStudents);
usersRouter.delete('/user/:email', ensureAuthenticated, usersController.delete);
usersRouter.put('/user', ensureAuthenticated, usersController.update);


export default usersRouter;