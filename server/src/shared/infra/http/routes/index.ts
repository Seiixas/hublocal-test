import { Router } from 'express';

import { companiesRoutes } from './companies.routes';

const routes = Router();

routes.use('/companies', companiesRoutes);

export { routes };
