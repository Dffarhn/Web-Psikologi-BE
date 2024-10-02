import { Test, TestingModule } from '@nestjs/testing';
import { UserAnswerKuisionerController } from './user-answer-kuisioner.controller';
import { UserAnswerKuisionerService } from './user-answer-kuisioner.service';

describe('UserAnswerKuisionerController', () => {
  let controller: UserAnswerKuisionerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserAnswerKuisionerController],
      providers: [UserAnswerKuisionerService],
    }).compile();

    controller = module.get<UserAnswerKuisionerController>(UserAnswerKuisionerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
