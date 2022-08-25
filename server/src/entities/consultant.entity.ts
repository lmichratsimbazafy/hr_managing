import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ConsultantStatus } from './consultantStatus.entity';

@Entity({ name: 'consultant' })
export class Consultant extends BaseEntity {
  @Column({ default: '' })
  lastName: string;

  @Column({ default: '' })
  firstName: string;

  @Column({ default: '' })
  emailAddress: string;

  @Column({ default: '' })
  phone: string;

  @OneToMany(
    () => ConsultantStatus,
    (consultantStatus) => consultantStatus.consultant,
  )
  consultantStatus: ConsultantStatus[];
}
