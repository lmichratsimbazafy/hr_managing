import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString, IsUUID } from 'class-validator';
import { StatusDTO } from '../../status/dto/status.dto';

export class ConsultantVmDTO {
  @ApiProperty({ required: true })
  @IsUUID()
  id: string;

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
  status: StatusDTO;

  @ApiProperty({ required: true })
  @IsDate()
  startDate: Date;

  @ApiProperty()
  @IsDate()
  endDate: Date;

  constructor(p: Partial<ConsultantVmDTO>) {
    this.id = p.id;
    this.status = p.status;
    this.startDate = p.startDate;
    this.endDate = p.endDate;
    this.lastName = p.lastName;
    this.firstName = p.firstName;
    this.emailAddress = p.emailAddress;
    this.phone = p.phone;
  }

  static from(dto: Partial<ConsultantVmDTO>): ConsultantVmDTO {
    return new ConsultantVmDTO(dto);
  }

  //   static fromEntity(consultant: ConsultantVmDTO): ConsultantVmDTO {
  //     return this.from({
  //       id: consultant.id,
  //       status: StatusDTO.from(consultant.status),
  //       endDate: new Date(consultant.endDate),
  //       startDate: new Date(consultant.startDate),
  //       lastName: consultant.lastName,
  //       firstName: consultant.firstName,
  //       emailAddress: consultant.emailAddress,
  //       phone: consultant.phone,
  //     });
  //   }

  //   toEntity(user: UserDTO): Consultant {
  //     const it = new Consultant();
  //     it.id = this.id;
  //     // it.consultant = this.consultant.toEntity(user);
  //     it.status = this.status.toEntity(user);
  //     it.endDate = DateFormatterHelpers.dateToString(this.endDate);
  //     it.startDate = DateFormatterHelpers.dateToString(this.startDate);
  //     return it;
  //   }
}
