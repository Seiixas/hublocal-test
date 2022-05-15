import { PlacesRepositoryInMemory } from '../../repositories/implementations/places-repository-in-memory';
import { ShowPlaceUseCase } from './show-place-use-case';

let placesRepository: PlacesRepositoryInMemory;
let showPlaceUseCase: ShowPlaceUseCase;

describe('Show Place Use Case', () => {
  beforeEach(() => {
    placesRepository = new PlacesRepositoryInMemory();
    showPlaceUseCase = new ShowPlaceUseCase(placesRepository);
  });

  it('should be able to show a place', async () => {
    const newPlace = await placesRepository.create({
      name: 'my-place',
      public_place: 'my-public-place',
      complement: 'my-complement',
      district: 'my-district',
      city: 'my-city',
      state: 'my-state',
      cep: 'my-cep',
      number: 'my-number',
      company_id: 'company-id',
    });

    const place = await showPlaceUseCase.execute(newPlace.id);

    expect(place).toEqual(newPlace);
  });

  it('should not be able to show a place that does not exists', () => {
    expect(async () => {
      await showPlaceUseCase.execute('fake-id');
    }).rejects.toBeInstanceOf(Error);
  });
});
