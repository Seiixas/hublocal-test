import { CompaniesRepositoryInMemory } from '../../../companies/repositories/implementations/companies-repository-in-memory';
import { ResponsiblesRepositoryInMemory } from '../../repositories/implementations/responsibles-repository-in-memory';
import { RemoveResponsibleUseCase } from './remove-responsible-use-case';

let responsiblesRepository: ResponsiblesRepositoryInMemory;
let companiesRepository: CompaniesRepositoryInMemory;
let removeResponsibleUseCase: RemoveResponsibleUseCase;

describe('Remove Responsible Use Case', () => {
  beforeEach(() => {
    responsiblesRepository = new ResponsiblesRepositoryInMemory();
    companiesRepository = new CompaniesRepositoryInMemory();
    removeResponsibleUseCase = new RemoveResponsibleUseCase(
      responsiblesRepository
    );
  });

  it('should be able to remove a responsible', async () => {
    const company = await companiesRepository.create({
      name: 'my-name',
      description: 'my-description',
      CNPJ: 'my-cnpj',
    });

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
      company,
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
