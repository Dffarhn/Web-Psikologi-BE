import { forwardRef, Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';
import { QuestionsModule } from 'src/questions/questions.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Answer]),
    forwardRef(() => QuestionsModule),
  ],
  providers: [AnswersService],
  exports: [AnswersService],
})
export class AnswersModule {}
