import { ICreateTicket } from '../dtos/create-ticket';
import { Ticket } from '../entities/ticket';

interface ITicketsRepository {
  create(data: ICreateTicket): Promise<Ticket>;

  listAll(): Promise<Ticket[]>;

  findById(id: string): Promise<Ticket>;

  remove(ticket: Ticket): Promise<void>;
}

export { ITicketsRepository };
