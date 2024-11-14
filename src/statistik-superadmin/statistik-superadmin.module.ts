import { Module } from '@nestjs/common';
import { StatistikSuperadminService } from './statistik-superadmin.service';
import { StatistikSuperadminController } from './statistik-superadmin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TakeKuisioner } from 'src/take-kuisioner/entities/take-kuisioner.entity';
import { User } from 'src/user/entities/user.entity';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  imports: [TypeOrmModule.forFeature([TakeKuisioner,User]), RolesModule],
  providers: [StatistikSuperadminService],
  controllers: [StatistikSuperadminController],
})
export class StatistikSuperadminModule {}
