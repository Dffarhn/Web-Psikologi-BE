// src/jwt/strategies/access-token.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService, private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('jwt.access_secret'),
    });
  }

  async validate(payload: any) {
    // Find the user by the id from the payload
    const user = await this.userService.findById(payload.id); // Assuming you have a method to find users
    if (!user) {
      throw new UnauthorizedException(); // or handle as you wish
    }
    return user; // This user will be attached to the request object
  }
}
