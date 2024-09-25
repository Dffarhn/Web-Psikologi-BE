import { Injectable } from '@nestjs/common';
import * as brevo from '@getbrevo/brevo'
import { ConfigService } from '@nestjs/config';
import { TransactionalEmailsApi } from '@getbrevo/brevo';

@Injectable()
export class EmailService {
  private apiInstance:any;
  
  constructor(private readonly configService: ConfigService) {
    // Initialize the Brevo API instance
    this.apiInstance = new TransactionalEmailsApi();

    // Set API key from environment variables
    const apiKey = this.apiInstance.authentications['apiKey'].apiKey = this.configService.get<string>('email.apiKey');
  }

  async sendEmail(to: string, subject: string, htmlContent: string) {
    try {
      const sendSmtpEmail = new brevo.SendSmtpEmail();

      sendSmtpEmail.subject = subject;
      sendSmtpEmail.htmlContent = htmlContent;
      sendSmtpEmail.sender = { name: 'EmindApp', email: 'd.raihan2004@gmail.com' }; // Customize sender
      sendSmtpEmail.to = [{ email: to, name: to.split('@')[0] }];
      sendSmtpEmail.replyTo = { email: 'd.raihan2004@gmail.com', name: 'EmindApp' };

      const response = await this.apiInstance.sendTransacEmail(sendSmtpEmail);
      console.log('Email sent successfully: ', JSON.stringify(response));
      return response;
    } catch (error) {
      console.error('Failed to send email: ', error);
      throw new Error('Email sending failed');
    }
  }
}
