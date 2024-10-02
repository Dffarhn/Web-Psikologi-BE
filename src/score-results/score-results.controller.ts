import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ScoreResultsService } from './score-results.service';
import { CreateScoreResultDto } from './dto/create-score-result.dto';
import { UpdateScoreResultDto } from './dto/update-score-result.dto';

@Controller('score-results')
export class ScoreResultsController {
  constructor(private readonly scoreResultsService: ScoreResultsService) {}

  @Post()
  create(@Body() createScoreResultDto: CreateScoreResultDto) {
    return this.scoreResultsService.create(createScoreResultDto);
  }

  @Get()
  findAll() {
    return this.scoreResultsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scoreResultsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateScoreResultDto: UpdateScoreResultDto) {
    return this.scoreResultsService.update(+id, updateScoreResultDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scoreResultsService.remove(+id);
  }
}
