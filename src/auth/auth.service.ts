import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { RegisterAuthDTO } from './dto/registerAuth.dto';
import { LoginAuthDTO } from './dto/loginAuth.dto';
import { ResponseApi } from 'src/common/response/responseApi.format';

@Injectable()
export class AuthService {
  register(registerAuthDTO: RegisterAuthDTO): ResponseApi<RegisterInterfaces> {

    const data:RegisterInterfaces = {
      created_at: new Date()
    }


    return new ResponseApi(
      HttpStatus.CREATED,
      'Successfully register user',
      data,
    );
  }

  login(loginAuthDTO: LoginAuthDTO): ResponseApi<LoginInterfaces> {
    const data: LoginInterfaces = {
      access_token: 'user access_token',
      refresh_token: 'user refresh_token',
    };
    return new ResponseApi(HttpStatus.OK, 'Successfully login user', data);
  }
}
