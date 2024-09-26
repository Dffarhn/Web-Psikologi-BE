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
  BadRequestException,
  HttpException,
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
  async register(
    @Body() registerAuthDTO: RegisterAuthDTO,
  ): Promise<ResponseApi<RegisterInterfaces>> {
    const payload = await this.authService.register(registerAuthDTO);

    return new ResponseApi(
      HttpStatus.CREATED,
      'Register Successfully',
      payload,
    );
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginAuthDTO: LoginAuthDTO,
  ): Promise<ResponseApi<LoginInterfaces>> {
    const payload = await this.authService.login(loginAuthDTO);

    return new ResponseApi(HttpStatus.OK, 'Login Successfully', payload);
  }

  // @Post('resendConfirmation')
  // resendConfirmation(@Body() resendConfirmationDTO: ResendConfirmationDTO ): ResponseApi<String> {
  //   return this.authService.resendConfirmation(resendConfirmationDTO)
  // }

  @Get('confirm')
  async confirmationEmail(
    @Res() response: Response,
    @Query('authId') authId: string,
    @Query('token') token: string,
  ) {
    // Call the service to confirm the email
    const result = await this.authService.confirmEmail(authId, token);

    // If confirmation is successful, respond with success message
    return response.redirect('https://google.com');
  }
}
