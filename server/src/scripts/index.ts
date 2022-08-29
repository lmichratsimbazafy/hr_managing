import { DataSource, DataSourceOptions } from 'typeorm';
import { configService } from '../config/config.service';
import { User } from '../entities/user.entity';
import { UsersService } from '../users/users.service';
import { seedAdminUser } from './seedAdminUsesr';
import { seedStatus } from './seedStatus';

console.log('Seed Running ...', '🚀');

const executeSeed = async (): Promise<void> => {
  const opt = {
    ...configService.getTypeOrmConfig(),
    debug: true,
  };

  const dataSource = new DataSource(opt as DataSourceOptions);
  const connection = await dataSource.initialize();
  const user = await seedAdminUser(connection);

  Promise.all([seedStatus(connection, user)]);
};

executeSeed();
