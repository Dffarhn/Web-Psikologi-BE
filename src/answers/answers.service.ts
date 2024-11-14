import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';
import { Repository } from 'typeorm';
import { Question } from 'src/questions/entities/question.entity';
import { QuestionsService } from 'src/questions/questions.service';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,

    @Inject(forwardRef(() => QuestionsService))
    private questionsService: QuestionsService, // Inject the QuestionsService
  ) {}

  async create(
    questionId: string,
    createAnswerDto: CreateAnswerDto[],
  ): Promise<Answer[]> {
    const dataQuestion = await this.questionsService.findOne(questionId);

    // Create and save answers
    const answers = createAnswerDto.map((dto: CreateAnswerDto) => {
      return this.answerRepository.create({
        answer: dto.answer, // Assuming answerText is the field in CreateAnswerDto
        score: dto.score, // Set the related question
        questionId: dataQuestion,
      });
    });

    // Save all answers in one go
    return this.answerRepository.save(answers);
  }

  findAll() {
    return `This action returns all answers`;
  }

  async findOne(id: string): Promise<Answer> {
    const data = await this.answerRepository.findOne({ where: { id: id } });

    if (!data) {
      throw new NotFoundException('Answer Not Found');
    }

    return data;
  }

  async updateAnswersForQuestion(
    questionId: string,
    updateAnswerDtos: UpdateAnswerDto[],
  ): Promise<Answer[]> {
    // Find the existing question (to ensure the question exists)
    const dataQuestion = await this.questionsService.findOne(questionId);
  

    if (!dataQuestion) {
      throw new NotFoundException('Question Not Found');
    }

    // Find all existing answers for this question
    const existingAnswers = dataQuestion.answers;

    // Map over the DTOs and update each corresponding answer
    const updatedAnswers: Answer[] = [];

    for (const dto of updateAnswerDtos) {
      // Find the specific answer to update
      const answer = existingAnswers.find((a) => a.id === dto.id);

      if (!answer) {
        throw new NotFoundException(`Answer with ID ${dto.id} not found`);
      }

      // Update the answer properties
      answer.answer = dto.answer;
      answer.score = dto.score;

      // Save the updated answer
      updatedAnswers.push(await this.answerRepository.save(answer));
    }

    return updatedAnswers;
  }

  remove(id: number) {
    return `This action removes a #${id} answer`;
  }
}
