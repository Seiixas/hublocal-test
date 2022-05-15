import { CompaniesRepositoryInMemory } from '../../../companies/repositories/implementations/companies-repository-in-memory';
import { ResponsiblesRepositoryInMemory } from '../../repositories/implementations/responsibles-repository-in-memory';
import { SetResponsibleMainUseCase } from './set-responsible-main-use-case';

let setResponsibleMainUseCase: SetResponsibleMainUseCase;
let responsiblesRepository: ResponsiblesRepositoryInMemory;
let companiesRepository: CompaniesRepositoryInMemory;

describe('Set Responsible Main Use Case', () => {
  beforeEach(() => {
    responsiblesRepository = new ResponsiblesRepositoryInMemory();
    companiesRepository = new CompaniesRepositoryInMemory();
    setResponsibleMainUseCase = new SetResponsibleMainUseCase(
      responsiblesRepository,
      companiesRepository
    );
  });

  it('should be able to set a responsible as main', async () => {
    const company = await companiesRepository.create({
      name: 'my-company',
      description: 'my-description',
      CNPJ: 'my-CNPJ',
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
      company_id: company.id,
    });

    await setResponsibleMainUseCase.execute({
      company_id: company.id,
      responsible_id: responsible.id,
    });

    const [responsibles] = await responsiblesRepository.listAll();

    expect(responsibles.is_main).toEqual(true);
  });

  it('should not be able to set a responsible as main that does not exists', () => {
    expect(async () => {
      const company = await companiesRepository.create({
        name: 'my-company',
        description: 'my-description',
        CNPJ: 'my-CNPJ',
      });

      await setResponsibleMainUseCase.execute({
        company_id: company.id,
        responsible_id: 'fake-responsible-id',
      });
    }).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to set a responsible as main to a company that does not exists', () => {
    expect(async () => {
      const company = await companiesRepository.create({
        name: 'my-company',
        description: 'my-description',
        CNPJ: 'my-CNPJ',
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
        company_id: company.id,
      });

      await setResponsibleMainUseCase.execute({
        company_id: 'fake-company',
        responsible_id: responsible.id,
      });
    }).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to set a responsible as main if company already have one', () => {
    expect(async () => {
      const company = await companiesRepository.create({
        name: 'my-company',
        description: 'my-description',
        CNPJ: 'my-CNPJ',
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
        company_id: company.id,
      });

      const secondResponsible = await responsiblesRepository.create({
        name: 'my-responsible-name',
        phone_number: 'my-phone-number',
        public_place: 'my-public-place',
        complement: 'my-complement',
        district: 'my-district',
        city: 'my-city',
        state: 'my-state',
        cep: 'my-cep',
        number: 'my-number',
        company_id: company.id,
      });

      await setResponsibleMainUseCase.execute({
        responsible_id: secondResponsible.id,
        company_id: company.id,
      });

      await setResponsibleMainUseCase.execute({
        responsible_id: responsible.id,
        company_id: company.id,
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
