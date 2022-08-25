import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { UserRoles } from '../../entities/user.entity';

export class CreateUserTDO {
  @ApiProperty({ required: true })
  @IsString()
  email: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(UserRoles)
  role: UserRoles;

  static from(dto: Partial<CreateUserTDO>): CreateUserTDO {
    const it = new CreateUserTDO();
    it.email = dto.email ?? 'admin@celaneo.com';
    it.role = dto.role ?? UserRoles.COLLABORATOR;
    return it;
  }
}
