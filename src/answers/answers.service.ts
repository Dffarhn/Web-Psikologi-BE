import { Injectable } from '@nestjs/common';
import { BodyCreateAnswerDto, CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';
import { Repository } from 'typeorm';
import { Question } from 'src/questions/entities/question.entity';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
  ) {}

  async create(
    questionId: Question,
    createAnswerDto: CreateAnswerDto[],
  ): Promise<Answer[]> {
    // Create and save answers
    const answers = createAnswerDto.map((dto: CreateAnswerDto) => {
      return this.answerRepository.create({
        answer: dto.answer, // Assuming answerText is the field in CreateAnswerDto
        score: dto.score, // Set the related question
        questionId: questionId,
      });
    });

    // Save all answers in one go
    return this.answerRepository.save(answers);
  }

  findAll() {
    return `This action returns all answers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} answer`;
  }

  update(id: number, updateAnswerDto: UpdateAnswerDto) {
    return `This action updates a #${id} answer`;
  }

  remove(id: number) {
    return `This action removes a #${id} answer`;
  }
}
