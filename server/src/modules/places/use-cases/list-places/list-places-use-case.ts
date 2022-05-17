import { inject, injectable } from 'tsyringe';

import { Place } from '../../infra/entities/place';
import { IPlacesRepository } from '../../repositories/places-repository';

@injectable()
class ListPlacesUseCase {
  constructor(
    @inject('PlacesRepository')
    private readonly placesRepository: IPlacesRepository
  ) {}

  async execute(): Promise<Place[]> {
    const companies = await this.placesRepository.listAll();

    return companies;
  }
}

export { ListPlacesUseCase };
