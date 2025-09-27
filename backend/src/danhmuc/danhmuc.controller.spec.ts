import { Test, TestingModule } from '@nestjs/testing';
import { DanhmucController } from './danhmuc.controller';

describe('DanhmucController', () => {
  let controller: DanhmucController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DanhmucController],
    }).compile();

    controller = module.get<DanhmucController>(DanhmucController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
