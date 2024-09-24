import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { ResponseApi } from 'src/common/response/responseApi.format';
import { Faculty } from './entities/faculty.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFacultyDTO } from './dto/createFaculty.dto';

@Injectable()
export class FacultysService {
  constructor(
    @InjectRepository(Faculty)
    private facultyRepository: Repository<Faculty>, // Injecting the Faculty repository
  ) {}

  async getAllFacultyService(): Promise<ResponseApi<Faculty[]>> {
    const data = await this.facultyRepository.find();
    return new ResponseApi(HttpStatus.OK, 'Successfully Get All Faculty', data);
  }

  async getFaculty(idFaculty: string): Promise<ResponseApi<Faculty>> {
    const data = await this.facultyRepository.findOne({ where: { id: idFaculty } });

    if (!data) {
      throw new NotFoundException(`Faculty with ID ${idFaculty} not found`);
    }

    return new ResponseApi(HttpStatus.OK, 'Successfully retrieved Faculty', data);
  }

  async createFacultyService(
    createFacultyDTO: CreateFacultyDTO,
  ): Promise<ResponseApi<String>> {
    const newFaculty = this.facultyRepository.create(createFacultyDTO); // Prepare entity
    await this.facultyRepository.save(newFaculty); // Save to the database
    return new ResponseApi(HttpStatus.CREATED, 'Faculty created successfully', 'Faculty created');
  }
}
