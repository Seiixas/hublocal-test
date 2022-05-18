import { inject, injectable } from 'tsyringe';

import { ConflictException } from '../../../../shared/errors/ConflictException';
import { Company } from '../../infra/entities/company';
import { ICompaniesRepository } from '../../repositories/companies-repository';

interface IRequest {
  CNPJ: string;
  name: string;
  description: string;
}

@injectable()
class CreateCompanyUseCase {
  constructor(
    @inject('CompaniesRepository')
    private readonly companiesRepository: ICompaniesRepository
  ) {}

  async execute({ CNPJ, name, description }: IRequest): Promise<Company> {
    const companyAlreadyExists = await this.companiesRepository.findByCNPJ(
      CNPJ
    );

    if (companyAlreadyExists) {
      throw new ConflictException('This company already exists');
    }

    const company = await this.companiesRepository.create({
      CNPJ,
      name,
      description,
    });

    return company;
  }
}

export { CreateCompanyUseCase };
