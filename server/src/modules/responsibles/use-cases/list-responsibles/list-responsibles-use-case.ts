import { Responsible } from '../../entities/responsible';
import { IResponsiblesRepository } from '../../repositories/reponsibles-repository';

class ListResponsiblesUseCase {
  constructor(
    private readonly responsiblesRepository: IResponsiblesRepository
  ) {}

  async execute(): Promise<Responsible[]> {
    const responsibles = await this.responsiblesRepository.listAll();

    return responsibles;
  }
}

export { ListResponsiblesUseCase };
