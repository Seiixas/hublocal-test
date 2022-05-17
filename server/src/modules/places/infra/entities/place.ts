import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { Company } from '../../../companies/infra/entities/company';

@Entity('places')
class Place {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  public_place: string;

  @Column()
  complement: string;

  @Column()
  district: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  cep: string;

  @Column()
  number: string;

  @ManyToOne(() => Company, (company) => company.places)
  company: Company;

  constructor(id?: string) {
    this.id = id ?? uuidV4();
  }
}

export { Place };
