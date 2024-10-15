import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as PDFDocument from 'pdfkit';

@Injectable()
export class PdfService {
  //generate PDF Result Test Personal
  async generatePdfResultTestPersonal(
    name: string,
    nim: string,
    background: { family: string; financial: string; condition: string },
    results: {
      anxiety: string;
      stress: string;
      depression: string;
      procrastination: string;
      phoneAddiction: string;
    },
  ): Promise<Buffer> {
    const doc = new PDFDocument({ margin: 50 });
    const buffers: Buffer[] = [];

    // Collect the PDF data in memory
    doc.on('data', buffers.push.bind(buffers));

    return new Promise((resolve, reject) => {
      doc.on('end', () => {
        const pdfBuffer = Buffer.concat(buffers);
        resolve(pdfBuffer);
      });

      doc.on('error', reject);

      // Header Section
      this.addHeaderSection(doc, 'Psychological Assessment Report');

      // Personal Information Section
      this.addPersonalInfoSection(doc, name, nim);

      // Background Information Section
      this.addBackgroundSection(doc, background);

      // Test Results Section
      this.addTestResultsSection(doc, results);

      // Footer Section
      this.addFooterSection(
        doc,
        'This assessment is to help you better understand your psychological condition.',
      );

      // Finalize the PDF
      doc.end();
    });
  }

  // Personal Information Section
  private addPersonalInfoSection(doc: any, name: string, nim: string) {
    doc
      .fontSize(16)
      .fillColor('#0073e6')
      .font('Helvetica-Bold')
      .text('Personal Information');
    doc.moveDown();
    doc.fontSize(12).fillColor('black').font('Helvetica').text(`Name: ${name}`);
    doc.text(`NIM : ${nim}`);
    doc.moveDown(2);
  }

  // Background Information Section
  private addBackgroundSection(
    doc: any,
    background: { family: string; financial: string; condition: string },
  ) {
    doc
      .fontSize(16)
      .fillColor('#0073e6')
      .font('Helvetica-Bold')
      .text('Background Information');
    doc.moveDown();
    doc.fontSize(12).fillColor('black').font('Helvetica');

    // Add Family
    doc.text(`Family: ${background.family}`);
    doc.moveDown(0.5);
    doc
      .moveTo(50, doc.y)
      .lineTo(doc.page.width - 50, doc.y)
      .stroke();
    doc.moveDown(1);

    // Add Financial
    doc.text(`Financial: ${background.financial}`);
    doc.moveDown(0.5);
    doc
      .moveTo(50, doc.y)
      .lineTo(doc.page.width - 50, doc.y)
      .stroke();
    doc.moveDown(1);

    // Add Condition
    doc.text(`Condition: ${background.condition}`);
    doc.moveDown(0.5);
    doc
      .moveTo(50, doc.y)
      .lineTo(doc.page.width - 50, doc.y)
      .stroke();
    doc.moveDown(2);
  }

  // Test Results Section
  private addTestResultsSection(
    doc: any,
    results: {
      anxiety: string;
      stress: string;
      depression: string;
      procrastination: string;
      phoneAddiction: string;
    },
  ) {
    doc
      .fontSize(16)
      .fillColor('#0073e6')
      .font('Helvetica-Bold')
      .text('Test Results');
    doc.moveDown();

    this.addResultWithBox(doc, 'Anxiety', results.anxiety);
    doc.moveDown();
    this.addResultWithBox(doc, 'Stress', results.stress);
    doc.moveDown();
    this.addResultWithBox(doc, 'Depression', results.depression);
    doc.moveDown();
    this.addResultWithBox(doc, 'Procrastination', results.procrastination);
    doc.moveDown();
    this.addResultWithBox(doc, 'Phone Addiction', results.phoneAddiction);
    doc.moveDown(2);
  }

  // Helper method to add results with blue boxes
  private addResultWithBox(doc: any, label: string, value: string) {
    doc
      .rect(50, doc.y - 5, doc.page.width - 100, 25)
      .fill('#f2faff')
      .stroke();

    doc
      .fillColor('#0073e6')
      .fontSize(14)
      .font('Helvetica-Bold')
      .text(`${label}: ${value}`, 60, doc.y + 5);
    doc
      .fillColor('black')
      .fontSize(12)
      .font('Helvetica')
      .text(
        `Description: Your ${label.toLowerCase()} level is categorized as ${value}.`,
        60,
        doc.y + 20,
      );
  }

