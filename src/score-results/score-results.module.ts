import { Module } from '@nestjs/common';
import { ScoreResultsService } from './score-results.service';
import { ScoreResultsController } from './score-results.controller';

@Module({
  controllers: [ScoreResultsController],
  providers: [ScoreResultsService],
})
export class ScoreResultsModule {}
