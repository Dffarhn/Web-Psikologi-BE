import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserAnswerKuisionerService } from './user-answer-kuisioner.service';
import { CreateUserAnswerKuisionerDto } from './dto/create-user-answer-kuisioner.dto';
import { UpdateUserAnswerKuisionerDto } from './dto/update-user-answer-kuisioner.dto';

@Controller('user-answer-kuisioner')
export class UserAnswerKuisionerController {
  constructor(private readonly userAnswerKuisionerService: UserAnswerKuisionerService) {}

  @Post()
  create(@Body() createUserAnswerKuisionerDto: CreateUserAnswerKuisionerDto) {
    return this.userAnswerKuisionerService.create(createUserAnswerKuisionerDto);
  }

  @Get()
  findAll() {
    return this.userAnswerKuisionerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userAnswerKuisionerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserAnswerKuisionerDto: UpdateUserAnswerKuisionerDto) {
    return this.userAnswerKuisionerService.update(+id, updateUserAnswerKuisionerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userAnswerKuisionerService.remove(+id);
  }
}
