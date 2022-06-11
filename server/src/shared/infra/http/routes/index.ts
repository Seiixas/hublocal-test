import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

import { companiesRoutes } from './companies.routes';
import { placesRoutes } from './places.routes';
import { responsiblesRoutes } from './responsibles.routes';
import { ticketsRoutes } from './tickets.routes';
import { usersRoutes } from './users.routes';

const routes = Router();

routes.use('/companies', ensureAuthenticated, companiesRoutes);
routes.use('/places', ensureAuthenticated, placesRoutes);
routes.use('/responsibles', ensureAuthenticated, responsiblesRoutes);
routes.use('/tickets', ensureAuthenticated, ticketsRoutes);
routes.use('/users', usersRoutes);

export { routes };
