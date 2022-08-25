import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Consultant } from './consultant.entity';
import { Status } from './status.entity';

@Entity({ name: 'consultantStatus' })
export class ConsultantStatus {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToOne(() => Consultant, (consultant) => consultant.consultantStatus)
  consultant: Consultant;

  @ManyToOne(() => Status, (status) => status.consultantStatus)
  status: Status;

  // Custom Colums
  @Column({ type: 'date' })
  startDate: string;

  @Column({ type: 'date' })
  endDate: string;
}
