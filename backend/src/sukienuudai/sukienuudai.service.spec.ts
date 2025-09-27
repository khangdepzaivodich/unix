import { Test, TestingModule } from '@nestjs/testing';
import { SukienuudaiService } from './sukienuudai.service';

describe('SukienuudaiService', () => {
  let service: SukienuudaiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SukienuudaiService],
    }).compile();

    service = module.get<SukienuudaiService>(SukienuudaiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
