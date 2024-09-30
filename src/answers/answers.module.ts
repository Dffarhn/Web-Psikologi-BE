import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Answer])],
  providers: [AnswersService],
  exports:[AnswersService]
})
export class AnswersModule {}
