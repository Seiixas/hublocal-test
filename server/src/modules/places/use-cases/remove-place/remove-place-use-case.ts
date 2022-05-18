import { inject, injectable } from 'tsyringe';

import { NotFoundException } from '../../../../shared/errors/NotFoundException';
import { IPlacesRepository } from '../../repositories/places-repository';

@injectable()
class RemovePlaceUseCase {
  constructor(
    @inject('PlacesRepository')
    private placesRepository: IPlacesRepository
  ) {}

  async execute(id: string): Promise<void> {
    const place = await this.placesRepository.findById(id);

    if (!place) {
      throw new NotFoundException('This place does not exists');
    }

    await this.placesRepository.remove(place);
  }
}

export { RemovePlaceUseCase };
