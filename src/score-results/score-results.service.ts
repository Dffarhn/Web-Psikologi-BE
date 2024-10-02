import { Injectable } from '@nestjs/common';
import { CreateScoreResultDto } from './dto/create-score-result.dto';
import { UpdateScoreResultDto } from './dto/update-score-result.dto';

@Injectable()
export class ScoreResultsService {
  create(createScoreResultDto: CreateScoreResultDto) {
    return 'This action adds a new scoreResult';
  }

  findAll() {
    return `This action returns all scoreResults`;
  }

  findOne(id: number) {
    return `This action returns a #${id} scoreResult`;
  }

  update(id: number, updateScoreResultDto: UpdateScoreResultDto) {
    return `This action updates a #${id} scoreResult`;
  }

  remove(id: number) {
    return `This action removes a #${id} scoreResult`;
  }
}
