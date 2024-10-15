import { Test, TestingModule } from '@nestjs/testing';
import { AikeepUpController } from './aikeep-up.controller';

describe('AikeepUpController', () => {
  let controller: AikeepUpController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AikeepUpController],
    }).compile();

    controller = module.get<AikeepUpController>(AikeepUpController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
