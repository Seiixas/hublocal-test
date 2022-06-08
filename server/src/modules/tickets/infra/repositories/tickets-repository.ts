import { Repository } from 'typeorm';

import { dataSource } from '../../../../shared/infra/typeorm/datasource';
import { ICreateTicket } from '../../dtos/create-ticket';
import { ITicketsRepository } from '../../repositories/tickets-repository';
import { Ticket } from '../entities/ticket';

class TicketsRepository implements ITicketsRepository {
  private repository: Repository<Ticket>;

  constructor() {
    this.repository = dataSource.getRepository(Ticket);
  }

  async create({
    id,
    title,
    status,
    place,
    created_by,
    updated_by,
    name,
    public_place,
    complement,
    district,
    city,
    state,
    cep,
    number,
  }: ICreateTicket): Promise<Ticket> {
    const ticket = this.repository.create({
      id,
      title,
      status,
      place,
      created_by,
      updated_by,
      name,
      public_place,
      complement,
      district,
      city,
      state,
      cep,
      number,
    });

    await this.repository.save(ticket);

    return ticket;
  }

  async listAll(): Promise<Ticket[]> {
    const tickets = await this.repository.find();

    return tickets;
  }

  async findById(id: string): Promise<Ticket> {
    const ticket = await this.repository.findOneBy({ id });

    return ticket;
  }

  async remove(ticket: Ticket): Promise<void> {
    await this.repository.remove(ticket);
  }
}

export { TicketsRepository };
