import { Body, Controller, Post } from '@nestjs/common';
import { AikeepUpService } from './aikeep-up.service';
import { z } from 'zod';

// Controller definition with versioning
@Controller({ path: 'ai', version: '1' })
export class AikeepUpController {
  constructor(private readonly aikeepUpService: AikeepUpService) {}

  // Define the POST endpoint to generate report
  @Post()
  async generateReport() {
    try {
      // Call the service to generate the report
      const report = await this.aikeepUpService.generateReport();

      // Return the response
      return report;
    } catch (error) {
      // Handle validation errors or service errors (if any)
      console.error('Error generating report:', error);
      throw new Error('Failed to generate report: ' + error.message); // Customize error message
    }
  }
}
