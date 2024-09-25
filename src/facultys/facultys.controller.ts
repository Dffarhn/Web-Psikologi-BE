import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { FacultysService } from './facultys.service';
import { ResponseApi } from 'src/common/response/responseApi.format';
import { Faculty } from './entities/faculty.entity';
import { CreateFacultyDTO } from './dto/createFaculty.dto';

@Controller({ path: 'faculty', version: '1' })
export class FacultysController {
  constructor(private readonly facultyService: FacultysService) {}

  @Get()
  async getAllFaculties(): Promise<ResponseApi<Faculty[]>> {
    const faculties = await this.facultyService.getAllFaculties();
    return new ResponseApi(HttpStatus.OK, 'Successfully retrieved all faculties', faculties);
  }

  @Post()
  async createFaculty(
    @Body() createFacultyDTO: CreateFacultyDTO,
  ): Promise<ResponseApi<string>> {
    const resultMessage = await this.facultyService.createFaculty(createFacultyDTO);
    return new ResponseApi(HttpStatus.CREATED, 'Faculty created successfully', resultMessage);
  }
}
