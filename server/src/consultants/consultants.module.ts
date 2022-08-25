import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsultantStatusModule } from '../consultant-status/consultant-status.module';
import { Consultant } from '../entities/consultant.entity';
import { StatusModule } from '../status/status.module';
import { ConsultantsController } from './consultants.controller';
import { ConsultantsService } from './consultants.service';

@Module({
  controllers: [ConsultantsController],
  providers: [ConsultantsService],
  imports: [
    TypeOrmModule.forFeature([Consultant]),
    ConsultantStatusModule,
    StatusModule,
  ],
})
export class ConsultantsModule {}
