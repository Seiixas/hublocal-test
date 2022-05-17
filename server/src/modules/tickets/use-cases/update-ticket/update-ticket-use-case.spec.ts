import { CompaniesRepositoryInMemory } from '../../../companies/repositories/implementations/companies-repository-in-memory';
import { PlacesRepositoryInMemory } from '../../../places/repositories/implementations/places-repository-in-memory';
import { TicketsRepositoryInMemory } from '../../repositories/implementations/tickets-repository-in-memory';
import { UpdateTicketUseCase } from './update-ticket-use-case';

let updateTicketUseCase: UpdateTicketUseCase;
let ticketsRepository: TicketsRepositoryInMemory;
let placesRepository: PlacesRepositoryInMemory;
let companiesRepository: CompaniesRepositoryInMemory;

describe('Update Ticket Use Case', () => {
  beforeEach(() => {
    ticketsRepository = new TicketsRepositoryInMemory();
    updateTicketUseCase = new UpdateTicketUseCase(ticketsRepository);
    placesRepository = new PlacesRepositoryInMemory();
    companiesRepository = new CompaniesRepositoryInMemory();
  });

  it('should be able to update a ticket', async () => {
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

    const newTicket = await ticketsRepository.create({
      title: 'my-title',
      place,
      data_updated: 'data-updated',
      updated_by: 'user-uuid',
      created_by: 'user-uuid',
    });

    const ticket = await updateTicketUseCase.execute({
      id: newTicket.id,
      status: 'PENDENTE',
    });

    expect(ticket.status).toEqual('PENDENTE');
  });

  it('should not be able to update a ticket that does not exists', () => {
    expect(async () => {
      await updateTicketUseCase.execute({
        id: 'fake-ticket-id',
        status: 'PENDENTE',
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
