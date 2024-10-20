import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { SubKuisionerService } from './sub-kuisioner.service';
import {
  BodyCreateSubKuisionerDto,
  CreateSubKuisionerDto,
} from './dto/create-sub-kuisioner.dto';
import { UpdateSubKuisionerDto } from './dto/update-sub-kuisioner.dto';
import { ResponseApi } from 'src/common/response/responseApi.format';
import { SubKuisioner } from './entities/sub-kuisioner.entity';
import { JwtAuthGuard } from 'src/jwt/guards/jwt-auth.guard';
import { RolesGuard } from 'src/roles/guards/role.guard';
import { IsVerificationRequired } from 'src/jwt/decorator/jwtRoute.decorator';
import { Roles } from 'src/roles/decorators/role.decorator';
import { ROLES } from 'src/roles/group/role.enum';

@Controller({ path: 'subkuisioner', version: '1' })
@UseGuards(JwtAuthGuard, RolesGuard)
export class SubKuisionerController {
  constructor(private readonly subKuisionerService: SubKuisionerService) {}

  @Post(':kuisionerId')
  @IsVerificationRequired(true)
  @Roles(ROLES.SUPERADMIN)
  async create(
    @Param('kuisionerId', new ParseUUIDPipe()) kuisionerId: string,
    @Body() createSubKuisionerDto: BodyCreateSubKuisionerDto,
  ): Promise<ResponseApi<SubKuisioner>> {
    const payload = await this.subKuisionerService.create(
      kuisionerId,
      createSubKuisionerDto,
    );

    return new ResponseApi(
      HttpStatus.CREATED,
      'Successfully Add New SubKuisioner',
      payload,
    );
  }

  @Get(':subKuisionerId')
  @IsVerificationRequired(true)
  @Roles(ROLES.USER, ROLES.ADMIN, ROLES.SUPERADMIN)
  async findOne(
    @Param('subKuisionerId', new ParseUUIDPipe()) subKuisionerId: string,
  ): Promise<ResponseApi<SubKuisioner>> {
    const payload = await this.subKuisionerService.findOne(subKuisionerId);

    return new ResponseApi(
      HttpStatus.OK,
      'Successfully Get Sub Kuisioner',
      payload,
    );
  }

  @Patch(':subKuisionerId')
  @IsVerificationRequired(true)
  @Roles(ROLES.SUPERADMIN)
  update(
    @Param('subKuisionerId', new ParseUUIDPipe()) subKuisionerId: string,
    @Body() updateSubKuisionerDto: UpdateSubKuisionerDto,
  ) {
    return this.subKuisionerService.update(
      subKuisionerId,
      updateSubKuisionerDto,
    );
  }

  @Delete(':subKuisionerId')
  @IsVerificationRequired(true)
  @Roles(ROLES.SUPERADMIN)
  remove(@Param('subKuisionerId', new ParseUUIDPipe()) subKuisionerId: string) {
    return this.subKuisionerService.remove(subKuisionerId);
  }
}
