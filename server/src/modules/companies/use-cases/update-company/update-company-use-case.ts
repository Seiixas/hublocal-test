import { inject, injectable } from 'tsyringe';

import { NotFoundException } from '../../../../shared/errors/NotFoundException';
import { Company } from '../../infra/entities/company';
import { ICompaniesRepository } from '../../repositories/companies-repository';

interface IRequest {
  id: string;
  CNPJ?: string;
  description?: string;
  name?: string;
}

@injectable()
class UpdateCompanyUseCase {
  constructor(
    @inject('CompaniesRepository')
    private readonly companiesRepository: ICompaniesRepository
  ) {}

  async execute({ id, CNPJ, description, name }: IRequest): Promise<Company> {
    const company = await this.companiesRepository.findById(id);

    if (!company) {
      throw new NotFoundException('This company does not exists');
    }

    if (CNPJ) {
      const companyWithCNPJAlreadyExists =
        await this.companiesRepository.findByCNPJ(CNPJ);

      if (companyWithCNPJAlreadyExists) {
        throw new Error('This CNPJ is already in use');
      }
    }

    company.CNPJ = CNPJ ?? company.CNPJ;
    company.description = description ?? company.description;
    company.name = name ?? company.name;

    const companyUpdated = await this.companiesRepository.create(company);

    return companyUpdated;
  }
}

export { UpdateCompanyUseCase };
