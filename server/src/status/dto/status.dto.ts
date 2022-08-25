import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';
import { Status } from '../../entities/status.entity';
import { UserDTO } from '../../users/dto/user.dto';

export class StatusDTO {
  @ApiProperty({ required: true })
  @IsUUID()
  id: string;

  @ApiProperty({ required: true })
  @IsString()
  label: string;

  static from(dto: Partial<StatusDTO>): StatusDTO {
    const it = new StatusDTO();
    it.id = dto.id;
    it.label = dto.label;
    return it;
  }

  static fromEntity(status: Status): StatusDTO {
    return this.from({
      id: status.id ?? '',
      label: status.label ?? 'Autre',
    });
  }

  toEntity(user: UserDTO): Status {
    const it = new Status();
    it.id = this.id;
    it.label = this.label;
    it.createDateTime = new Date();
    it.lastChangedDateTime = new Date();
    it.createdBy = user.id;
    return it;
  }
}
