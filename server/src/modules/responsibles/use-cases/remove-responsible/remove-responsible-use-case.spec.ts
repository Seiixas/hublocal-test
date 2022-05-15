import { ResponsiblesRepositoryInMemory } from '../../repositories/implementations/responsibles-repository-in-memory';
import { RemoveResponsibleUseCase } from './remove-responsible-use-case';

let responsiblesRepository: ResponsiblesRepositoryInMemory;
let removeResponsibleUseCase: RemoveResponsibleUseCase;

describe('Remove Responsible Use Case', () => {
  beforeEach(() => {
    responsiblesRepository = new ResponsiblesRepositoryInMemory();
    removeResponsibleUseCase = new RemoveResponsibleUseCase(
      responsiblesRepository
    );
  });

  it('should be able to remove a responsible', async () => {
    const responsible = await responsiblesRepository.create({
      name: 'my-responsible-name',
      phone_number: 'my-phone-number',
      public_place: 'my-public-place',
      complement: 'my-complement',
      district: 'my-district',
      city: 'my-city',
      state: 'my-state',
      cep: 'my-cep',
      number: 'my-number',
      company_id: 'company-id',
    });

    await removeResponsibleUseCase.execute(responsible.id);

    const responsibles = await responsiblesRepository.listAll();

    expect(responsibles).toHaveLength(0);
    expect(responsibles).toEqual([]);
  });

  it('should not be able to remove a responsible that does not exists', () => {
    expect(async () => {
      await removeResponsibleUseCase.execute('fake-responsible-id');
    }).rejects.toBeInstanceOf(Error);
  });
});
