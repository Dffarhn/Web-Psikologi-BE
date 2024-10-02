import { Module } from '@nestjs/common';
import { UserAnswerSubKuisionerService } from './user-answer-sub-kuisioner.service';
import { UserAnswerSubKuisionerController } from './user-answer-sub-kuisioner.controller';

@Module({
  controllers: [UserAnswerSubKuisionerController],
  providers: [UserAnswerSubKuisionerService],
})
export class UserAnswerSubKuisionerModule {}
