import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { z } from 'zod';

@Injectable()
export class AikeepUpService {
  private openai: OpenAI;
  private openAiModel: string;
  private maxTokens: number;
  private temperature: number;

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('openai.apiKey'),
    });
    // Load configuration once in the constructor for better efficiency
    this.openAiModel = this.configService.get<string>('openai.model');
    this.maxTokens = this.configService.get<number>('openai.maxTokens');
    this.temperature = this.configService.get<number>('openai.temperature');
  }

  async generateReport(): Promise<string> {
    try {
      const gptPrompt = `Generate reports based on the following information:who are u`;

      // Call OpenAI's API once with the combined prompt
      const response = await this.openai.chat.completions.create({
        model: this.openAiModel, // Reuse preloaded config values
        messages: [{ role: 'user', content: gptPrompt }],
        max_tokens: this.maxTokens,
        temperature: this.temperature,
      });

      if (!response.choices || response.choices.length === 0) {
        throw new Error('No choices returned from OpenAI.');
      }

      const generatedReport = response.choices[0].message.content.trim();

      return generatedReport;

      // Validate the final response format
    } catch (error) {
      console.error('Error generating report from OpenAI:', error);
      throw new Error(
        `Failed to generate report from OpenAI: ${error.message}`,
      );
    }
  }
}
