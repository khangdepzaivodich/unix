import { Module } from '@nestjs/common';
import { SukienuudaiController } from './sukienuudai.controller';
import { SukienuudaiService } from './sukienuudai.service';

@Module({
  controllers: [SukienuudaiController],
  providers: [SukienuudaiService]
})
export class SukienuudaiModule {}
