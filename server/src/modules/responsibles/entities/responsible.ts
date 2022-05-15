import { v4 as uuidV4 } from 'uuid';

class Responsible {
  id?: string;

  name: string;

  phone_number: string;

  public_place: string;

  complement: string;

  district: string;

  city: string;

  state: string;

  cep: string;

  number: string;

  is_main: boolean;

  company_id: string;

  constructor(id?: string, is_main?: boolean) {
    this.id = id ?? uuidV4();
    this.is_main = is_main ?? false;
  }
}

export { Responsible };
