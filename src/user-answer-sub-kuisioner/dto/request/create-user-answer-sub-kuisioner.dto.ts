import { IsNotEmpty } from 'class-validator';
import { isNotBlank } from 'src/common/validatorCustom/isNotBlank.validator';
import { CreateUserAnswerKuisionerDto } from 'src/user-answer-kuisioner/dto/create-user-answer-kuisioner.dto';

export class CreateUserAnswerSubKuisionerDTO {
  @IsNotEmpty({ message: 'subKuisionerId is required' })
  @isNotBlank({ message: 'subKuisionerId cannot be blank' })
  subKuisionerId: string;

  userAnswers: CreateUserAnswerKuisionerDto[];
}
