import { inject, injectable } from 'tsyringe';

import { NotFoundException } from '../../../../shared/errors/NotFoundException';
import { ICompaniesRepository } from '../../../companies/repositories/companies-repository';
import { Place } from '../../infra/entities/place';
import { IPlacesRepository } from '../../repositories/places-repository';

interface IRequest {
  name: string;
  public_place: string;
  complement: string;
  district: string;
  city: string;
  state: string;
  cep: string;
  number: string;
  company_id: string;
}

@injectable()
class CreatePlaceUseCase {
  constructor(
    @inject('PlacesRepository')
    private readonly placesRepository: IPlacesRepository,
    @inject('CompaniesRepository')
    private readonly companiesRepository: ICompaniesRepository
  ) {}

  async execute(data: IRequest): Promise<Place> {
    const {
      name,
      public_place,
      complement,
      district,
      city,
      state,
      cep,
      number,
      company_id,
    } = data;

    const company = await this.companiesRepository.findById(company_id);

    if (!company) {
      throw new NotFoundException('This company does not exists');
    }

    const place = await this.placesRepository.create({
      name,
      public_place,
      complement,
      district,
      city,
      state,
      cep,
      number,
      company,
    });

    return place;
  }
}

export { CreatePlaceUseCase };
