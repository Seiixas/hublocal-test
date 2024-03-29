import { inject, injectable } from 'tsyringe';

import { NotFoundException } from '../../../../shared/errors/NotFoundException';
import { IPlacesRepository } from '../../../places/repositories/places-repository';
import { Ticket } from '../../infra/entities/ticket';
import { ITicketsRepository } from '../../repositories/tickets-repository';

interface IRequest {
  place_id: string;
  created_by: string;
  updated_by: string;
  data_updated: string;
  name: string;
  public_place: string;
  complement: string;
  district: string;
  city: string;
  state: string;
  cep: string;
  number: string;
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
    name,
    public_place,
    complement,
    district,
    city,
    state,
    cep,
    number
  }: IRequest): Promise<Ticket> {
    const place = await this.placesRepository.findById(place_id);

    if (!place) {
      throw new NotFoundException('This place does not exists');
    }

    const ticket = await this.ticketsRepository.create({
      title: '',
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
      number
    });

    const { id } = ticket;

    ticket.title = `${id}-${place.name}`;

    const ticketWithTitleUpdated = await this.ticketsRepository.create(ticket);

    return ticketWithTitleUpdated;
  }
}

export { CreateTicketUseCase };
