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

  generateAccessToken(payload: any): string {
    return this.nestJwtService.sign(payload);
  }

  generateRefreshToken(payload: any): string {
    return this.nestJwtService.sign(payload, {
      secret: this.configService.get<string>('jwt.refresh_secret'), // Use ConfigService for refresh token secret
      expiresIn: this.configService.get<string>('jwt.refresh_expired'), // Set expiration for refresh tokens
    });
  }

  verifyAccessToken(token: string): any {
    return this.nestJwtService.verify(token);
  }

  verifyRefreshToken(token: string): any {
    return this.nestJwtService.verify(token, {
      secret: this.configService.get<string>('jwt.refresh_secret'), 
    });
  }
}
