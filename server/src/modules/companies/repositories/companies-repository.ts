import { ICreateCompany } from '../dtos/create-company';
import { Company } from '../entities/company';

interface ICompaniesRepository {
  listAll(): Promise<Company[]>;

  create(data: ICreateCompany): Promise<Company>;

  remove(company: Company): Promise<void>;

  findByCNPJ(CNPJ: string): Promise<Company>;

  findById(id: string): Promise<Company>;
}

export { ICompaniesRepository };
