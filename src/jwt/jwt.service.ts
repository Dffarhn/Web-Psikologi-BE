// src/jwt/jwt.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtKeepUpService {
  constructor(
    private nestJwtService: NestJwtService,
    private configService: ConfigService, // Inject ConfigService
  ) {}

  generateAccessToken(payload: any): Promise<string> {
    return this.nestJwtService.signAsync(payload);
  }

  generateRefreshToken(payload: any): Promise<string> {
    return this.nestJwtService.signAsync(payload, {
      secret: this.configService.get<string>('jwt.refresh_secret'), // Use ConfigService for refresh token secret
      expiresIn: this.configService.get<string>('jwt.refresh_expired'), // Set expiration for refresh tokens
    });
  }

  verifyAccessToken(token: string): any {
    return this.nestJwtService.verifyAsync(token);
  }

  verifyRefreshToken(token: string): any {
    return this.nestJwtService.verifyAsync(token, {
      secret: this.configService.get<string>('jwt.refresh_secret'),
    });
  }
}
