import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UpdateUserAnswerKuisionerDto } from './dto/update-user-answer-kuisioner.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAnswerKuisioner } from './entities/user-answer-kuisioner.entity';
import { Repository } from 'typeorm';
import { AnswersService } from 'src/answers/answers.service';
import { UserAnswerSubKuisionerService } from 'src/user-answer-sub-kuisioner/user-answer-sub-kuisioner.service';
import { CreateUserAnswerKuisionerDto } from './dto/create-user-answer-kuisioner.dto';

@Injectable()
export class UserAnswerKuisionerService {
  constructor(
    @InjectRepository(UserAnswerKuisioner)
    private readonly userAnswerKuisionerRepository: Repository<UserAnswerKuisioner>,

    @Inject(AnswersService)
    private readonly answerService: AnswersService,

    @Inject(forwardRef(() => UserAnswerSubKuisionerService))
    private readonly userAnswerSubKuisionerService: UserAnswerSubKuisionerService,
  ) {}

  async create(
    idTakeSubKuisioner: string,
    createUserAnswerKuisionerDto: CreateUserAnswerKuisionerDto[],
  ) {
    const takeSubKuisioner =
      await this.userAnswerSubKuisionerService.findOne(idTakeSubKuisioner);

    for (const answer of createUserAnswerKuisionerDto) {
      const answerData = await this.answerService.findOne(answer.answerId);

      const saveData = this.userAnswerKuisionerRepository.create({
        userAnswerSubKuisioner: takeSubKuisioner,
        answer: answerData,
      });

      await this.userAnswerKuisionerRepository.save(saveData);
    }

    return 'This action adds a new userAnswerKuisioner';
  }

  findAll() {
    return `This action returns all userAnswerKuisioner`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userAnswerKuisioner`;
  }

  update(
    id: number,
    updateUserAnswerKuisionerDto: UpdateUserAnswerKuisionerDto,
  ) {
    return `This action updates a #${id} userAnswerKuisioner`;
  }

  remove(id: number) {
    return `This action removes a #${id} userAnswerKuisioner`;
  }
}
