import { Test, TestingModule } from '@nestjs/testing';
import { UserAnswerKuisionerService } from './user-answer-kuisioner.service';

describe('UserAnswerKuisionerService', () => {
  let service: UserAnswerKuisionerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserAnswerKuisionerService],
    }).compile();

    service = module.get<UserAnswerKuisionerService>(UserAnswerKuisionerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
