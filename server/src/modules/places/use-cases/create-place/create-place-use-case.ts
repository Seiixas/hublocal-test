import { ICompaniesRepository } from '../../../companies/repositories/companies-repository';
import { Place } from '../../entities/place';
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

class CreatePlaceUseCase {
  constructor(
    private readonly placesRepository: IPlacesRepository,
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

    const companyExists = await this.companiesRepository.findById(company_id);

    if (!companyExists) {
      throw new Error('This company does not exists');
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
      company_id,
    });

    return place;
  }
}

export { CreatePlaceUseCase };
