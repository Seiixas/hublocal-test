import { Responsible } from '../../entities/responsible';
import { IResponsiblesRepository } from '../../repositories/reponsibles-repository';

class ShowResponsibleUseCase {
  constructor(
    private readonly responsiblesRepository: IResponsiblesRepository
  ) {}

  async execute(id: string): Promise<Responsible> {
    const responsible = await this.responsiblesRepository.findById(id);

    if (!responsible) {
      throw new Error('This responsible does not exists');
    }

    return responsible;
  }
}

export { ShowResponsibleUseCase };
