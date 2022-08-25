import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDTO {
  @ApiProperty({ required: true })
  @IsString()
  access_token: string;

  static from(dto: Partial<LoginDTO>): LoginDTO {
    const it = new LoginDTO();
    it.access_token = dto.access_token;

    return it;
  }
}

export class LoginInputDTO {
  @ApiProperty({ required: true })
  @IsString()
  email: string;

  @ApiProperty({ required: true })
  @IsString()
  password: string;

  constructor(p: Partial<LoginInputDTO>) {
    this.email = p.email;
    this.password = p.email;
  }

  static from(dto: Partial<LoginInputDTO>): LoginInputDTO {
    return new LoginInputDTO(dto);
  }
}
