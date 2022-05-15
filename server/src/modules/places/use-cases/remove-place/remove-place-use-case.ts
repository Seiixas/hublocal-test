import { IPlacesRepository } from '../../repositories/places-repository';

class RemovePlaceUseCase {
  constructor(private placesRepository: IPlacesRepository) {}

  async execute(id: string): Promise<void> {
    const place = await this.placesRepository.findById(id);

    if (!place) {
      throw new Error('This place does not exists');
    }

    await this.placesRepository.remove(place);
  }
}

export { RemovePlaceUseCase };