  // Function to generate PDF for Psychologist with charts
  async generatePsychologistReport(
    psychologistName: string,
    clientData: { gender: string; condition: string }[],
  ): Promise<Buffer> {
    const doc = new PDFDocument({ margin: 50 });
    const buffers: Buffer[] = [];

    // Collect the PDF data in memory
    doc.on('data', buffers.push.bind(buffers));

    return new Promise(async (resolve, reject) => {
      doc.on('end', () => {
        const pdfBuffer = Buffer.concat(buffers);
        resolve(pdfBuffer);
      });

      doc.on('error', reject);

      // Header Section
      this.addHeaderSection(doc, psychologistName);

      // Add pie chart for gender distribution
      const genderChartUrl = this.generateGenderPieChart(clientData);
      const genderChartImage = await this.getChartImage(genderChartUrl);
      this.addChartToPdf(doc, genderChartImage, 'Client Gender Distribution');

      // Add bar chart for client conditions
      const conditionChartUrl = this.generateConditionBarChart(clientData);
      const conditionChartImage = await this.getChartImage(conditionChartUrl);
      this.addChartToPdf(
        doc,
        conditionChartImage,
        'Client Condition Distribution',
      );

      // Footer Section
      this.addFooterSection(
        doc,
        'This report provides an overview of the psychologist`s clients and their conditions.',
      );

      // Finalize the PDF
      doc.end();
    });
  }

  // Function to generate pie chart URL for gender distribution
  private generateGenderPieChart(clientData: { gender: string }[]): string {
    const genderCounts = clientData.reduce(
      (counts, client) => {
        counts[client.gender] = (counts[client.gender] || 0) + 1;
        return counts;
      },
      { male: 0, female: 0, other: 0 },
    );

    const chartData = {
      type: 'pie',
      data: {
        labels: ['Male', 'Female', 'Other'],
        datasets: [
          {
            data: [genderCounts.male, genderCounts.female, genderCounts.other],
            backgroundColor: ['#0073e6', '#ff6384', '#36a2eb'],
          },
        ],
      },
    };

    return `https://quickchart.io/chart?c=${encodeURIComponent(
      JSON.stringify(chartData),
    )}`;
  }

  // Function to generate bar chart URL for client conditions
  private generateConditionBarChart(
    clientData: { condition: string }[],
  ): string {
    const conditionCounts = clientData.reduce(
      (counts, client) => {
        counts[client.condition] = (counts[client.condition] || 0) + 1;
        return counts;
      },
      {
        anxiety: 0,
        depression: 0,
        stress: 0,
        procrastination: 0,
        'phone addiction': 0,
      },
    );

    const chartData = {
      type: 'bar',
      data: {
        labels: [
          'Anxiety',
          'Depression',
          'Stress',
          'Procrastination',
          'Phone Addiction',
        ],
        datasets: [
          {
            label: 'Number of Clients',
            data: [
              conditionCounts.anxiety,
              conditionCounts.depression,
              conditionCounts.stress,
              conditionCounts.procrastination,
              conditionCounts['phone addiction'],
            ],
            backgroundColor: '#0073e6',
          },
        ],
      },
    };

    return `https://quickchart.io/chart?c=${encodeURIComponent(
      JSON.stringify(chartData),
    )}`;
  }

  // Helper to get chart image from QuickChart
  private async getChartImage(chartUrl: string): Promise<Buffer> {
    const response = await axios.get(chartUrl, { responseType: 'arraybuffer' });
    return Buffer.from(response.data, 'binary');
  }

  // Helper to add chart to the PDF
  private addChartToPdf(doc: any, chartImage: Buffer, title: string) {
    doc.fontSize(16).fillColor('#0073e6').font('Helvetica-Bold').text(title);
    doc.image(chartImage, {
      fit: [500, 300],
      align: 'center',
      valign: 'center',
    });
    doc.moveDown(2);
  }

  // General method to add header section
  private addHeaderSection(doc: any, title: string, subtitle?: string) {
    doc.rect(0, 0, doc.page.width, 100).fill('#0073e6');
    doc
      .fontSize(24)
      .fillColor('white')
      .font('Helvetica-Bold')
      .text(title, 50, 40, { align: 'center' });

    if (subtitle) {
      doc
        .fontSize(18)
        .fillColor('white')
        .text(subtitle, 50, 70, { align: 'center' });
    }

    doc.moveDown(3); // Add space after the header
  }

  // General method to add footer section
  private addFooterSection(doc: any, footerText: string) {
    doc.rect(0, doc.page.height - 50, doc.page.width, 50).fill('#0073e6');
    doc
      .fillColor('white')
      .fontSize(10)
      .text(footerText, 50, doc.page.height - 40, { align: 'center' });
  }
}
