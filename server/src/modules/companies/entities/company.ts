import { v4 as uuidv4 } from 'uuid';

class Company {
  id?: string;

  name: string;

  description: string;

  CNPJ: string;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { Company };
