import { Inject, Injectable } from '@nestjs/common';
import { UpdateTakeKuisionerDto } from './dto/request/update-take-kuisioner.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TakeKuisioner } from './entities/take-kuisioner.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { KuisionerService } from 'src/kuisioner/kuisioner.service';

@Injectable()
export class TakeKuisionerService {
  constructor(
    @InjectRepository(TakeKuisioner)
    private readonly takeKuisionerRepository: Repository<TakeKuisioner>,

    @Inject(UserService)
    private readonly userService: UserService,

    @Inject(KuisionerService)
    private readonly kuisonerService: KuisionerService,
  ) {}

  async create(kuisionerId: string, userId: string): Promise<string> {
    const user = await this.userService.findById(userId);

    const kuisioner =
      await this.kuisonerService.getOneKuisionerById(kuisionerId);

    const data = {
      isFinish: false,
      user: user,
      kuisioner: kuisioner,
    };

    const takeKuisioner = await this.takeKuisionerRepository.save(data);

    return takeKuisioner.id;
  }

  findAll() {
    return `This action returns all takeKuisioner`;
  }

  async findOne(id: string): Promise<TakeKuisioner> {
    return await this.takeKuisionerRepository.findOne({ where: { id: id },relations:['user'] });
  }

  update(id: number, updateTakeKuisionerDto: UpdateTakeKuisionerDto) {
    return `This action updates a #${id} takeKuisioner`;
  }

  remove(id: number) {
    return `This action removes a #${id} takeKuisioner`;
  }
}
