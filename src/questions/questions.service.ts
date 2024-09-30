import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  BodyCreateQuestionDto,
  CreateQuestionDto,
} from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';
import { SubKuisioner } from 'src/sub-kuisioner/entities/sub-kuisioner.entity';
import { SubKuisionerService } from 'src/sub-kuisioner/sub-kuisioner.service';
import { AnswersService } from 'src/answers/answers.service';
import { CreateQuestionInterface } from './interfaces/createQuestion.interface';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,

    @Inject(SubKuisionerService)
    private subKuisionerService: SubKuisionerService,

    @Inject(AnswersService)
    private readonly answerService: AnswersService,
  ) {}

  async create(
    subKuisionerId: string,
    createQuestionDto: BodyCreateQuestionDto,
  ): Promise<CreateQuestionInterface> {
    const subKuisoner: SubKuisioner =
      await this.subKuisionerService.findOne(subKuisionerId);

    const data: CreateQuestionDto = {
      question: createQuestionDto.question,
      subKuisionerId: subKuisoner,
    };
    const saveQuestion = await this.questionRepository.save(data);

    await this.answerService.create(saveQuestion, createQuestionDto.answers);

    const payload: CreateQuestionInterface = {
      id: saveQuestion.id,
      createdAt: saveQuestion.createdAt,
    };

    return payload;
  }

  async findOne(questionId: string): Promise<Question> {
    const payload = await this.questionRepository.findOne({
      where: { id: questionId },
      relations: ['answers'],
    });

    if (!payload) {
      throw new NotFoundException('Your Question Is Not Define');
    }

    return payload;
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
