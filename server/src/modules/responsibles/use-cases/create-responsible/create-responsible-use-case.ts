import { inject, injectable } from 'tsyringe';

import { NotFoundException } from '../../../../shared/errors/NotFoundException';
import { ICompaniesRepository } from '../../../companies/repositories/companies-repository';
import { Responsible } from '../../infra/entities/responsible';
import { IResponsiblesRepository } from '../../repositories/reponsibles-repository';

interface IRequest {
  name: string;
  phone_number: string;
  public_place: string;
  complement: string;
  district: string;
  city: string;
  state: string;
  cep: string;
  number: string;
  company_id: string;
  is_main?: boolean;
}

@injectable()
class CreateResponsibleUseCase {
  constructor(
    @inject('ResponsiblesRepository')
    private readonly responsiblesRepository: IResponsiblesRepository,
    @inject('CompaniesRepository')
    private readonly companiesRepository: ICompaniesRepository
  ) {}

  async execute(data: IRequest): Promise<Responsible> {
    const {
      name,
      phone_number,
      public_place,
      complement,
      district,
      city,
      state,
      cep,
      number,
      is_main,
      company_id,
    } = data;

    const companyExists = await this.companiesRepository.findById(company_id);

    if (!companyExists) {
      throw new NotFoundException('This company does not exists');
    }

    const responsible = await this.responsiblesRepository.create({
      name,
      phone_number,
      public_place,
      complement,
      district,
      city,
      state,
      cep,
      number,
      is_main,
      company: companyExists,
    });

    return responsible;
  }
}

export { CreateResponsibleUseCase };
