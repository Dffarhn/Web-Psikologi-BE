import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { ConfigModule } from '@nestjs/config';
import emailConfig from 'src/config/email.config';
import { validationSchema } from 'src/config/validation.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [emailConfig], // Load only the database config
      validationSchema, // Use the Joi schema for validation
      envFilePath: ['.env'], // Use the environment file
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
