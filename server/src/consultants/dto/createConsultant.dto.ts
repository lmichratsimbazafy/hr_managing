import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';

export class CreateConsultantDTO {
  @ApiProperty({ required: true })
  @IsString()
  lastName: string;

  @ApiProperty({ required: true })
  @IsString()
  firstName: string;

  @ApiProperty({ required: true })
  @IsString()
  emailAddress: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsString()
  statusId: string;

  @ApiProperty({ required: true })
  @IsDate()
  startDate: string;

  @ApiProperty()
  @IsDate()
  endDate: string;
}
