import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { Place } from '../../../places/infra/entities/place';

@Entity('tickets')
class Ticket {
  @PrimaryColumn()
  id?: string;

  @Column()
  title: string;

  @Column()
  status: string;

  @ManyToOne(() => Place, (place) => place.tickets)
  place: Place;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  created_by: string;

  @Column()
  updated_by: string;

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

  @Column()
  placeId: string;

  constructor(id?: string) {
    this.id = id ?? uuidv4();
    this.status = 'PENDENTE';
  }
}

export { Ticket };
