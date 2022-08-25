import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { Consultant } from '../entities/consultant.entity';
import { ConsultantStatus } from '../entities/consultantStatus.entity';
import { Status } from '../entities/status.entity';
import { User } from '../entities/user.entity';

dotenv.config();

class ConfigService {
  constructor(private env: { [key: string]: string } | undefined) {}

  private getValue = (key: string, throwOnMissing = true): string => {
    const value = this.env[key];

    if (!value && throwOnMissing)
      throw new Error(`Config Error - Missing env.${key}`);
    return value;
  };

  public ensureValues = (keys: string[]): ConfigService => {
    keys.forEach((k) => this.getValue(k));
    return this;
  };

  public getPort = (): string => this.getValue('PORT');

  public isProductionMode = (): boolean => this.getValue('MODE') !== 'DEV';

  public getTypeOrmConfig = (): TypeOrmModuleOptions => {
    return {
      type: 'postgres',
      host: this.getValue('POSTGRES_HOST'),
      port: parseInt(this.getValue('POSTGRES_PORT')),
      username: this.getValue('POSTGRES_USER'),
      password: this.getValue('POSTGRES_PASSWORD'),
      database: this.getValue('POSTGRES_DATABASE'),
      entities: [User, Status, Consultant, ConsultantStatus],
      migrations: ['src/migrations/*.ts'],
      synchronize: true,

      ssl: this.isProductionMode(),
    };
  };
}

const configService = new ConfigService(process.env).ensureValues([
  'POSTGRES_HOST',
  'POSTGRES_PORT',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_DATABASE',
  'ADMIN_EMAIL',
  'ADMIN_PASSWORD',
]);

export { configService };
