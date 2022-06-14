import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { Company } from '../../../companies/infra/entities/company';
import { Ticket } from '../../../tickets/infra/entities/ticket';

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

  @ManyToOne(() => Company, (company) => company.places, {
    onDelete: 'CASCADE'
  })
  company: Company;

  @Column()
  companyId: string;

  @OneToMany(() => Ticket, (ticket) => ticket.place, {
    onDelete: 'CASCADE'
  })
  tickets: Ticket[];

  constructor(id?: string) {
    this.id = id ?? uuidV4();
  }
}

export { Place };
