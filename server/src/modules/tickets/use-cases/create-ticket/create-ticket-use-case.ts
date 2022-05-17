import { inject, injectable } from 'tsyringe';

import { IPlacesRepository } from '../../../places/repositories/places-repository';
import { Ticket } from '../../infra/entities/ticket';
import { ITicketsRepository } from '../../repositories/tickets-repository';

interface IRequest {
  place_id: string;
  created_by: string;
  updated_by: string;
  data_updated: string;
}

@injectable()
class CreateTicketUseCase {
  constructor(
    @inject('TicketsRepository')
    private readonly ticketsRepository: ITicketsRepository,
    @inject('PlacesRepository')
    private readonly placesRepository: IPlacesRepository
  ) {}

  async execute({
    place_id,
    created_by,
    updated_by,
    data_updated,
  }: IRequest): Promise<Ticket> {
    const place = await this.placesRepository.findById(place_id);

    if (!place) {
      throw new Error('This place does not exists');
    }

    const ticket = await this.ticketsRepository.create({
      title: '',
      place,
      created_by,
      updated_by,
      data_updated,
    });

    const { id } = ticket;

    ticket.title = `${id}-${place.name}`;

    const ticketWithTitleUpdated = await this.ticketsRepository.create(ticket);

    return ticketWithTitleUpdated;
  }
}

export { CreateTicketUseCase };
