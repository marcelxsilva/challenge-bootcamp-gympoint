import { Router } from 'express';
import verifyIsAdmin from './app/middlewares/verifyIsAdmin';
import authMiddleware from './app/middlewares/auth';
import UsersController from './app/Controllers/UsersController';
import SessionController from './app/Controllers/SessionController';
import AcademyPlanController from './app/Controllers/AcademyPlanController';
import CreateRegistrationPlanController from './app/Controllers/CreateRegistrationPlanController';
import CheckinController from './app/Controllers/CheckinController';
import ManagerRegistrationController from './app/Controllers/ManagerRegistrationController';
import HelpOrdersController from './app/Controllers/HelpOrdersController';

const routes = new Router();

routes.post('/session', SessionController.store);

routes.use(authMiddleware);
routes.put('/users', UsersController.update);
routes.post('/users', UsersController.store);

// plan 
routes.get('/plan', AcademyPlanController.index);
routes.post('/plan', AcademyPlanController.store);
routes.put('/plan/:id', AcademyPlanController.update);
routes.delete('/plan/:id', AcademyPlanController.delete);

//associate user to plan
routes.post('/associatePlan', verifyIsAdmin, CreateRegistrationPlanController.store);
routes.put('/associatePlan', verifyIsAdmin, CreateRegistrationPlanController.update);

routes.post('/manager-registration', ManagerRegistrationController.store);
routes.get('/manager-registration', ManagerRegistrationController.index);
routes.put('/manager-registration', ManagerRegistrationController.update);
routes.delete('/manager-registration', ManagerRegistrationController.delete);


routes.post('/checkin', CheckinController.store);
routes.get('/checkin', CheckinController.index);

routes.post('/students/:student_id/help-orders', HelpOrdersController.store);
routes.get('/students/help-orders', HelpOrdersController.index);
routes.put('/students/help-orders/answer', HelpOrdersController.update);

export default routes;