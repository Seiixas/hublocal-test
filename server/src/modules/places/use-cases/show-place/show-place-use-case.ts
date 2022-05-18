import { inject, injectable } from 'tsyringe';

import { NotFoundException } from '../../../../shared/errors/NotFoundException';
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
      throw new NotFoundException('This place does not exists');
    }

    return place;
  }
}

export { ShowPlaceUseCase };
