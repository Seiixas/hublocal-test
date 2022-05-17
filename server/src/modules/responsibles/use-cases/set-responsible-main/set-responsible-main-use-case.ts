import { inject, injectable } from 'tsyringe';

import { ICompaniesRepository } from '../../../companies/repositories/companies-repository';
import { IResponsiblesRepository } from '../../repositories/reponsibles-repository';

interface IRequest {
  company_id: string;
  responsible_id: string;
}

@injectable()
class SetResponsibleMainUseCase {
  constructor(
    @inject('ResponsiblesRepository')
    private readonly responsiblesRepository: IResponsiblesRepository,
    @inject('CompaniesRepository')
    private readonly companiesRepository: ICompaniesRepository
  ) {}

  async execute({ company_id, responsible_id }: IRequest): Promise<void> {
    const responsible = await this.responsiblesRepository.findById(
      responsible_id
    );

    if (!responsible) {
      throw new Error('This responsible does not exists');
    }

    const company = await this.companiesRepository.findById(company_id);

    if (!company) {
      throw new Error('This company does not exists');
    }

    const responsiblesFromCompany =
      await this.responsiblesRepository.findByCompanyId(company_id);

    const companyAlreadyHaveMainResponsible = responsiblesFromCompany.find(
      (responsible) => responsible.is_main === true
    );

    if (companyAlreadyHaveMainResponsible) {
      throw new Error('This company already have a main responsible');
    }

    responsible.is_main = true;

    await this.responsiblesRepository.create(responsible);
  }
}

export { SetResponsibleMainUseCase };
