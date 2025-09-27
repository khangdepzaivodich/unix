import { Test, TestingModule } from '@nestjs/testing';
import { DanhmucService } from './danhmuc.service';

describe('DanhmucService', () => {
  let service: DanhmucService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DanhmucService],
    }).compile();

    service = module.get<DanhmucService>(DanhmucService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
