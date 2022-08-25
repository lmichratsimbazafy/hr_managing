import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { configService } from './config/config.service';
import { ConsultantsModule } from './consultants/consultants.module';
import { LoggerConfig } from './LoggerConfig';
import { StatusModule } from './status/status.module';
import { UsersModule } from './users/users.module';
import { ConsultantStatusModule } from './consultant-status/consultant-status.module';

const logger: LoggerConfig = new LoggerConfig();

@Module({
  imports: [
    WinstonModule.forRoot(logger.console()),
    UsersModule,
    TypeOrmModule.forRoot({
      ...configService.getTypeOrmConfig(),
    }),
    AuthModule,
    StatusModule,
    ConsultantsModule,
    ConsultantStatusModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
