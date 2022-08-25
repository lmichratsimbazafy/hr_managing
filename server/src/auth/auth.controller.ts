import { Body, Controller, Post } from '@nestjs/common';
import { UserDTO } from '../users/dto/user.dto';
import { UserVmDTO } from '../users/dto/userVM.dto';
import { AuthService } from './auth.service';
import { LoginDTO, LoginInputDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginInputDTO): Promise<LoginDTO> {
    return this.authService.login(dto.email, dto.password);
  }

  @Post('register')
  async register(@Body() dto: UserDTO): Promise<UserVmDTO> {
    return this.authService.register(
      UserDTO.from({
        ...dto,
      }),
    );
  }
}
