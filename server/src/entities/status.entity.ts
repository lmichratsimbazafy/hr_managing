import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ConsultantStatus } from './consultantStatus.entity';

@Entity({ name: 'status' })
export class Status extends BaseEntity {
  @Column()
  label: string;

  @Column()
  displayText: string;

  @OneToMany(
    () => ConsultantStatus,
    (consultantStatus) => consultantStatus.status,
  )
  consultantStatus: ConsultantStatus;
}
