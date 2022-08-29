import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';
import { User, UserRoles } from '../entities/user.entity';
import { UserDTO } from '../users/dto/user.dto';
import { UsersService } from '../users/users.service';

export const seedAdminUser = async (
  connection: DataSource,
): Promise<UserDTO> => {
  const userService = new UsersService(connection.manager.getRepository(User));

  console.log('Seeding admin user ....');
  const user = await userService.findOneByEmail(process.env.ADMIN_EMAIL);
  if (user) return;

  const saltOrRounds = 10;
  const hashedPassword = await bcrypt.hash(
    process.env.ADMIN_PASSWORD,
    saltOrRounds,
  );
  const userDTO = await userService.create(
    UserDTO.from({
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      role: UserRoles.ADMIN,
    }),
  );
  console.log('Admin user seed successful 👌');
  return userDTO;
};
