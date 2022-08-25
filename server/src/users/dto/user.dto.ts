import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { User, UserRoles } from '../../entities/user.entity';

export class UserDTO {
  @ApiProperty({ required: true })
  @IsUUID()
  id: string;

  @ApiProperty({ required: true })
  @IsString()
  email: string;

  @ApiProperty({ required: true })
  @IsString()
  password: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(UserRoles)
  role: UserRoles;

  static from(dto: Partial<UserDTO>): UserDTO {
    const it = new UserDTO();
    it.id = dto.id;
    it.email = dto.email ?? 'admin@celaneo.com';
    it.role = dto.role ?? UserRoles.COLLABORATOR;
    it.password = dto.password;
    return it;
  }

  public static fromEntity(user: User): UserDTO {
    return this.from({
      email: user.email,
      id: user.id,
      role: user.role,
      password: user.password,
    });
  }

  public toEntity(): User {
    const it = new User();
    it.email = this.email;
    it.id = this.id;
    it.role = this.role;
    it.password = this.password;
    return it;
  }
}
