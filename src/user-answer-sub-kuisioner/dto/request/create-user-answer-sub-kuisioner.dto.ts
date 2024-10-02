import { IsNotEmpty } from 'class-validator';
import { isNotBlank } from 'src/common/validatorCustom/isNotBlank.validator';

export class CreateUserAnswerSubKuisionerDTO {
  @IsNotEmpty({ message: 'subKuisionerId is required' })
  @isNotBlank({ message: 'subKuisionerId cannot be blank' })
  subKuisionerId: string;
}
