import { Injectable, NotFoundException } from '@nestjs/common';
import { Kuisioner } from './entity/kuisioner.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateKuisionerDTO } from './dto/createKuisioner.dto';
import { UpdateAnswerDto } from 'src/answers/dto/update-answer.dto';
import { UpdateKuisionerDTO } from './dto/updateKuisioner.dto';

@Injectable()
export class KuisionerService {
  constructor(
    @InjectRepository(Kuisioner)
    private readonly kuisionerRepository: Repository<Kuisioner>, // Injecting the Faculty repository
  ) {}

  async getAllKuisioner(): Promise<Kuisioner[]> {
    return await this.kuisionerRepository.find();
  }

  async getOneKuisionerById(kuisionerId: string): Promise<Kuisioner> {
    return await this.kuisionerRepository.findOne({
      where: { id: kuisionerId },
      relations:['subKuisioners']
    });
  }

  async createKuisioner(
    createAnswerDTO: CreateKuisionerDTO,
  ): Promise<Kuisioner> {
    return await this.kuisionerRepository.save(createAnswerDTO);
  }


  async updateKuisioner(kuisionerId:string,updateKuisionerDTO:UpdateKuisionerDTO){

    const kuisioner = await this.kuisionerRepository.findOne({
        where: { id: kuisionerId },
      });
  
      if (!kuisioner) {
        throw new NotFoundException(`Kuisioner with ID ${kuisionerId} not found`);
      }
  
      // Update the fields only if they are provided
      Object.assign(kuisioner, updateKuisionerDTO);
  
      return await this.kuisionerRepository.save(kuisioner);

  }
}
