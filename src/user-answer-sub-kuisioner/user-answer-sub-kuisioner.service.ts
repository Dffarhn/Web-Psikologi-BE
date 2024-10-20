import {
  ForbiddenException,
  forwardRef,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAnswerSubKuisioner } from './entities/user-answer-sub-kuisioner.entity';
import { DataSource, Repository } from 'typeorm';
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

    private readonly dataSource: DataSource,
  ) {}

  async create(
    takeKuisionerId: string,
    subKuisionerData: CreateUserAnswerSubKuisionerDTO,
    userId: string,
  ): Promise<string> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Step 1: Fetch the subKuisioner
      const subKuisioner = await this.subKuisionerService.findOne(
        subKuisionerData.subKuisionerId,
      );

      if (!subKuisioner) {
        throw new NotFoundException('The Sub Kuisioner Is Not Found');
      }

      // Step 2: Fetch the takeKuisioner
      const takeKuisioner = await this.takeKuisionerService.findOne(
        userId,
        takeKuisionerId,
      );
      if (!takeKuisioner) {
        throw new NotFoundException('You Have Not Taken This Kuisioner');
      }

      // Step 3: Check access control
      if (takeKuisioner.user.id != userId) {
        throw new ForbiddenException(
          'You Are Forbidden to Access this Kuisioner',
        );
      }

      // Step 4: Prepare data for saving to the repository
      const data = new UserAnswerSubKuisioner();
      data.subKuisioner = subKuisioner;
      data.takeKuisioner = takeKuisioner;

      // Step 5: Save the UserAnswerSubKuisioner data
      const createTakeSubKuisioner = await queryRunner.manager.save(data);

      // Step 6: Save user answers related to this subKuisioner
      await this.userAnswerKuisionerService.create(
        createTakeSubKuisioner.id, // Use the newly created subKuisioner ID
        subKuisionerData.userAnswers, // Pass the user answers
        queryRunner,
      );

      // Step 7: Commit the transaction
      await queryRunner.commitTransaction();

      // Step 7: Return the created subKuisioner ID
      return createTakeSubKuisioner.id;
    } catch (error) {
      // Roll back the transaction in case of any failure
      await queryRunner.rollbackTransaction();

      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException(error.message);
    } finally {
      // Release the query runner after the transaction
      await queryRunner.release();
    }
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
