import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/jwt/guards/jwt-auth.guard';
import { RolesGuard } from 'src/roles/guards/role.guard';
import { IsVerificationRequired } from 'src/jwt/decorator/jwtRoute.decorator';
import { Roles } from 'src/roles/decorators/role.decorator';
import { ROLES } from 'src/roles/group/role.enum';
import { ResponseApi } from 'src/common/response/responseApi.format';
import { User } from './entities/user.entity';
import { UserId } from './decorator/userId.decorator';

@Controller({ path: 'user', version: '1' })
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  @Get()
  @IsVerificationRequired(true)
  @Roles(ROLES.USER, ROLES.ADMIN, ROLES.SUPERADMIN)
  async findOne(@UserId() userId: string): Promise<ResponseApi<User>> {
    const userData = await this.userService.findOne(userId);

    return new ResponseApi(HttpStatus.OK, 'Get User Successfully', userData);
  }

  @Patch()
  @IsVerificationRequired(true)
  @Roles(ROLES.USER, ROLES.ADMIN, ROLES.SUPERADMIN)
  async update(
    @UserId() id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ResponseApi<User>> {
    const data = await this.userService.update(id, updateUserDto);

    return new ResponseApi(HttpStatus.OK, 'Update User Successfully', data);
  }

  @Delete()
  @IsVerificationRequired(true)
  @Roles(ROLES.USER, ROLES.ADMIN, ROLES.SUPERADMIN)
  async remove(@UserId() userId: string): Promise<ResponseApi<string>> {
    const data = await this.userService.remove(userId);

    return new ResponseApi(
      HttpStatus.OK,
      'Successfully Delete User',
      'success',
    );
  }
}
