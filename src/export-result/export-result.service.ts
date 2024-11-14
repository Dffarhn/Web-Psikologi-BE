import { Injectable } from '@nestjs/common';
import { ExportStrategy } from './strategy/export-strategy.interface';
import { PDFExportStrategy } from './strategy/pdf-export.strategy';
import { ExcelExportStrategy } from './strategy/excel-export.strategy';

@Injectable()
export class ExportResultService {
  
  async exportResult(
    exportType:string,
    data: any,
    reportType:string // Move the optional parameter to the end
  ): Promise<Buffer> {
    let exportStrategy: ExportStrategy;

    // Choose the export strategy based on the type
    if (exportType === 'pdf') {
      exportStrategy = new PDFExportStrategy(reportType);
    } else if (exportType === 'excel') {
      exportStrategy = new ExcelExportStrategy();
    } else {
      throw new Error('Invalid export type');
    }

    return exportStrategy.export(data);
  }

}
