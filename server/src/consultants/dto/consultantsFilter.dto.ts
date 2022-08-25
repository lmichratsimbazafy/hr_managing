import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class ConsultantFilterDTO {
  @ApiProperty()
  @IsOptional()
  statusId: string;
}
