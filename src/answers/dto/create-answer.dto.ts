import { IsNotEmpty } from 'class-validator';
import { isNotBlank } from 'src/common/validatorCustom/isNotBlank.validator';
import { Question } from 'src/questions/entities/question.entity';

export class CreateAnswerDto {
  @IsNotEmpty({ message: 'answer is required' })
  @isNotBlank({ message: 'answer cannot be blank' })
  answer: string;
  
  @IsNotEmpty({ message: 'score is required' }) // Add validation for score
  score: number;
}
