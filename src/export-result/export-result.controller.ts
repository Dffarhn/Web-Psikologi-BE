import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { ExportResultService } from './export-result.service';

@Controller({ path: 'pdf', version: '1' })
export class ExportResultController {
  constructor(private readonly exportResultService: ExportResultService) { }

  @Get('generate')
  async generatePdfResultTestPersonal(@Res() res: Response): Promise<void> {
    const name = 'Muhammad Daffa Raihan';
    const nim = '22523184';

    const background = {
      family: 'hanya memiliki 1 ayah dan 1 adek',
      financial:
        'memiliki penghasilan atau pendapatan dari keluarga sebesar 2,3 juta perbulan',
      condition:
        'dia mengalami kondisi yang memungkinkan untuk dia menjadi seorang yang bagus',
    };

    const results = {
      anxiety: 'Tinggi',
      stress: 'Rendah',
      depression: 'Sedang',
      procrastination: 'Normal',
      phoneAddiction: 'Normal',
    };

    try {
      // Generate the PDF buffer

      // const pdfBuffer = await this.exportResultService.generatePdfResultTestPersonal(
      //   name,
      //   nim,
      //   background,
      //   results,
      // );
      // Set response headers for the PDF
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=report.pdf');

      // Send the PDF buffer in the response
      // res.end(pdfBuffer);
    } catch (error) {
      // Handle any errors that occurred during PDF generation
      res.status(500).send('Error generating PDF');
    }
  }

  @Get('generate/psikolog')
  async generatePdfPsikolog(@Res() res: Response): Promise<void> {
    const psychologistName = 'Dr. John Doe'; // Example psychologist name
    const clientData = [
      { gender: 'Male', condition: 'Anxiety' },
      { gender: 'Female', condition: 'Depression' },
      { gender: 'Male', condition: 'Stress' },
      { gender: 'Female', condition: 'Procrastination' },
      { gender: 'Male', condition: 'Phone Addiction' },
    ]; // Example client data

    try {
      // // Generate the PDF report buffer using the exportResultService
      // const pdfBuffer = await this.exportResultService.generatePsychologistReport(
      //   psychologistName,
      //   clientData,
      // );

      // Set response headers for PDF file download
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader(
        'Content-Disposition',
        'attachment; filename=psychologist_report.pdf',
      );

      // Send the PDF buffer in the response
      // res.end(pdfBuffer);
    } catch (error) {
      console.error('Error generating PDF:', error);
      // Handle errors (e.g., if the PDF generation fails)
      res.status(500).send('Error generating PDF');
    }
  }
}
