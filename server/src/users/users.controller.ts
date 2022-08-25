import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { CreateUserTDO } from './dto/createUser.dto';
import { UserDTO } from './dto/user.dto';
import { UserVmDTO } from './dto/userVM.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('users')
  @ApiResponse({
    type: UserVmDTO,
    status: 200,
  })
  async createUser(@Body() dto: CreateUserTDO): Promise<UserVmDTO> {
    return UserVmDTO.from(await this.userService.create(UserDTO.from(dto)));
  }
}
