import { CompaniesRepositoryInMemory } from '../../../companies/repositories/implementations/companies-repository-in-memory';
import { PlacesRepositoryInMemory } from '../../repositories/implementations/places-repository-in-memory';
import { ListPlacesUseCase } from './list-places-use-case';

let listPlacesUseCase: ListPlacesUseCase;
let placesRepository: PlacesRepositoryInMemory;
let companiesRepository: CompaniesRepositoryInMemory;

describe('List Places Use Case', () => {
  beforeEach(() => {
    placesRepository = new PlacesRepositoryInMemory();
    companiesRepository = new CompaniesRepositoryInMemory();
    listPlacesUseCase = new ListPlacesUseCase(placesRepository);
  });

  it('should be able to list all places', async () => {
    const company = await companiesRepository.create({
      name: 'my-company',
      description: 'my-description',
      CNPJ: 'my-cnpj',
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

    const places = await listPlacesUseCase.execute();

    expect(places).toEqual([place]);
  });
});
