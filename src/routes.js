import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';
import UsersController from './app/Controllers/UsersController';
import SessionController from './app/Controllers/SessionController';
import AcademyPlanController from './app/Controllers/AcademyPlanController';

const routes = new Router();

routes.post('/users', UsersController.store);
routes.post('/session', SessionController.store);

routes.use(authMiddleware);
routes.put('/users', UsersController.update);

// plan 
routes.get('/plan', AcademyPlanController.index);
routes.post('/plan', AcademyPlanController.store);

export default routes;