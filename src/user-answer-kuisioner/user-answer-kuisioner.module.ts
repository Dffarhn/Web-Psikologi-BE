import { Module } from '@nestjs/common';
import { UserAnswerKuisionerService } from './user-answer-kuisioner.service';
import { UserAnswerKuisionerController } from './user-answer-kuisioner.controller';

@Module({
  controllers: [UserAnswerKuisionerController],
  providers: [UserAnswerKuisionerService],
})
export class UserAnswerKuisionerModule {}
