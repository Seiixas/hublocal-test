import { v4 as uuidv4 } from 'uuid';

class User {
  id?: string;

  name: string;

  email: string;

  password: string;

  created_at: string;

  updated_at: string;

  constructor(id?: string) {
    this.id = id ?? uuidv4();
  }
}

export { User };
