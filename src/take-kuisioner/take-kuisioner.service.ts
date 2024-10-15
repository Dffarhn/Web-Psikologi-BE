import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateTakeKuisionerDto } from './dto/request/update-take-kuisioner.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TakeKuisioner } from './entities/take-kuisioner.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { KuisionerService } from 'src/kuisioner/kuisioner.service';
import { UserAnswerSubKuisioner } from 'src/user-answer-sub-kuisioner/entities/user-answer-sub-kuisioner.entity';

@Injectable()
export class TakeKuisionerService {
  constructor(
    @InjectRepository(TakeKuisioner)
    private readonly takeKuisionerRepository: Repository<TakeKuisioner>,

    @Inject(UserService)
    private readonly userService: UserService,

    @Inject(KuisionerService)
    private readonly kuisionerService: KuisionerService,
  ) {}

  async create(kuisionerId: string, userId: string): Promise<string> {
    const user = await this.userService.findById(userId);
    const kuisioner =
      await this.kuisionerService.getOneKuisionerById(kuisionerId);

    const newTakeKuisioner = {
      isFinish: false,
      user: user,
      kuisioner: kuisioner,
    };

    const savedTakeKuisioner =
      await this.takeKuisionerRepository.save(newTakeKuisioner);

    return savedTakeKuisioner.id;
  }

  async findAll(userId: string): Promise<TakeKuisioner[]> {
    const takeKuisionerList = await this.takeKuisionerRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' }, // Order by createdAt in descending order
    });

    if (!takeKuisionerList || takeKuisionerList.length === 0) {
      throw new NotFoundException('No Kuisioner History Found');
    }

    return takeKuisionerList;
  }

  async findLatest(userId: string): Promise<TakeKuisioner> {
    const latestTakeKuisioner = await this.takeKuisionerRepository.findOne({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' }, // Order by createdAt in descending order
    });

    if (!latestTakeKuisioner) {
      throw new NotFoundException('No Kuisioner Found');
    }

    return latestTakeKuisioner;
  }

  async findOne(userId: string, kuisionerId: string): Promise<TakeKuisioner> {
    const takeKuisioner = await this.takeKuisionerRepository.findOne({
      where: { id: kuisionerId },
      relations: ['user', 'userAnswerSubKuisioner'],
    });

    if (!takeKuisioner) {
      throw new NotFoundException('Kuisioner History Not Found');
    }

    if (takeKuisioner.user.id !== userId) {
      throw new ForbiddenException('Access Denied: This is Not Your Kuisioner');
    }

    return takeKuisioner;
  }

  async createResult(kuisionerId: string, userId: string) {
    const takeKuisionerFinal = await this.takeKuisionerRepository.findOne({
      where: { id: kuisionerId, isFinish: false },
      relations: [
        'user',
        'userAnswerSubKuisioner',
        'userAnswerSubKuisioner.subKuisioner',
      ],
    });

    if (!takeKuisionerFinal) {
      throw new BadRequestException('Kuisioner Is Done Generate Report');
    }

    if (takeKuisionerFinal.user.id !== userId) {
      throw new ForbiddenException('Access Denied: This is Not Your Kuisioner');
    }

    // Initialize an object to hold the result will be passing to gpt
    let dataHasil = {};

    // Loop through each user answer in the sub-kuisioner
    takeKuisionerFinal.userAnswerSubKuisioner.forEach(
      (subKuisioner: UserAnswerSubKuisioner) => {
        // Extract relevant information, such as the symptom name
        const symptomName = subKuisioner.subKuisioner.symtompId.name;

        // Example: Collect data, associating it with the symptom name
        dataHasil[subKuisioner.subKuisioner.id] = {
          symptomName: symptomName,
          userSymtompLevel: subKuisioner.level, // Assuming 'answer' holds the user's response
          userSymtompScore: subKuisioner.score,
        };
      },
    );

    //data perhitungan + report GPT and make it finish
  }
}
