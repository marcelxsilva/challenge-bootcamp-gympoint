import { Router } from 'express';

import CreateRegistrationPlanController from './app/Controllers/CreateRegistrationPlanController';
const routes = new Router();

routes.get('/', CreateRegistrationPlanController.index);
routes.post('/', CreateRegistrationPlanController.store);
routes.put('/', CreateRegistrationPlanController.update);
routes.delete('/', CreateRegistrationPlanController.delete);

export default routes;