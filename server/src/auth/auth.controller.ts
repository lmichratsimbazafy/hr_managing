import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { UserDTO } from '../users/dto/user.dto';
import { UserVmDTO } from '../users/dto/userVM.dto';
import { AuthService } from './auth.service';
import { LoginDTO, LoginInputDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiResponse({
    type: LoginDTO,
    status: 200,
  })
  async login(@Body() dto: LoginInputDTO): Promise<LoginDTO> {
    return this.authService.login(dto.email, dto.password);
  }

  @Post('register')
  @ApiResponse({
    type: UserVmDTO,
    status: 200,
  })
  async register(@Body() dto: UserDTO): Promise<UserVmDTO> {
    return this.authService.register(
      UserDTO.from({
        ...dto,
      }),
    );
  }
}
