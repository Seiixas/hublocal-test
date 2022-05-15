import { IPlacesRepository } from '../../../places/repositories/places-repository';
import { Ticket } from '../../entities/ticket';
import { ITicketsRepository } from '../../repositories/tickets-repository';

interface IRequest {
  title: string;
  place_id: string;
  created_by: string;
  updated_by: string;
  data_updated: string;
}

class CreateTicketUseCase {
  constructor(
    private readonly ticketsRepository: ITicketsRepository,
    private readonly placesRepository: IPlacesRepository
  ) {}

  async execute({
    title,
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
      title,
      place_id,
      created_by,
      updated_by,
      data_updated,
    });

    return ticket;
  }
}

export { CreateTicketUseCase };
