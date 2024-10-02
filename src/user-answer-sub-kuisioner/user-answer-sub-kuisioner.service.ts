import { Injectable } from '@nestjs/common';
import { CreateUserAnswerSubKuisionerDto } from './dto/create-user-answer-sub-kuisioner.dto';
import { UpdateUserAnswerSubKuisionerDto } from './dto/update-user-answer-sub-kuisioner.dto';

@Injectable()
export class UserAnswerSubKuisionerService {
  create(createUserAnswerSubKuisionerDto: CreateUserAnswerSubKuisionerDto) {
    return 'This action adds a new userAnswerSubKuisioner';
  }

  findAll() {
    return `This action returns all userAnswerSubKuisioner`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userAnswerSubKuisioner`;
  }

  update(id: number, updateUserAnswerSubKuisionerDto: UpdateUserAnswerSubKuisionerDto) {
    return `This action updates a #${id} userAnswerSubKuisioner`;
  }

  remove(id: number) {
    return `This action removes a #${id} userAnswerSubKuisioner`;
  }
}
