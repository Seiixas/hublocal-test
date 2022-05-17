import { CompaniesRepositoryInMemory } from '../../../companies/repositories/implementations/companies-repository-in-memory';
import { ResponsiblesRepositoryInMemory } from '../../repositories/implementations/responsibles-repository-in-memory';
import { UpdateResponsibleUseCase } from './update-responsible-use-case';

let updateResponsibleUseCase: UpdateResponsibleUseCase;
let responsiblesRepository: ResponsiblesRepositoryInMemory;
let companiesRepository: CompaniesRepositoryInMemory;

describe('Update Responsible Use Case', () => {
  beforeEach(() => {
    responsiblesRepository = new ResponsiblesRepositoryInMemory();
    companiesRepository = new CompaniesRepositoryInMemory();
    updateResponsibleUseCase = new UpdateResponsibleUseCase(
      responsiblesRepository,
      companiesRepository
    );
  });

  it('should be able to update a responsible', async () => {
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

    const responsibleUpdated = await updateResponsibleUseCase.execute({
      id: responsible.id,
      phone_number: 'my-new-phone-number',
    });

    expect(responsibleUpdated.phone_number).toEqual('my-new-phone-number');
  });

  it('should not be able to update a responsible that does not exists', () => {
    expect(async () => {
      await updateResponsibleUseCase.execute({
        id: 'fake-responsible-id',
        phone_number: 'my-new-phone-number',
      });
    }).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to update a responsible to a company that does not exists', () => {
    expect(async () => {
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

      await updateResponsibleUseCase.execute({
        id: responsible.id,
        phone_number: 'my-new-phone-number',
        company_id: 'fake-company-id',
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
