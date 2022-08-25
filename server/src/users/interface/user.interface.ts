import { UserRoles } from '../../entities/user.entity';

export interface UserVM {
  id: number;
  email: string;
  role: UserRoles;
}
