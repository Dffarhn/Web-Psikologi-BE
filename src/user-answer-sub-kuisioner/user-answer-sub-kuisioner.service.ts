import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAnswerSubKuisioner } from './entities/user-answer-sub-kuisioner.entity';
import { Repository } from 'typeorm';
import { TakeKuisionerService } from 'src/take-kuisioner/take-kuisioner.service';
import { SubKuisionerService } from 'src/sub-kuisioner/sub-kuisioner.service';

@Injectable()
export class UserAnswerSubKuisionerService {
  constructor(
    @InjectRepository(UserAnswerSubKuisioner)
    private readonly userAnswerSubKuisionerRepository: Repository<UserAnswerSubKuisioner>,

    @Inject(TakeKuisionerService)
    private readonly takeKuisionerService: TakeKuisionerService,

    @Inject(SubKuisionerService)
    private readonly subKuisionerService: SubKuisionerService,
  ) {}

  async create(
    takeKuisionerId: string,
    subKuisionerId: string,
    userId: string,
  ): Promise<string> {
    const subKuisioner = await this.subKuisionerService.findOne(subKuisionerId);
    if (!subKuisioner) {
      throw new NotFoundException('The Sub Kuisioner Is Not Found');
    }

    const takeKuisioner =
      await this.takeKuisionerService.findOne(takeKuisionerId);

    if (!takeKuisioner) {
      throw new NotFoundException('Your Not Take The Kuisioner');
    }

    if (takeKuisioner.user.id != userId) {
      throw new ForbiddenException('Your Forbidden to Access this Kuisioner');
    }

    const data = {
      takeKuisioner: takeKuisioner,
      subKuisioner: subKuisioner,
    };

    const createTakeSubKuisioner =
      await this.userAnswerSubKuisionerRepository.save(data);

    return createTakeSubKuisioner.id;
  }

  findAll() {
    return `This action returns all userAnswerSubKuisioner`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userAnswerSubKuisioner`;
  }

  update(id: number) {
    return `This action updates a #${id} userAnswerSubKuisioner`;
  }

  remove(id: number) {
    return `This action removes a #${id} userAnswerSubKuisioner`;
  }
}
