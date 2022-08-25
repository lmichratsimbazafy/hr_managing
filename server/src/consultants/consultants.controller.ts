import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpStatus,
  Inject,
  NotFoundException,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ConsultantStatusService } from '../consultant-status/consultant-status.service';
import { ConsultantStatusDTO } from '../consultant-status/dto/consultantStatus.dto';
import { DateFormatterHelpers } from '../helpers/dateFormatter';
import { StatusService } from '../status/status.service';
import { UserDTO } from '../users/dto/user.dto';
import { User } from '../users/user.decorator';
import { ConsultantsService } from './consultants.service';
import { ConsultantDTO } from './dto/consultants.dto';
import { ConsultantFilterDTO } from './dto/consultantsFilter.dto';
import { ConsultantVmDTO } from './dto/consultantVm.dto';
import { CreateConsultantDTO } from './dto/createConsultant.dto';

@Controller('consultants')
export class ConsultantsController {
  constructor(
    private consultantService: ConsultantsService,
    private consultantStatusService: ConsultantStatusService,
    private statusService: StatusService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createConsultant(
    @User() user: UserDTO,
    @Body() p: CreateConsultantDTO,
  ): Promise<ConsultantVmDTO> {
    this.logger.info(`search status of id ${p.statusId}`);
    const status = await this.statusService.findById(p.statusId);
    if (!status)
      throw new NotFoundException(`status of ${p.statusId} not found`);

    this.logger.info(`search consultant of email ${p.emailAddress}`);

    const existingConsultant = await this.consultantService.findByEmail(
      p.emailAddress,
    );
    if (existingConsultant)
      throw new ConflictException(
        {
          status: HttpStatus.CONFLICT,
          error: `ENTITY_ALREADY_EXISTS`,
        },
        `the consultant of email address ${p.emailAddress} already exists`,
      );
    this.logger.info(`creating consultant...`);

    const newConsultant = await this.consultantService.create({
      userDTO: user,
      consultantDTO: ConsultantDTO.from({
        emailAddress: p.emailAddress,
        firstName: p.firstName,
        lastName: p.lastName,
        phone: p.phone,
      }),
    });

    const endDate = DateFormatterHelpers.stringToDate(p.endDate);
    const startDate = DateFormatterHelpers.stringToDate(p.startDate);
    this.logger.info(`creating consultant status...`);
    const consultantStatus = await this.consultantStatusService.create(
      ConsultantStatusDTO.from({
        endDate,
        startDate,
      }),
    );

    const controllerStatusEntity = consultantStatus.toEntity();

    controllerStatusEntity.consultant = newConsultant.toEntity(user);
    controllerStatusEntity.status = status.toEntity(user);

    this.logger.info(`update consultant status...`);
    await this.consultantStatusService.updateEntity(controllerStatusEntity);

    return ConsultantVmDTO.from({
      id: newConsultant.id,
      emailAddress: newConsultant.emailAddress,
      firstName: newConsultant.firstName,
      lastName: newConsultant.lastName,
      phone: newConsultant.phone,
      endDate,
      startDate,
      status,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findConsultants(
    @Query() filters?: ConsultantFilterDTO,
  ): Promise<ConsultantVmDTO[]> {
    return this.consultantService.findAll(filters);
  }
}
