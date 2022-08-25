import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserDTO } from '../users/dto/user.dto';
import { User } from '../users/user.decorator';
import { StatusDTO } from './dto/status.dto';
import { StatusService } from './status.service';

@Controller('status')
export class StatusController {
  constructor(private statusService: StatusService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  createStatus(
    @User() user: UserDTO,
    @Body() statusDTO: StatusDTO,
  ): Promise<StatusDTO> {
    return this.statusService.create({
      statusDTO: StatusDTO.from(statusDTO),
      user,
    });
  }
}
