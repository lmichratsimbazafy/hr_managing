import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status } from '../entities/status.entity';
import { UserDTO } from '../users/dto/user.dto';
import { StatusDTO } from './dto/status.dto';

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(Status) private readonly statusRepo: Repository<Status>,
  ) {}

  async create(p: { statusDTO: StatusDTO; user: UserDTO }): Promise<StatusDTO> {
    return this.statusRepo
      .save(p.statusDTO.toEntity(p.user))
      .then((e) => StatusDTO.fromEntity(e));
  }

  async findStatusByLabe(label: string): Promise<StatusDTO> {
    return this.statusRepo.findOneBy({ label }).then((e) => {
      if (!e)
        throw new NotFoundException(
          {
            status: HttpStatus.NOT_FOUND,
            error: `ENTITY_NOT_FOUND`,
          },
          `Cannot find status of label #${label} not found`,
        );
      return StatusDTO.fromEntity(e);
    });
  }

  async findById(id: string): Promise<StatusDTO> {
    return this.statusRepo.findOneBy({ id }).then((e) => {
      if (!e)
        throw new NotFoundException(
          {
            status: HttpStatus.NOT_FOUND,
            error: `ENTITY_NOT_FOUND`,
          },
          `Cannot find status of id #${id} not found`,
        );

      return StatusDTO.fromEntity(e);
    });
  }

  findAll = async (): Promise<StatusDTO[]> => {
    return this.statusRepo
      .find()
      .then((e) => e.map((i) => StatusDTO.fromEntity(i)));
  };
}
