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
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDTO } from './dto/registerAuth.dto';
import { LoginAuthDTO } from './dto/loginAuth.dto';
import { ResponseApi } from 'src/common/response/responseApi.format';
import { ResendConfirmationDTO } from './dto/resendAuth.dto';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/jwt/guards/jwt-auth.guard';
import { IsVerificationRequired } from 'src/jwt/decorator/jwtRoute.decorator';
import { UserId } from 'src/user/decorator/userId.decorator';

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

  @UseGuards(JwtAuthGuard)
  @IsVerificationRequired(false)
  @Post('resendConfirmation')
  async resendConfirmation(@UserId() userId:string): Promise<ResponseApi<String>> {

    const resendEmailConfirmation = await this.authService.resendConfirmation(userId)
    return new ResponseApi(HttpStatus.OK, 'Login Successfully', 'sac');
  }

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
