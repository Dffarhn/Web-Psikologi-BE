import * as ExcelJS from 'exceljs';
import { ExportStrategy } from './export-strategy.interface';

export class ExcelExportStrategy implements ExportStrategy {
  async export(data: any): Promise<Buffer> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Results');

    // Populate Excel content
    worksheet.addRow(['Name', data.name]);
    // Add more content...

    const buffer = await workbook.xlsx.writeBuffer();
    return Buffer.from(buffer);
  }
}
