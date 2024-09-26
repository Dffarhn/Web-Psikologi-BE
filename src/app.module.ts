import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { LoggingMiddleware } from './common/middleware/loggingRoute.middleware';
import { DatabaseModule } from './database/database.module';
import databaseConfig from './config/database.config';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './config/validation.schema';
import { UserModule } from './user/user.module';
import { RolesModule } from './roles/roles.module';
import { FacultysModule } from './facultys/facultys.module';
import { EmailModule } from './email/email.module';
import { JwtKeepUpModule } from './jwt/jwt.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roles/guards/role.guard';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    UserModule,
    RolesModule,
    FacultysModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
