import { inject, injectable } from 'tsyringe';

import { NotFoundException } from '../../../../shared/errors/NotFoundException';
import { Responsible } from '../../infra/entities/responsible';
import { IResponsiblesRepository } from '../../repositories/reponsibles-repository';

@injectable()
class ShowResponsibleUseCase {
  constructor(
    @inject('ResponsiblesRepository')
    private readonly responsiblesRepository: IResponsiblesRepository
  ) {}

  async execute(id: string): Promise<Responsible> {
    const responsible = await this.responsiblesRepository.findById(id);

    if (!responsible) {
      throw new NotFoundException('This responsible does not exists');
    }

    return responsible;
  }
}

export { ShowResponsibleUseCase };
