import { CompaniesRepositoryInMemory } from '../../../companies/repositories/implementations/companies-repository-in-memory';
import { PlacesRepositoryInMemory } from '../../../places/repositories/implementations/places-repository-in-memory';
import { IPlacesRepository } from '../../../places/repositories/places-repository';
import { TicketsRepositoryInMemory } from '../../repositories/implementations/tickets-repository-in-memory';
import { CreateTicketUseCase } from './create-ticket-use-case';

let createTicketUseCase: CreateTicketUseCase;
let ticketsRepository: TicketsRepositoryInMemory;
let placesRepository: IPlacesRepository;
let companiesRepository: CompaniesRepositoryInMemory;

describe('Create Ticket Use Case', () => {
  beforeEach(() => {
    ticketsRepository = new TicketsRepositoryInMemory();
    placesRepository = new PlacesRepositoryInMemory();
    companiesRepository = new CompaniesRepositoryInMemory();

    createTicketUseCase = new CreateTicketUseCase(
      ticketsRepository,
      placesRepository
    );
  });

  it('should be able to create a new ticket', async () => {
    const company = await companiesRepository.create({
      name: 'my-company',
      description: 'my-description',
      CNPJ: 'my-CNPJ',
    });

    const place = await placesRepository.create({
      name: 'my-place',
      public_place: 'my-public-place',
      complement: 'my-complement',
      district: 'my-district',
      city: 'my-city',
      state: 'my-state',
      cep: 'my-cep',
      number: 'my-number',
      company,
    });

    const ticket = await createTicketUseCase.execute({
      place_id: place.id,
      created_by: 'user-uuid',
      updated_by: 'user-uuid',
      data_updated: 'Place changed',
    });

    expect(ticket).toHaveProperty('id');
    expect(ticket.status).toEqual('PENDENTE');
  });

  it('should not be able to create a new ticket to a place that does not exists', () => {
    expect(async () => {
      await createTicketUseCase.execute({
        place_id: 'fake-place-id',
        created_by: 'user-uuid',
        updated_by: 'user-uuid',
        data_updated: 'Place changed',
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
