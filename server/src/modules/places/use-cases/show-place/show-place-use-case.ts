import { inject, injectable } from 'tsyringe';

import { Place } from '../../infra/entities/place';
import { IPlacesRepository } from '../../repositories/places-repository';

@injectable()
class ShowPlaceUseCase {
  constructor(
    @inject('PlacesRepository')
    private readonly placesRepository: IPlacesRepository
  ) {}

  async execute(id: string): Promise<Place> {
    const place = await this.placesRepository.findById(id);

    if (!place) {
      throw new Error('This place does not exists');
    }

    return place;
  }
}

export { ShowPlaceUseCase };
