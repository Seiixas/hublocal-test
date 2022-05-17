import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { Company } from '../../../companies/infra/entities/company';

@Entity('responsibles')
class Responsible {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  phone_number: string;

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

  @Column()
  is_main: boolean;

  @ManyToOne(() => Company, (company) => company.responsibles)
  company: Company;

  constructor(id?: string, is_main?: boolean) {
    this.id = id ?? uuidV4();
    this.is_main = is_main ?? false;
  }
}

export { Responsible };
