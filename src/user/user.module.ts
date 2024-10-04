import { forwardRef, Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FacultysModule } from 'src/facultys/facultys.module';
import { JwtKeepUpModule } from 'src/jwt/jwt.module';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => FacultysModule)],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
