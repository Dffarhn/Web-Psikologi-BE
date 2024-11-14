import { Module } from '@nestjs/common';
import { ExportResultController } from './export-result.controller';
import { ExportResultService } from './export-result.service';

@Module({
  providers: [ExportResultService],
  controllers: [ExportResultController],
})
export class ExportResultModule { }
