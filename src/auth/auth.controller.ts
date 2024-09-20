import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDTO } from './dto/registerAuth.dto';
import { LoginAuthDTO } from './dto/loginAuth.dto';
import { ResponseApi } from 'src/common/response/responseApi.format';


@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerAuthDTO: RegisterAuthDTO):ResponseApi<String> {
    return this.authService.register(registerAuthDTO);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginAuthDTO: LoginAuthDTO):ResponseApi<String> {
    return this.authService.login(loginAuthDTO);
  }

}
