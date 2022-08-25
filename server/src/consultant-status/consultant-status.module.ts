import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsultantStatus } from '../entities/consultantStatus.entity';
import { ConsultantStatusService } from './consultant-status.service';

@Module({
  imports: [TypeOrmModule.forFeature([ConsultantStatus])],
  providers: [ConsultantStatusService],
  exports: [ConsultantStatusService],
})
export class ConsultantStatusModule {}
