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
  Query,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDTO } from './dto/registerAuth.dto';
import { LoginAuthDTO } from './dto/loginAuth.dto';
import { ResponseApi } from 'src/common/response/responseApi.format';
import { ResendConfirmationDTO } from './dto/resendAuth.dto';
import { Response } from 'express';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerAuthDTO: RegisterAuthDTO): ResponseApi<RegisterInterfaces> {
    return this.authService.register(registerAuthDTO);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginAuthDTO: LoginAuthDTO): ResponseApi<LoginInterfaces> {
    return this.authService.login(loginAuthDTO);
  }

  @Post('resendConfirmation')
  resendConfirmation(@Body() resendConfirmationDTO: ResendConfirmationDTO ): ResponseApi<String> {
    return this.authService.resendConfirmation(resendConfirmationDTO)
  }

  @Get('confirmationEmail')
  async confirmationEmail(
    @Res() response: Response,
    @Query('authId') authId: string,
    @Query('token') token: string
  ) {
    try {
      const result = await this.authService.confirmEmail(authId, token);
      if (result.statusCode === HttpStatus.OK) {
        return response.redirect("https://halo");
      } else {
        // Handle kasus ketika konfirmasi gagal
        return response.status(result.statusCode).json(result);
      }
    } catch (error) {
      // Handle error
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Terjadi kesalahan saat memproses konfirmasi email'
      });
    }
  }
}
