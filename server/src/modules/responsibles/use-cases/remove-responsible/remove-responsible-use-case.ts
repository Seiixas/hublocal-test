import { IResponsiblesRepository } from '../../repositories/reponsibles-repository';

class RemoveResponsibleUseCase {
  constructor(
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
