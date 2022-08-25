import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, IsUUID } from 'class-validator';
import { UserRoles } from '../../entities/user.entity';
import { UserDTO } from './user.dto';

export class UserVmDTO {
  @ApiProperty({ required: true })
  @IsUUID()
  id: string;

  @ApiProperty({ required: true })
  @IsString()
  email: string;

  @ApiProperty({ required: true })
  @IsEnum(UserRoles)
  role: UserRoles;

  static from(userDTO: UserDTO): UserVmDTO {
    const it = new UserVmDTO();
    it.email = userDTO.email;
    it.id = userDTO.id;
    it.role = userDTO.role;

    return it;
  }
}
