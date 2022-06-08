import { inject, injectable } from 'tsyringe';

import { NotFoundException } from '../../../../shared/errors/NotFoundException';
import { ICompaniesRepository } from '../../../companies/repositories/companies-repository';
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
  company_id: string;
}

@injectable()
class UpdatePlaceUseCase {
  constructor(
    @inject('PlacesRepository')
    private readonly placesRepository: IPlacesRepository,
    @inject('CompaniesRepository')
    private readonly companiesRepository: ICompaniesRepository
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
      company_id
    } = data;

    const place = await this.placesRepository.findById(id);

    if (!place) {
      throw new NotFoundException('This place does not exists');
    }

    const company = await this.companiesRepository.findById(company_id);

    place.name = name ?? place.name;
    place.public_place = public_place ?? place.public_place;
    place.complement = complement ?? place.complement;
    place.district = district ?? place.district;
    place.city = city ?? place.city;
    place.state = state ?? place.state;
    place.cep = cep ?? place.cep;
    place.number = number ?? place.number;
    place.company = company;

    const placeUpdated = await this.placesRepository.create(place);

    return placeUpdated;
  }
}

export { UpdatePlaceUseCase };
