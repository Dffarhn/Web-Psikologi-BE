import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseUUIDPipe,
  HttpStatus,
} from '@nestjs/common';
import { TakeKuisionerService } from './take-kuisioner.service';
import { UpdateTakeKuisionerDto } from './dto/request/update-take-kuisioner.dto';
import { JwtAuthGuard } from 'src/jwt/guards/jwt-auth.guard';
import { RolesGuard } from 'src/roles/guards/role.guard';
import { IsVerificationRequired } from 'src/jwt/decorator/jwtRoute.decorator';
import { Roles } from 'src/roles/decorators/role.decorator';
import { ROLES } from 'src/roles/group/role.enum';
import { UserId } from 'src/user/decorator/userId.decorator';
import { ResponseApi } from 'src/common/response/responseApi.format';
import { CreateTakeKuisionerDto } from './dto/request/create-take-kuisioner.dto';
import { CreateTakeKuisionerResponseDTO } from './dto/response/create-kuisioner-response.dto';

@Controller({ path: 'take/kuisioner', version: '1' })
@UseGuards(JwtAuthGuard, RolesGuard)
export class TakeKuisionerController {
  constructor(private readonly takeKuisionerService: TakeKuisionerService) {}

  @Post(':kuisionerId')
  @IsVerificationRequired(true)
  @Roles(ROLES.USER)
  async create(
    @Param('kuisionerId', new ParseUUIDPipe()) kuisionerId: string,
    @UserId() userId: string,
  ): Promise<ResponseApi<CreateTakeKuisionerResponseDTO>> {
    // Pass the kuisionerId and userId along with the DTO to the service
    const createTakeKuisioner = await this.takeKuisionerService.create(
      kuisionerId,
      userId,
    );

    const payload = new CreateTakeKuisionerResponseDTO();
    payload.id_takeKuisioner = createTakeKuisioner;

    return new ResponseApi(
      HttpStatus.CREATED,
      'Successfully Create Take Kuisioner Id',
      payload,
    );
  }
}
