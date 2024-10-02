import { Test, TestingModule } from '@nestjs/testing';
import { UserAnswerSubKuisionerService } from './user-answer-sub-kuisioner.service';

describe('UserAnswerSubKuisionerService', () => {
  let service: UserAnswerSubKuisionerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserAnswerSubKuisionerService],
    }).compile();

    service = module.get<UserAnswerSubKuisionerService>(UserAnswerSubKuisionerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
