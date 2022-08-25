import { Test, TestingModule } from '@nestjs/testing';
import { ConsultantStatusService } from './consultant-status.service';

describe('ConsultantStatusService', () => {
  let service: ConsultantStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsultantStatusService],
    }).compile();

    service = module.get<ConsultantStatusService>(ConsultantStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
