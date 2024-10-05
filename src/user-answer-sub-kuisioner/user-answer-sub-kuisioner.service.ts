import {
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAnswerSubKuisioner } from './entities/user-answer-sub-kuisioner.entity';
import { Repository } from 'typeorm';
import { TakeKuisionerService } from 'src/take-kuisioner/take-kuisioner.service';
import { SubKuisionerService } from 'src/sub-kuisioner/sub-kuisioner.service';
import { UserAnswerKuisionerService } from 'src/user-answer-kuisioner/user-answer-kuisioner.service';
import { CreateUserAnswerSubKuisionerDTO } from './dto/request/create-user-answer-sub-kuisioner.dto';

@Injectable()
export class UserAnswerSubKuisionerService {
  constructor(
    @InjectRepository(UserAnswerSubKuisioner)
    private readonly userAnswerSubKuisionerRepository: Repository<UserAnswerSubKuisioner>,

    @Inject(TakeKuisionerService)
    private readonly takeKuisionerService: TakeKuisionerService,

    @Inject(SubKuisionerService)
    private readonly subKuisionerService: SubKuisionerService,

    @Inject(forwardRef(() => UserAnswerKuisionerService))
    private readonly userAnswerKuisionerService: UserAnswerKuisionerService,
  ) {}

  async create(
    takeKuisionerId: string,
    subKuisionerData: CreateUserAnswerSubKuisionerDTO,
    userId: string,
  ): Promise<string> {
    const subKuisioner = await this.subKuisionerService.findOne(
      subKuisionerData.subKuisionerId,
    );
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

    await this.userAnswerKuisionerService.create(
      createTakeSubKuisioner.id,
      subKuisionerData.userAnswers,
    );

    return createTakeSubKuisioner.id;
  }

  findAll() {
    return `This action returns all userAnswerSubKuisioner`;
  }

  async findOne(id: string): Promise<UserAnswerSubKuisioner> {
    const data = await this.userAnswerSubKuisionerRepository.findOne({
      where: { id: id },
    });

    if (!data) {
      throw new NotFoundException('Take Sub Kuisioner Not Found');
    }

    return data;
  }

  update(id: number) {
    return `This action updates a #${id} userAnswerSubKuisioner`;
  }

  remove(id: number) {
    return `This action removes a #${id} userAnswerSubKuisioner`;
  }
}
