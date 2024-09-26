// src/jwt/strategies/refresh-token.strategy.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    private configService:ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.refresh_secret'),
    });
  }

  async validate(payload: any) {
    // Matching the structure as per your example
    return {
      id: payload.id,                       // User ID
      user: payload.username || payload.user,  // User's username (or fallback to `user`)
      role: payload.role,
      iat: Math.floor(Date.now() / 1000),   // Issued At
      iss: 'ApiKeepUp',                     // Issuer
      aud: 'KeepUp',                        // Audience
    };
  }
}
