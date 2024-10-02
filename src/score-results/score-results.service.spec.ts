import { Test, TestingModule } from '@nestjs/testing';
import { ScoreResultsService } from './score-results.service';

describe('ScoreResultsService', () => {
  let service: ScoreResultsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScoreResultsService],
    }).compile();

    service = module.get<ScoreResultsService>(ScoreResultsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
