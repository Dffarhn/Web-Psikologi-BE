import { Module } from '@nestjs/common';
import { FacultysService } from './facultys.service';
import { FacultysController } from './facultys.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Faculty } from './entities/faculty.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Faculty])
  ],
  providers: [FacultysService],
  controllers: [FacultysController]
})
export class FacultysModule {}
