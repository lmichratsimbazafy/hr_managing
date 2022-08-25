import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';
import { Consultant } from '../../entities/consultant.entity';
import { UserDTO } from '../../users/dto/user.dto';

export class ConsultantDTO implements Readonly<ConsultantDTO> {
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

  static from(dto: Partial<ConsultantDTO>): ConsultantDTO {
    const it = new ConsultantDTO();
    it.id = dto.id;
    it.emailAddress = dto.emailAddress ?? '';
    it.firstName = dto.firstName ?? '';
    it.lastName = dto.lastName ?? '';
    it.phone = dto.phone ?? '';
    return it;
  }

  static fromEntity(consultant: Consultant): ConsultantDTO {
    return this.from({
      emailAddress: consultant.emailAddress,
      firstName: consultant.firstName,
      id: consultant.id,
      lastName: consultant.lastName,
      phone: consultant.phone,
    });
  }

  toEntity(user: UserDTO): Consultant {
    const it = new Consultant();
    it.id = this.id;
    it.emailAddress = this.emailAddress;
    it.firstName = this.firstName;
    it.lastName = this.lastName;
    it.phone = this.phone;
    it.createDateTime = new Date();
    it.lastChangedDateTime = new Date();
    it.createdBy = user.id;
    return it;
  }
}
