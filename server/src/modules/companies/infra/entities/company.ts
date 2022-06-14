import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { Place } from '../../../places/infra/entities/place';
import { Responsible } from '../../../responsibles/infra/entities/responsible';

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

  @OneToMany(() => Place, (place) => place.company, {
    onDelete: 'CASCADE'
  })
  places: Place[];

  @OneToMany(() => Responsible, (responsible) => responsible.company, {
    onDelete: 'CASCADE'
  })
  responsibles: Responsible[];

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { Company };
