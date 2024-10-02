import { Test, TestingModule } from '@nestjs/testing';
import { UserAnswerSubKuisionerController } from './user-answer-sub-kuisioner.controller';
import { UserAnswerSubKuisionerService } from './user-answer-sub-kuisioner.service';

describe('UserAnswerSubKuisionerController', () => {
  let controller: UserAnswerSubKuisionerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserAnswerSubKuisionerController],
      providers: [UserAnswerSubKuisionerService],
    }).compile();

    controller = module.get<UserAnswerSubKuisionerController>(UserAnswerSubKuisionerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
