import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';
import UsersController from './app/Controllers/UsersController';
import SessionController from './app/Controllers/SessionController';

const routes = new Router();

routes.post('/users', UsersController.store);
routes.post('/session', SessionController.store);

routes.use(authMiddleware);

export default routes;