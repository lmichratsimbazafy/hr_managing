import * as _ from 'lodash';
import { DataSource, DataSourceOptions } from 'typeorm';
import { configService } from '../config/config.service';
import { User, UserRoles } from '../entities/user.entity';
import { UserDTO } from '../users/dto/user.dto';
import { UsersService } from '../users/users.service';

export const seedAdminUser = async (): Promise<any> => {
  const opt = {
    ...configService.getTypeOrmConfig(),
    debug: true,
  };

  const dataSource = new DataSource(opt as DataSourceOptions);
  const connection = await dataSource.initialize();
  const userService = new UsersService(connection.manager.getRepository(User));

  console.log('Seeding admin user ....');
  const user = await userService.findOneByEmail(process.env.ADMIN_EMAIL);
  if (user) return;
  await userService.create(
    UserDTO.from({
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: UserRoles.ADMIN,
    }),
  );
  console.log('Admin user seed successful 👌');
};
