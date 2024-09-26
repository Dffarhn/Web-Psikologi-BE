import { Body, Controller, Get, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { FacultysService } from './facultys.service';
import { ResponseApi } from 'src/common/response/responseApi.format';
import { Faculty } from './entities/faculty.entity';
import { CreateFacultyDTO } from './dto/createFaculty.dto';
import { JwtAuthGuard } from 'src/jwt/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/jwt/decorators/role.decorator';
import { ROLES } from 'src/common/group/role.enum';

@Controller({ path: 'faculty', version: '1' })
@UseGuards(JwtAuthGuard) // Apply JWT guard globally for this controller
export class FacultysController {
  constructor(private readonly facultyService: FacultysService) {}

  @Get()
  @UseGuards(RolesGuard) // Apply RolesGuard only for this specific route
  @Roles(ROLES.USER) // Allow access to USER role
  async getAllFaculties(): Promise<ResponseApi<Faculty[]>> {
    const faculties = await this.facultyService.getAllFaculties();
    return new ResponseApi(HttpStatus.OK, 'Successfully retrieved all faculties', faculties);
  }

  @Post()
  @UseGuards(RolesGuard) // Apply RolesGuard only for this specific route
  @Roles(ROLES.ADMIN, ROLES.SUPERADMIN) // Only ADMIN and SUPERADMIN can create a faculty
  async createFaculty(
    @Body() createFacultyDTO: CreateFacultyDTO,
  ): Promise<ResponseApi<string>> {
    const resultMessage = await this.facultyService.createFaculty(createFacultyDTO);
    return new ResponseApi(HttpStatus.CREATED, 'Faculty created successfully', resultMessage);
  }
}
