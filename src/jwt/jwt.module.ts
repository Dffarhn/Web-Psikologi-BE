// src/jwt/jwt.module.ts
import { Module } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/access-token.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import jwtConfig from 'src/config/jwt.config'; // Adjust import path as necessary
import { validationSchema } from 'src/config/validation.schema'; // Adjust import path as necessary
import { JwtKeepUpService } from './jwt.service';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ConfigModule.forRoot({
      load: [jwtConfig], // Load the JWT config
      validationSchema, // Use the Joi schema for validation
      envFilePath: ['.env'], // Load environment variables from .env
    }),
    NestJwtModule.registerAsync({
      imports: [ConfigModule], // Import ConfigModule
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.access_secret'), // Use ConfigService for the JWT secret
        signOptions: { expiresIn: configService.get<string>('jwt.access_expired') }, // Set default expiration for access tokens
      }),
      inject: [ConfigService], // Inject ConfigService
    }),
  ],
  providers: [JwtKeepUpService, JwtStrategy, RefreshTokenStrategy],
  exports: [JwtKeepUpService],
})
export class JwtKeepUpModule {}
