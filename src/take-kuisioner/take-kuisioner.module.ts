import { Module } from '@nestjs/common';
import { TakeKuisionerService } from './take-kuisioner.service';
import { TakeKuisionerController } from './take-kuisioner.controller';

@Module({
  controllers: [TakeKuisionerController],
  providers: [TakeKuisionerService],
})
export class TakeKuisionerModule {}
