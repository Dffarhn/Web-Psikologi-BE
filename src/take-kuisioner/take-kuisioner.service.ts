import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TakeKuisioner } from './entities/take-kuisioner.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { KuisionerService } from 'src/kuisioner/kuisioner.service';
import { UserAnswerSubKuisioner } from 'src/user-answer-sub-kuisioner/entities/user-answer-sub-kuisioner.entity';
import { CreateTakeKuisionerResponseDTO } from './dto/response/create-kuisioner-response.dto';
import { SYMTOMP } from 'src/symtomps/group/symtomp.enum';

@Injectable()
export class TakeKuisionerService {
  constructor(
    @InjectRepository(TakeKuisioner)
    private readonly takeKuisionerRepository: Repository<TakeKuisioner>,

    @Inject(UserService)
    private readonly userService: UserService,

    @Inject(KuisionerService)
    private readonly kuisionerService: KuisionerService,
  ) { }

  async create(kuisionerId: string, userId: string): Promise<string> {
    const user = await this.userService.findById(userId);

    if (!user.preKuisioner.isFinish) {
      throw new ForbiddenException("Your Pre Kuisioner Not Answered")
    }

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
      relations: [
        'userAnswerSubKuisioner',
        'userAnswerSubKuisioner.subKuisioner',
        'userAnswerSubKuisioner.subKuisioner.symtompId'
      ],
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
      relations: [
        'user',
        'userAnswerSubKuisioner',
        'userAnswerSubKuisioner.subKuisioner',
      ],
    });

    if (!takeKuisioner) {
      throw new NotFoundException('Kuisioner History Not Found');
    }

    if (takeKuisioner.user.id !== userId) {
      throw new ForbiddenException('Access Denied: This is Not Your Kuisioner');
    }

    return takeKuisioner;
  }
  async createResult(kuisionerId: string, userId: string): Promise<CreateTakeKuisionerResponseDTO> {
    const takeKuisionerFinal = await this.takeKuisionerRepository.findOne({
      where: { id: kuisionerId, isFinish: false },
      relations: [
        'user',
        'userAnswerSubKuisioner',
        'userAnswerSubKuisioner.subKuisioner',
        'userAnswerSubKuisioner.subKuisioner.symtompId'
      ],
    });

    // Check if the kuisioner exists and is unfinished
    if (!takeKuisionerFinal) {
      throw new BadRequestException('Kuisioner Is Done Generate Report');
    }

    // Check if the user has access to this kuisioner
    if (takeKuisionerFinal.user.id !== userId) {
      throw new ForbiddenException('Access Denied: This is Not Your Kuisioner');
    }

    // Initialize an object to hold the result to be passed to GPT
    const dataHasil: Record<string, any> = {};

    // Loop through each user answer in the sub-kuisioner
    takeKuisionerFinal.userAnswerSubKuisioner.forEach(
      (subKuisioner: UserAnswerSubKuisioner) => {
        // Extract relevant information, such as the symptom name
        const symptomName = subKuisioner.subKuisioner.symtompId.name;

        // Collect data, associating it with the symptom name
        dataHasil[subKuisioner.subKuisioner.id] = {
          symptomName: symptomName,
          userSymtompLevel: subKuisioner.level, // User's response level
          userSymtompScore: subKuisioner.score, // User's score
        };
      },
    );

    // List of required symptoms based on the SYMTOMP enum
    const requiredSymptoms = Object.values(SYMTOMP);

    // Check if all required symptoms have been answered
    const answeredSymptoms = Object.values(dataHasil).map(
      (entry) => entry.symptomName
    );

    const missingSymptoms = requiredSymptoms.filter(
      (symptom) => !answeredSymptoms.includes(symptom)
    );

    if (missingSymptoms.length > 0) {
      throw new BadRequestException(`The following symptoms have not been answered: ${missingSymptoms.join(', ')}`);
    }

    // Mark the kuisioner as finished
    takeKuisionerFinal.isFinish = true;

    //made the report to gpt by the dataAkhir

    // Save the updated kuisioner status
    const dataAkhir = await this.takeKuisionerRepository.save(takeKuisionerFinal);

    // Return the response
    return { id_takeKuisioner: dataAkhir.id, createdAt: Date.now() };
  }

}
