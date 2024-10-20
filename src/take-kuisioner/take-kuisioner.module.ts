import { Module } from '@nestjs/common';
import { TakeKuisionerService } from './take-kuisioner.service';
import { TakeKuisionerController } from './take-kuisioner.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TakeKuisioner } from './entities/take-kuisioner.entity';
import { UserModule } from 'src/user/user.module';
import { Kuisioner } from 'src/kuisioner/entity/kuisioner.entity';
import { KuisionerModule } from 'src/kuisioner/kuisioner.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TakeKuisioner]),
    UserModule,
    KuisionerModule,
  ],
  controllers: [TakeKuisionerController],
  providers: [TakeKuisionerService],
  exports: [TakeKuisionerService],
})
export class TakeKuisionerModule {}
