import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Faculty } from 'src/facultys/entities/faculty.entity';
import { Auth } from './entities/auth.entity';
import { FacultysService } from 'src/facultys/facultys.service';
import { FacultysModule } from 'src/facultys/facultys.module';
import { EmailModule } from 'src/email/email.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Auth]),
    FacultysModule,
    EmailModule,
    UserModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
