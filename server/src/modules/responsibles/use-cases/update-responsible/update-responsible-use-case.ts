import { inject, injectable } from 'tsyringe';

import { NotFoundException } from '../../../../shared/errors/NotFoundException';
import { ICompaniesRepository } from '../../../companies/repositories/companies-repository';
import { Responsible } from '../../infra/entities/responsible';
import { IResponsiblesRepository } from '../../repositories/reponsibles-repository';

interface IRequest {
  id: string;
  name?: string;
  phone_number?: string;
  public_place?: string;
  complement?: string;
  district?: string;
  city?: string;
  state?: string;
  cep?: string;
  number?: string;
  company_id?: string;
}

@injectable()
class UpdateResponsibleUseCase {
  constructor(
    @inject('ResponsiblesRepository')
    private readonly responsiblesRepository: IResponsiblesRepository,
    @inject('CompaniesRepository')
    private readonly companiesRepository: ICompaniesRepository
  ) {}

  async execute(data: IRequest): Promise<Responsible> {
    const {
      id,
      name,
      phone_number,
      public_place,
      complement,
      district,
      city,
      state,
      cep,
      number,
      company_id,
    } = data;

    const responsible = await this.responsiblesRepository.findById(id);

    if (!responsible) {
      throw new NotFoundException('This responsible does not exists');
    }

    if (company_id) {
      const company = await this.companiesRepository.findById(company_id);

      if (!company) {
        throw new NotFoundException('This company does not exists');
      }

      responsible.company = company;
    }

    responsible.name = name ?? responsible.name;
    responsible.phone_number = phone_number ?? responsible.phone_number;
    responsible.public_place = public_place ?? responsible.public_place;
    responsible.complement = complement ?? responsible.complement;
    responsible.district = district ?? responsible.district;
    responsible.city = city ?? responsible.city;
    responsible.state = state ?? responsible.state;
    responsible.cep = cep ?? responsible.cep;
    responsible.number = number ?? responsible.number;

    await this.responsiblesRepository.create(responsible);

    return responsible;
  }
}

export { UpdateResponsibleUseCase };
