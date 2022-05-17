import { CompaniesRepositoryInMemory } from '../../../companies/repositories/implementations/companies-repository-in-memory';
import { PlacesRepositoryInMemory } from '../../../places/repositories/implementations/places-repository-in-memory';
import { TicketsRepositoryInMemory } from '../../repositories/implementations/tickets-repository-in-memory';
import { ListTicketsUseCase } from './list-tickets-use-case';

let ticketsRepository: TicketsRepositoryInMemory;
let placesRepository: PlacesRepositoryInMemory;
let companiesRepository: CompaniesRepositoryInMemory;
let listTicketsUseCase: ListTicketsUseCase;

describe('List Tickets Use Case', () => {
  beforeEach(() => {
    ticketsRepository = new TicketsRepositoryInMemory();
    placesRepository = new PlacesRepositoryInMemory();
    companiesRepository = new CompaniesRepositoryInMemory();
    listTicketsUseCase = new ListTicketsUseCase(ticketsRepository);
  });

  it('should be able to list all tickets', async () => {
    const company = await companiesRepository.create({
      name: 'my-company',
      description: 'my-description',
      CNPJ: 'my-CNPJ',
    });

    const place = await placesRepository.create({
      name: 'my-place',
      public_place: 'public-place',
      complement: 'my-complement',
      district: 'my-district',
      city: 'my-city',
      state: 'my-state',
      cep: 'my-cep',
      number: '1',
      company,
    });

    const ticket = await ticketsRepository.create({
      title: 'ticket-title',
      place,
      created_by: 'user-uuid',
      updated_by: 'user-uuid',
      data_updated: 'Place changed',
    });

    const tickets = await listTicketsUseCase.execute();

    expect(tickets).toEqual([ticket]);
  });
});
