import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TakeKuisionerService } from './take-kuisioner.service';
import { CreateTakeKuisionerDto } from './dto/create-take-kuisioner.dto';
import { UpdateTakeKuisionerDto } from './dto/update-take-kuisioner.dto';

@Controller('take-kuisioner')
export class TakeKuisionerController {
  constructor(private readonly takeKuisionerService: TakeKuisionerService) {}

  @Post()
  create(@Body() createTakeKuisionerDto: CreateTakeKuisionerDto) {
    return this.takeKuisionerService.create(createTakeKuisionerDto);
  }

  @Get()
  findAll() {
    return this.takeKuisionerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.takeKuisionerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTakeKuisionerDto: UpdateTakeKuisionerDto) {
    return this.takeKuisionerService.update(+id, updateTakeKuisionerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.takeKuisionerService.remove(+id);
  }
}
