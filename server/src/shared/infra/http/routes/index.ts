import { Router } from 'express';

import { companiesRoutes } from './companies.routes';
import { placesRoutes } from './places.routes';

const routes = Router();

routes.use('/companies', companiesRoutes);
routes.use('/places', placesRoutes);

export { routes };
