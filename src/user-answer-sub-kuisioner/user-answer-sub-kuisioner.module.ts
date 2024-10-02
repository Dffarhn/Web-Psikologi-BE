import { Module } from '@nestjs/common';
import { UserAnswerSubKuisionerService } from './user-answer-sub-kuisioner.service';
import { UserAnswerSubKuisionerController } from './user-answer-sub-kuisioner.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAnswerSubKuisioner } from './entities/user-answer-sub-kuisioner.entity';
import { SubKuisionerModule } from 'src/sub-kuisioner/sub-kuisioner.module';
import { TakeKuisionerModule } from 'src/take-kuisioner/take-kuisioner.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserAnswerSubKuisioner]),

    SubKuisionerModule,
    TakeKuisionerModule,
  ],
  controllers: [UserAnswerSubKuisionerController],
  providers: [UserAnswerSubKuisionerService],
  exports:[UserAnswerSubKuisionerService]
})
export class UserAnswerSubKuisionerModule {}
