import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserDTO } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async create(user: UserDTO): Promise<UserDTO> {
    return this.userRepo
      .save(user.toEntity())
      .then((e) => UserDTO.fromEntity(e));
  }

  async findOneByEmail(email: string): Promise<UserDTO> {
    return this.userRepo.findOneBy({ email }).then((e) => {
      if (!e)
        throw new NotFoundException(
          {
            status: HttpStatus.NOT_FOUND,
            error: `ENTITY_NOT_FOUND`,
          },
          `Cannot find user of email #${email} not found`,
        );
      return UserDTO.fromEntity(e);
    });
  }
}
