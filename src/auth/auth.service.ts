import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { RegisterAuthDTO } from './dto/registerAuth.dto';
import { LoginAuthDTO } from './dto/loginAuth.dto';
import { ResponseApi } from 'src/common/response/responseApi.format';

@Injectable()
export class AuthService {
  register(registerAuthDTO: RegisterAuthDTO):ResponseApi<String> {
    return new ResponseApi(HttpStatus.CREATED,"Successfully register user","user register");
  }

  login(loginAuthDTO:LoginAuthDTO):ResponseApi<String> {
    return new ResponseApi(HttpStatus.OK,"Successfully login user","user login");
  }

}
