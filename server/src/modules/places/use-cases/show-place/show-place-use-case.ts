import { Place } from '../../entities/place';
import { IPlacesRepository } from '../../repositories/places-repository';

class ShowPlaceUseCase {
  constructor(private readonly placesRepository: IPlacesRepository) {}

  async execute(id: string): Promise<Place> {
    const place = await this.placesRepository.findById(id);

    if (!place) {
      throw new Error('This place does not exists');
    }

    return place;
  }
}

export { ShowPlaceUseCase };
