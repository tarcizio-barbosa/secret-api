import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { CreateUserController } from '../controllers/CreateUserController';

const routes = Router();

const createUserController = new CreateUserController();
const authController = new AuthController();

routes.post('/', createUserController.handle);
routes.post('/login', authController.handle);

export default routes;
