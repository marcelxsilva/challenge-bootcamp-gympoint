import { Router } from 'express';

import verifyIsAdmin from './app/middlewares/verifyIsAdmin';
import authMiddleware from './app/middlewares/auth';
import UsersController from './app/Controllers/UsersController';
import SessionController from './app/Controllers/SessionController';
import AcademyPlanController from './app/Controllers/AcademyPlanController';
import CreateRegistrationPlanController from './app/Controllers/CreateRegistrationPlanController';
import CheckinController from './app/Controllers/CheckinController';
const routes = new Router();

routes.post('/users', UsersController.store);
routes.post('/session', SessionController.store);
routes.post('/checkin', CheckinController.store);

routes.use(authMiddleware);
routes.put('/users', UsersController.update);

// plan 
routes.get('/plan', AcademyPlanController.index);
routes.post('/plan', AcademyPlanController.store);
routes.put('/plan', AcademyPlanController.update);
routes.delete('/plan', AcademyPlanController.delete);

//associate user to plan
routes.post('/associatePlan', verifyIsAdmin, CreateRegistrationPlanController.store);
routes.put('/associatePlan', verifyIsAdmin, CreateRegistrationPlanController.update);

export default routes;