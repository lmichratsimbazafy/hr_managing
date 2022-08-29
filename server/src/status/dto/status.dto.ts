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

  @ApiProperty({ required: true })
  @IsString()
  displayText: string;

  static from(dto: Partial<StatusDTO>): StatusDTO {
    const it = new StatusDTO();
    it.id = dto.id;
    it.label = dto.label;
    it.displayText = dto.displayText;
    return it;
  }

  static fromEntity(status: Status): StatusDTO {
    return this.from({
      id: status.id ?? '',
      label: status.label ?? 'Autre',
      displayText: status.displayText,
    });
  }

  toEntity(user: UserDTO): Status {
    const it = new Status();
    it.id = this.id;
    it.label = this.label;
    it.displayText = this.displayText;
    it.createDateTime = new Date();
    it.lastChangedDateTime = new Date();
    it.createdBy = user.id;
    return it;
  }
}
