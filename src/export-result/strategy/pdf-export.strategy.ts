import * as PDFDocument from 'pdfkit';
import { ExportStrategy } from './export-strategy.interface';

export class PDFExportStrategy implements ExportStrategy {
  constructor(private reportType: string) {}

  async export(data: any): Promise<Buffer> {
    const doc = new PDFDocument({ margin: 50 });
    const buffers: Buffer[] = [];
    doc.on('data', buffers.push.bind(buffers));

    return new Promise((resolve, reject) => {
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', reject);

      // Add header
      this.addHeader(doc);

      // Add a title and other basic content based on the report type
      doc
        .fontSize(20)
        .text(`Report Type: ${this.reportType.toUpperCase()}`, { align: 'center' })
        .moveDown(2);

      if (this.reportType === 'personal') {
        this.generatePersonalReport(doc, data);
      } else if (this.reportType === 'psychologist') {
        this.generatePsychologistReport(doc, data);
      }

      // Add footer
      this.addFooter(doc);

      doc.end();
    });
  }

  private addHeader(doc: any) {
    doc
      .fontSize(12)
      .text('KeepUp', 50, 20, { align: 'left' })
      .moveDown();
    doc.moveTo(50, 40).lineTo(550, 40).stroke(); // Add a horizontal line
  }

  private addFooter(doc: any) {
    doc
      .fontSize(10)
      .text('KeepUp - Confidential', 50, 750, { align: 'center' });
    doc.moveTo(50, 740).lineTo(550, 740).stroke(); // Add a horizontal line above footer
  }

  private generatePersonalReport(doc: any, data: any) {
    doc
      .fontSize(14)
      .text(`Personal Report for: ${data.name}`)
      .moveDown()
      .text(`Age: ${data.age}`)
      .moveDown()
      .text(`Summary: ${data.summary || 'No summary provided.'}`);
  }

  private generatePsychologistReport(doc: any, data: any) {
    doc
      .fontSize(14)
      .text(`Psychologist Report for: ${data.name}`)
      .moveDown()
      .text(`Session Date: ${data.sessionDate || 'Not specified.'}`)
      .moveDown()
      .text(`Notes: ${data.notes || 'No notes available.'}`);
  }
}
