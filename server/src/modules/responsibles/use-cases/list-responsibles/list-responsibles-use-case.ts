import { inject, injectable } from 'tsyringe';

import { Responsible } from '../../infra/entities/responsible';
import { IResponsiblesRepository } from '../../repositories/reponsibles-repository';

@injectable()
class ListResponsiblesUseCase {
  constructor(
    @inject('ResponsiblesRepository')
    private readonly responsiblesRepository: IResponsiblesRepository
  ) {}

  async execute(): Promise<Responsible[]> {
    const responsibles = await this.responsiblesRepository.listAll();

    return responsibles;
  }
}

export { ListResponsiblesUseCase };
