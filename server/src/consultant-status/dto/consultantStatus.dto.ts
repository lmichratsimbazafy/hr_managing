import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { ConsultantDTO } from '../../consultants/dto/consultants.dto';
import { ConsultantStatus } from '../../entities/consultantStatus.entity';
import { DateFormatterHelpers } from '../../helpers/dateFormatter';
import { StatusDTO } from '../../status/dto/status.dto';
import { UserDTO } from '../../users/dto/user.dto';

export class ConsultantStatusDTO {
  @ApiProperty({ required: true })
  id: string;

  @ApiProperty({ required: true })
  startDate: Date;

  @ApiProperty()
  @IsOptional()
  endDate: Date;

  constructor(p: Partial<ConsultantStatusDTO>) {
    this.id = p.id;
    this.startDate = p.startDate;
    this.endDate = p.endDate;
  }

  static from(dto: Partial<ConsultantStatusDTO>): ConsultantStatusDTO {
    return new ConsultantStatusDTO(dto);
  }

  static fromEntity(consultantStatus: ConsultantStatus): ConsultantStatusDTO {
    return this.from({
      id: consultantStatus.id,
      endDate: new Date(consultantStatus.endDate),
      startDate: new Date(consultantStatus.startDate),
    });
  }

  toEntity(): ConsultantStatus {
    const it = new ConsultantStatus();
    it.id = this.id;
    it.endDate = DateFormatterHelpers.dateToString(this.endDate);
    it.startDate = DateFormatterHelpers.dateToString(this.startDate);
    return it;
  }
}
