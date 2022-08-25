import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConsultantStatus } from '../entities/consultantStatus.entity';
import { ConsultantStatusDTO } from './dto/consultantStatus.dto';

@Injectable()
export class ConsultantStatusService {
  constructor(
    @InjectRepository(ConsultantStatus)
    private repo: Repository<ConsultantStatus>,
  ) {}

  async create(dto: ConsultantStatusDTO): Promise<ConsultantStatusDTO> {
    return this.repo
      .save(dto.toEntity())
      .then((e) => ConsultantStatusDTO.fromEntity(e));
  }

  async updateEntity(p: ConsultantStatus): Promise<ConsultantStatusDTO> {
    return this.repo.save(p).then((e) => ConsultantStatusDTO.fromEntity(e));
  }
}
