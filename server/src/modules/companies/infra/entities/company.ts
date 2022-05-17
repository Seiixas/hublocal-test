import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { Place } from '../../../places/infra/entities/place';

@Entity('companies')
class Company {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  CNPJ: string;

  @OneToMany(() => Place, (place) => place.company)
  places: Place[];

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { Company };
