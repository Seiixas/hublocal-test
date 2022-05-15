import { PlacesRepositoryInMemory } from '../../repositories/implementations/places-repository-in-memory';
import { ListPlacesUseCase } from './list-places-use-case';

let listPlacesUseCase: ListPlacesUseCase;
let placesRepository: PlacesRepositoryInMemory;

describe('List Places Use Case', () => {
  beforeEach(() => {
    placesRepository = new PlacesRepositoryInMemory();
    listPlacesUseCase = new ListPlacesUseCase(placesRepository);
  });

  it('should be able to list all places', async () => {
    const place = await placesRepository.create({
      name: 'my-place',
      public_place: 'my-public-place',
      complement: 'my-complement',
      district: 'my-district',
      city: 'my-city',
      state: 'my-state',
      cep: 'my-cep',
      number: 'my-number',
      company_id: 'company-fake-id',
    });

    const places = await listPlacesUseCase.execute();

    expect(places).toEqual([place]);
  });
});
