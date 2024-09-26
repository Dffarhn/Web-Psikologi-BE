import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtKeepUpService } from '../jwt.service';
import { JsonWebTokenError, TokenExpiredError } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private readonly logger = new Logger(JwtAuthGuard.name); // Create a logger instance with the guard's name

  constructor(private jwtService: JwtKeepUpService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      this.logger.warn('Token not found in request headers'); // Log when the token is missing
      throw new UnauthorizedException('Token Not Found');
    }

    try {
      console.log(token)
      const payload = await this.jwtService.verifyAccessToken(token);
      request.user = payload; // Attach the payload to the request
      this.logger.log(`Token validated successfully for user`); // Log successful validation
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        this.logger.warn('Token has expired'); // Log when the token is expired
        throw new UnauthorizedException('Token Expired');
      } else if (error instanceof JsonWebTokenError) {
        this.logger.error('Invalid token detected'); // Log invalid token errors
        throw new ForbiddenException('Invalid token');
      } else {
        this.logger.error('Unexpected error during token validation'); // Log unexpected errors
        throw new UnauthorizedException('Access Denied');
      }
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    if (type === 'Bearer') {
      this.logger.debug('Extracted Bearer token from header'); // Log successful extraction
      return token;
    } else {
      this.logger.warn('Authorization header format is incorrect'); // Log incorrect format
      return undefined;
    }
  }
}
