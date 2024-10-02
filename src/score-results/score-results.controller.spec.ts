import { Test, TestingModule } from '@nestjs/testing';
import { ScoreResultsController } from './score-results.controller';
import { ScoreResultsService } from './score-results.service';

describe('ScoreResultsController', () => {
  let controller: ScoreResultsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScoreResultsController],
      providers: [ScoreResultsService],
    }).compile();

    controller = module.get<ScoreResultsController>(ScoreResultsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
