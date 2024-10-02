import { Injectable } from '@nestjs/common';
import { CreateTakeKuisionerDto } from './dto/create-take-kuisioner.dto';
import { UpdateTakeKuisionerDto } from './dto/update-take-kuisioner.dto';

@Injectable()
export class TakeKuisionerService {
  create(createTakeKuisionerDto: CreateTakeKuisionerDto) {
    return 'This action adds a new takeKuisioner';
  }

  findAll() {
    return `This action returns all takeKuisioner`;
  }

  findOne(id: number) {
    return `This action returns a #${id} takeKuisioner`;
  }

  update(id: number, updateTakeKuisionerDto: UpdateTakeKuisionerDto) {
    return `This action updates a #${id} takeKuisioner`;
  }

  remove(id: number) {
    return `This action removes a #${id} takeKuisioner`;
  }
}
