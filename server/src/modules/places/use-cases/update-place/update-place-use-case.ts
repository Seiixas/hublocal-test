import { inject, injectable } from 'tsyringe';

import { IPlacesRepository } from '../../repositories/places-repository';

interface IRequest {
  id: string;
  name?: string;
  public_place?: string;
  complement?: string;
  district?: string;
  city?: string;
  state?: string;
  cep?: string;
  number?: string;
}

@injectable()
class UpdatePlaceUseCase {
  constructor(
    @inject('PlacesRepository')
    private readonly placesRepository: IPlacesRepository
  ) {}

  async execute(data: IRequest) {
    const {
      id,
      name,
      public_place,
      complement,
      district,
      city,
      state,
      cep,
      number,
    } = data;

    const place = await this.placesRepository.findById(id);

    if (!place) {
      throw new Error('This place does not exists');
    }

    place.name = name ?? place.name;
    place.public_place = public_place ?? place.public_place;
    place.complement = complement ?? place.complement;
    place.district = district ?? place.district;
    place.city = city ?? place.city;
    place.state = state ?? place.state;
    place.cep = cep ?? place.cep;
    place.number = number ?? place.number;

    const placeUpdated = await this.placesRepository.create(place);

    return placeUpdated;
  }
}

export { UpdatePlaceUseCase };
