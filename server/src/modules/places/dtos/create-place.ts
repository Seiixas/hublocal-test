import { Company } from '../../companies/infra/entities/company';

interface ICreatePlace {
  id?: string;
  name: string;
  public_place: string;
  complement: string;
  district: string;
  city: string;
  state: string;
  cep: string;
  number: string;
  company: Company;
}

export { ICreatePlace };
