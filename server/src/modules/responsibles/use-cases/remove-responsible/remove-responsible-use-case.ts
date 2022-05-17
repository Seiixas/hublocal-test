import { inject, injectable } from 'tsyringe';

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
      throw new Error('This responsible does not exists');
    }

    await this.responsiblesRepository.remove(responsible);
  }
}

export { RemoveResponsibleUseCase };
