import { Body, Controller, Get, Post } from '@nestjs/common';
import { FacultysService } from './facultys.service';
import { ResponseApi } from 'src/common/response/responseApi.format';
import { Faculty } from './entities/faculty.entity';
import { CreateFacultyDTO } from './dto/createFaculty.dto';

@Controller({ path: 'faculty', version: '1' })
export class FacultysController {
  constructor(private readonly facultyservice: FacultysService) {}

  @Get()
  async getAllFaculty(): Promise<ResponseApi<Faculty[]>> {
    return await this.facultyservice.getAllFacultyService();
  }

  @Post()
  async createFaculty(
    @Body() createFacultyDTO: CreateFacultyDTO,
  ): Promise<ResponseApi<String>> {
    return await this.facultyservice.createFacultyService(createFacultyDTO);
  }
}
