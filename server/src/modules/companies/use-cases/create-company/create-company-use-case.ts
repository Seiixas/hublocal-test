import { Company } from '../../entities/company';
import { ICompaniesRepository } from '../../repositories/companies-repository';

interface IRequest {
  CNPJ: string;
  name: string;
  description: string;
}

class CreateCompanyUseCase {
  constructor(private readonly companiesRepository: ICompaniesRepository) {}

  async execute({ CNPJ, name, description }: IRequest): Promise<Company> {
    const companyAlreadyExists = await this.companiesRepository.findByCNPJ(
      CNPJ
    );

    if (companyAlreadyExists) {
      throw new Error('This company already exists');
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
