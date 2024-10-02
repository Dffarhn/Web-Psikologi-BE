import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserAnswerSubKuisionerService } from './user-answer-sub-kuisioner.service';
import { CreateUserAnswerSubKuisionerDto } from './dto/create-user-answer-sub-kuisioner.dto';
import { UpdateUserAnswerSubKuisionerDto } from './dto/update-user-answer-sub-kuisioner.dto';

@Controller('user-answer-sub-kuisioner')
export class UserAnswerSubKuisionerController {
  constructor(private readonly userAnswerSubKuisionerService: UserAnswerSubKuisionerService) {}

  @Post()
  create(@Body() createUserAnswerSubKuisionerDto: CreateUserAnswerSubKuisionerDto) {
    return this.userAnswerSubKuisionerService.create(createUserAnswerSubKuisionerDto);
  }

  @Get()
  findAll() {
    return this.userAnswerSubKuisionerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userAnswerSubKuisionerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserAnswerSubKuisionerDto: UpdateUserAnswerSubKuisionerDto) {
    return this.userAnswerSubKuisionerService.update(+id, updateUserAnswerSubKuisionerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userAnswerSubKuisionerService.remove(+id);
  }
}
