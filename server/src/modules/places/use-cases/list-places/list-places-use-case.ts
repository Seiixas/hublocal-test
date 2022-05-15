import { Place } from '../../entities/place';
import { IPlacesRepository } from '../../repositories/places-repository';

class ListPlacesUseCase {
  constructor(private readonly placesRepository: IPlacesRepository) {}

  async execute(): Promise<Place[]> {
    const companies = await this.placesRepository.listAll();

    return companies;
  }
}

export { ListPlacesUseCase };
