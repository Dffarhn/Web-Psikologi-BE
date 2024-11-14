import { Controller, Get, HttpStatus, UseGuards } from '@nestjs/common';
import { StatistikSuperadminService } from './statistik-superadmin.service';
import { IsVerificationRequired } from 'src/jwt/decorator/jwtRoute.decorator';
import { JwtAuthGuard } from 'src/jwt/guards/jwt-auth.guard';
import { RolesGuard } from 'src/roles/guards/role.guard';
import { Roles } from 'src/roles/decorators/role.decorator';
import { ROLES } from 'src/roles/group/role.enum';
import { ResponseApi } from 'src/common/response/responseApi.format';

@Controller({ path: 'statistik/superAdmin', version: '1' })
@UseGuards(JwtAuthGuard, RolesGuard)
export class StatistikSuperadminController {
  constructor(
    private readonly statistikSuperAdminService: StatistikSuperadminService,
  ) {}

  @Get()
  @IsVerificationRequired(true)
  @Roles(ROLES.SUPERADMIN)
  async getAllStatistikCount() {
    const data =
      await this.statistikSuperAdminService.getAllTakeKuisionerStatistik();

    return new ResponseApi(
      HttpStatus.OK,
      'Successfully Get Statistik Count For Symtomp',
      data,
    );
  }
  @Get('symtomp')
  @IsVerificationRequired(true)
  @Roles(ROLES.SUPERADMIN)
  async getAllStatistikCountSymtomp() {
    const data =
      await this.statistikSuperAdminService.getAllTakeKuisionerStatistikSymtomp();

    return new ResponseApi(
      HttpStatus.OK,
      'Successfully Get Statistik Count For Symtomp',
      data,
    );
  }
  @Get('user')
  @IsVerificationRequired(true)
  @Roles(ROLES.SUPERADMIN)
  async getAllStatistikGenderUser() {
    const data =
      await this.statistikSuperAdminService.getAllUserGenderStatistik();

    return new ResponseApi(
      HttpStatus.OK,
      'Successfully Get Statistik Gender User',
      data,
    );
  }

  @Get('user/kuisioner')
  @IsVerificationRequired(true)
  @Roles(ROLES.SUPERADMIN)
  async getAllStatistikUserKuisioner() {
    const data =
      await this.statistikSuperAdminService.getAllUserKuisionerStatistik();

    return new ResponseApi(
      HttpStatus.OK,
      'Successfully Get Statistik Gender User',
      data,
    );
  }
}
