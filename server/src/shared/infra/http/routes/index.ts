import { Router } from 'express';

import { companiesRoutes } from './companies.routes';
import { placesRoutes } from './places.routes';
import { responsiblesRoutes } from './responsibles.routes';

const routes = Router();

routes.use('/companies', companiesRoutes);
routes.use('/places', placesRoutes);
routes.use('/responsibles', responsiblesRoutes);

export { routes };
