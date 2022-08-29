import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserDTO } from '../users/dto/user.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { UserVmDTO } from '../users/dto/userVM.dto';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(p: { email: string; password: string }): Promise<UserDTO> {
    const user = await this.userService.findOneByEmail(p.email);

    if (!user)
      throw new NotFoundException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `ENTITY_NOT_FOUND`,
        },
        `user of email ${p.email} not found`,
      );
    if (!(await bcrypt.compare(p.password, user.password)))
      throw new UnauthorizedException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: `FORBIDDEN`,
        },
        'wrong email or password',
      );
    return user;
  }

  async encryptPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return bcrypt.hash(password, saltOrRounds);
  }

  async checkIfUserExists(email: string): Promise<void> {
    const user = await this.userService.findOneByEmail(email);
    if (user)
      throw new ConflictException(
        {
          status: HttpStatus.CONFLICT,
          error: `ENTITY_ALREADY_EXISTS`,
        },
        'User already exists',
      );
  }

  async register(userDTO: UserDTO): Promise<UserVmDTO> {
    await this.checkIfUserExists(userDTO.email);

    const password = await this.encryptPassword(userDTO.password);
    const user = await this.userService.create(
      UserDTO.from({ ...userDTO, password }),
    );

    return UserVmDTO.from(user);
  }

  async login(email: string, password: string): Promise<LoginDTO> {
    const user = await this.validateUser({ email, password });
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
