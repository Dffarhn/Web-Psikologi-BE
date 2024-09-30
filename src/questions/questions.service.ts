import { Inject, Injectable } from '@nestjs/common';
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
    id: string,
    createQuestionDto: BodyCreateQuestionDto,
  ): Promise<Question> {
    const subKuisoner: SubKuisioner =
      await this.subKuisionerService.findOne(id);

    const data: CreateQuestionDto = {
      question: createQuestionDto.question,
      subKuisionerId: subKuisoner,
    };
    const saveQuestion = await this.questionRepository.save(data);

    await this.answerService.create(saveQuestion, createQuestionDto.answers);

    return saveQuestion;
  }

  async findOne(id: string): Promise<Question> {
    return this.questionRepository.findOne({
      where: { id: id },
      relations: ['answers'],
    });
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
