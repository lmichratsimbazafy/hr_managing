import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Consultant } from '../entities/consultant.entity';
import { DateFormatterHelpers } from '../helpers/dateFormatter';
import { StatusDTO } from '../status/dto/status.dto';
import { UserDTO } from '../users/dto/user.dto';
import { ConsultantDTO } from './dto/consultants.dto';
import { ConsultantFilterDTO } from './dto/consultantsFilter.dto';
import { ConsultantVmDTO } from './dto/consultantVm.dto';

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

  async findById(id: string): Promise<ConsultantVmDTO | undefined> {
    return this.consultantRepo
      .findOne({
        where: { id },
        relations: {
          consultantStatus: { status: true },
        },
      })
      .then((i) =>
        i
          ? ConsultantVmDTO.from({
              id: i.id,
              emailAddress: i.emailAddress,
              firstName: i.firstName,
              lastName: i.lastName,
              phone: i.phone,
              endDate: DateFormatterHelpers.stringToDate(
                i.consultantStatus[0]?.endDate ?? undefined,
              ),
              startDate: DateFormatterHelpers.stringToDate(
                i.consultantStatus[0].startDate,
              ),
              status: i.consultantStatus[0]
                ? StatusDTO.fromEntity(i.consultantStatus[0].status)
                : undefined,
            })
          : undefined,
      );
  }

  async findAll(filter?: ConsultantFilterDTO): Promise<ConsultantVmDTO[]> {
    return this.consultantRepo
      .find({
        where: {
          consultantStatus: {
            status: {
              id: filter?.statusIds ? In(filter.statusIds) : undefined,
            },
          },
        },
        relations: {
          consultantStatus: { status: true },
        },
      })
      .then((e) =>
        e.map((i) =>
          ConsultantVmDTO.from({
            id: i.id,
            emailAddress: i.emailAddress,
            firstName: i.firstName,
            lastName: i.lastName,
            phone: i.phone,
            endDate: DateFormatterHelpers.stringToDate(
              i.consultantStatus[0]?.endDate ?? undefined,
            ),
            startDate: DateFormatterHelpers.stringToDate(
              i.consultantStatus[0].startDate,
            ),
            status: i.consultantStatus[0]
              ? StatusDTO.fromEntity(i.consultantStatus[0].status)
              : undefined,
          }),
        ),
      );
  }
}
