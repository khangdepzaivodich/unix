import { Module } from '@nestjs/common';
import { DanhmucService } from './danhmuc.service';
import { DanhmucController } from './danhmuc.controller';

@Module({
  providers: [DanhmucService],
  controllers: [DanhmucController]
})
export class DanhmucModule {
}
