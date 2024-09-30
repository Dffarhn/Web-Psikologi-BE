import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  BodyCreateSubKuisionerDto,
  CreateSubKuisionerDto,
} from './dto/create-sub-kuisioner.dto';
import { UpdateSubKuisionerDto } from './dto/update-sub-kuisioner.dto';
import { KuisionerService } from 'src/kuisioner/kuisioner.service';
import { InjectRepository } from '@nestjs/typeorm';
import { SubKuisioner } from './entities/sub-kuisioner.entity';
import { Repository } from 'typeorm';
import { SymtompsService } from 'src/symtomps/symtomps.service';

@Injectable()
export class SubKuisionerService {
  constructor(
    @Inject(KuisionerService)
    private kuisionerService: KuisionerService,

    @Inject(SymtompsService)
    private symtompService: SymtompsService,

    @InjectRepository(SubKuisioner)
    private subKuisionerRepository: Repository<SubKuisioner>,
  ) {}

  async create(
    kuisionerId: string,
    createSubKuisionerDto: BodyCreateSubKuisionerDto,
  ): Promise<SubKuisioner> {
    const kuisioner =
      await this.kuisionerService.getOneKuisionerById(kuisionerId);

    const symtomp = await this.symtompService.findOneById(
      createSubKuisionerDto.symtompId,
    );

    const data: CreateSubKuisionerDto = {
      title: createSubKuisionerDto.title,
      kuisionerId: kuisioner,
      symtompId: symtomp,
    };

    return await this.subKuisionerRepository.save(data);
  }

  async findOne(id: string): Promise<SubKuisioner> {
    return this.subKuisionerRepository.findOne({
      where: { id: id },
      relations: ['symtompId','questions'],
    });
  }

  async update(
    id: string,
    updateSubKuisionerDto: UpdateSubKuisionerDto,
  ): Promise<SubKuisioner> {
    // Find the existing SubKuisioner by ID
    const subKuisioner = await this.subKuisionerRepository.findOne({
      where: { id },
      relations: ['kuisionerId', 'symtompId'],
    });

    if (!subKuisioner) {
      throw new NotFoundException(`SubKuisioner with ID ${id} not found`);
    }

    // Update the fields only if they are provided
    Object.assign(subKuisioner, updateSubKuisionerDto);

    // Save the updated entity
    return await this.subKuisionerRepository.save(subKuisioner);
  }

  remove(id: number) {
    return `This action removes a #${id} subKuisioner`;
  }
}
