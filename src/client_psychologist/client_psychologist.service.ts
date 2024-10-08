import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateClientPsychologistDto } from './dto/create-client_psychologist.dto';
import { UpdateClientPsychologistDto } from './dto/update-client_psychologist.dto';
import { QueryRunner, Repository } from 'typeorm';
import { ROLES } from 'src/roles/group/role.enum';
import { User } from 'src/user/entities/user.entity';
import { ClientPsychologist } from './entities/client_psychologist.entity';
import { UserService } from 'src/user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { PyschologyService } from 'src/pyschology/pyschology.service';

@Injectable()
export class ClientPsychologistService {
  constructor(
    @InjectRepository(ClientPsychologist)
    private readonly clientPsycholgistRepository: Repository<ClientPsychologist>,

    @Inject(PyschologyService)
    private readonly pyschologyService: PyschologyService,
  ) {}

  async createOnRegisterUser(
    user: User,
    queryRunner: QueryRunner,
  ): Promise<void> {
    try {
      // Find psychologists with the minimum number of clients (filtered by faculty, if needed)
      const psychologist =
        await this.pyschologyService.findPsychologyForUserRegister();

      if (!psychologist) {
        throw new InternalServerErrorException(
          'No available psychologists found',
        );
      }

      // Create the client-psychologist relationship
      const clientPsychologist = new ClientPsychologist();
      clientPsychologist.client = user; // Assuming clientId is in your ClientPsychologist entity
      clientPsychologist.psychologist = psychologist;

      // Save this relationship within the transaction
      await queryRunner.manager.save(ClientPsychologist, clientPsychologist);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  findAll() {
    return `This action returns all clientPsychologist`;
  }

  async findOne(userId: string): Promise<ClientPsychologist> {
    const data = await this.clientPsycholgistRepository.findOne({
      where: { client: { id: userId } },
      relations: ['psychologist'],
    });

    if (!data) {
      throw new NotFoundException('You are not have psyhcolog');
    }
    return data;
  }

  async findOneAsPsychology(userId: string): Promise<ClientPsychologist[]> {
    const data = await this.clientPsycholgistRepository.find({
      where: { psychologist: { id: userId } },
      relations: ['client'],
    });

    if (!data) {
      throw new NotFoundException('You are not have psyhcolog');
    }
    return data;
  }

  update(id: number, updateClientPsychologistDto: UpdateClientPsychologistDto) {
    return `This action updates a #${id} clientPsychologist`;
  }

  remove(id: number) {
    return `This action removes a #${id} clientPsychologist`;
  }
}
