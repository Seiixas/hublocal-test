import { Company } from '../../entities/company';
import { ICompaniesRepository } from '../../repositories/companies-repository';

interface IRequest {
  id: string;
  CNPJ?: string;
  description?: string;
  name?: string;
}

class UpdateCompanyUseCase {
  constructor(private readonly companiesRepository: ICompaniesRepository) {}

  async execute({ id, CNPJ, description, name }: IRequest): Promise<Company> {
    const company = await this.companiesRepository.findById(id);

    if (!company) {
      throw new Error('This company does not exists');
    }

    const companyWithCNPJAlreadyExists =
      await this.companiesRepository.findByCNPJ(CNPJ);

    if (companyWithCNPJAlreadyExists) {
      throw new Error('This CNPJ is already in use');
    }

    company.CNPJ = CNPJ ?? company.CNPJ;
    company.description = description ?? company.description;
    company.name = name ?? company.name;

    const companyUpdated = await this.companiesRepository.create(company);

    return companyUpdated;
  }
}

export { UpdateCompanyUseCase };
