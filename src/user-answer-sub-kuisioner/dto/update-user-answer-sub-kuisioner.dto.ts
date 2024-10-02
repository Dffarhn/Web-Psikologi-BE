import { PartialType } from '@nestjs/mapped-types';
import { CreateUserAnswerSubKuisionerDto } from './create-user-answer-sub-kuisioner.dto';

export class UpdateUserAnswerSubKuisionerDto extends PartialType(CreateUserAnswerSubKuisionerDto) {}
