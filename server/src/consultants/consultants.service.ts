import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Consultant } from '../entities/consultant.entity';
import { UserDTO } from '../users/dto/user.dto';
import { ConsultantDTO } from './dto/consultants.dto';

@Injectable()
export class ConsultantsService {
  constructor(
    @InjectRepository(Consultant)
    private readonly consultantRepo: Repository<Consultant>,
  ) {}

  async create(p: {
    userDTO: UserDTO;
    consultantDTO: ConsultantDTO;
  }): Promise<ConsultantDTO> {
    return this.consultantRepo
      .save(p.consultantDTO.toEntity(p.userDTO))
      .then((e) => ConsultantDTO.fromEntity(e));
  }

  async findByEmail(email: string): Promise<ConsultantDTO | undefined> {
    return this.consultantRepo
      .findOneBy({ emailAddress: email })
      .then((e) => (e ? ConsultantDTO.fromEntity(e) : undefined));
  }
}
