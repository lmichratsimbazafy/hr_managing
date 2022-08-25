import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRoles {
  ADMIN = 'ADMIN',
  COLLABORATOR = 'COLLABORATOR',
}

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 'N/A' })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRoles,
    default: UserRoles.COLLABORATOR,
  })
  role: UserRoles;
}
