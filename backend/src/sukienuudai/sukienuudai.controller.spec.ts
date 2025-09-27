import { Test, TestingModule } from '@nestjs/testing';
import { SukienuudaiController } from './sukienuudai.controller';

describe('SukienuudaiController', () => {
  let controller: SukienuudaiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SukienuudaiController],
    }).compile();

    controller = module.get<SukienuudaiController>(SukienuudaiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
