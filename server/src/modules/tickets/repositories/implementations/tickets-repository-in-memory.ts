import { ICreateTicket } from '../../dtos/create-ticket';
import { Ticket } from '../../infra/entities/ticket';
import { ITicketsRepository } from '../tickets-repository';

class TicketsRepositoryInMemory implements ITicketsRepository {
  private tickets: Ticket[] = [];

  async create(data: ICreateTicket): Promise<Ticket> {
    const ticket = new Ticket();

    Object.assign(ticket, data);

    this.tickets.push(ticket);

    return ticket;
  }

  async listAll(): Promise<Ticket[]> {
    return this.tickets;
  }

  async findById(id: string): Promise<Ticket> {
    const ticket = this.tickets.find((ticket) => ticket.id === id);

    return ticket;
  }

  async remove(ticket: Ticket): Promise<void> {
    const ticketIndex = this.tickets.findIndex(
      (ticketToRemove) => ticketToRemove.id === ticket.id
    );

    this.tickets.splice(ticketIndex, 1);
  }
}

export { TicketsRepositoryInMemory };
