import { PartialType } from '@nestjs/mapped-types';
import { CreateScoreResultDto } from './create-score-result.dto';

export class UpdateScoreResultDto extends PartialType(CreateScoreResultDto) {}
