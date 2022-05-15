import { v4 as uuidV4 } from 'uuid';

class Place {
  id: string;

  name: string;

  public_place: string;

  complement: string;

  district: string;

  city: string;

  state: string;

  cep: string;

  number: string;

  company_id: string;

  constructor(id?: string) {
    this.id = id ?? uuidV4();
  }
}

export { Place };
