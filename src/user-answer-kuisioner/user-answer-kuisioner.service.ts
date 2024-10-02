import { Injectable } from '@nestjs/common';
import { CreateUserAnswerKuisionerDto } from './dto/create-user-answer-kuisioner.dto';
import { UpdateUserAnswerKuisionerDto } from './dto/update-user-answer-kuisioner.dto';

@Injectable()
export class UserAnswerKuisionerService {
  create(createUserAnswerKuisionerDto: CreateUserAnswerKuisionerDto) {
    return 'This action adds a new userAnswerKuisioner';
  }

  findAll() {
    return `This action returns all userAnswerKuisioner`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userAnswerKuisioner`;
  }

  update(id: number, updateUserAnswerKuisionerDto: UpdateUserAnswerKuisionerDto) {
    return `This action updates a #${id} userAnswerKuisioner`;
  }

  remove(id: number) {
    return `This action removes a #${id} userAnswerKuisioner`;
  }
}
