import { inject, injectable } from 'tsyringe';

import { NotFoundException } from '../../../../shared/errors/NotFoundException';
import { IResponsiblesRepository } from '../../repositories/reponsibles-repository';

@injectable()
class RemoveResponsibleUseCase {
  constructor(
    @inject('ResponsiblesRepository')
    private readonly responsiblesRepository: IResponsiblesRepository
  ) {}

  async execute(id: string): Promise<void> {
    const responsible = await this.responsiblesRepository.findById(id);

    if (!responsible) {
      throw new NotFoundException('This responsible does not exists');
    }

    await this.responsiblesRepository.remove(responsible);
  }
}

export { RemoveResponsibleUseCase };
