import { Router } from 'express';

import { CreateTicketController } from '../../../../modules/tickets/use-cases/create-ticket/create-ticket-controller';
import { ListTicketsController } from '../../../../modules/tickets/use-cases/list-tickets/list-tickets-controller';
import { RemoveTicketController } from '../../../../modules/tickets/use-cases/remove-ticket/remove-ticket-controller';
import { ShowTicketController } from '../../../../modules/tickets/use-cases/show-ticket/show-ticket-controller';
import { UpdateTicketController } from '../../../../modules/tickets/use-cases/update-ticket/update-ticket-controller';

const ticketsRoutes = Router();

const createTicketController = new CreateTicketController();
const listTicketsController = new ListTicketsController();
const showTicketController = new ShowTicketController();
const removeTicketController = new RemoveTicketController();
const updateTicketController = new UpdateTicketController();

ticketsRoutes.post('/', createTicketController.handle);
ticketsRoutes.get('/', listTicketsController.handle);
ticketsRoutes.get('/:id', showTicketController.handle);
ticketsRoutes.delete('/:id', removeTicketController.handle);
ticketsRoutes.patch('/:id', updateTicketController.handle);

export { ticketsRoutes };
