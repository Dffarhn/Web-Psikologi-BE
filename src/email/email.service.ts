import { Injectable } from '@nestjs/common';
import * as brevo from '@getbrevo/brevo'

@Injectable()
export class EmailService {
  private apiInstance;
  
  constructor() {
    this.apiInstance = new brevo.TransactionalEmailsApi();
    let apiKey = this.apiInstance.authentications['apiKey'];
    apiKey.apiKey = process.env.BREVO_API_KEY; // Use your API key or from environment variable
  }

  async sendEmail(to: string, subject: string, htmlContent: string) {
    try {
      const sendSmtpEmail = new brevo.SendSmtpEmail();

      sendSmtpEmail.subject = subject;
      sendSmtpEmail.htmlContent = htmlContent;
      sendSmtpEmail.sender = { name: 'YourApp', email: 'your-email@domain.com' }; // Customize sender
      sendSmtpEmail.to = [{ email: to, name: to.split('@')[0] }];
      sendSmtpEmail.replyTo = { email: 'your-reply-email@domain.com', name: 'YourApp' };

      const response = await this.apiInstance.sendTransacEmail(sendSmtpEmail);
      console.log('Email sent successfully: ', JSON.stringify(response));
      return response;
    } catch (error) {
      console.error('Failed to send email: ', error);
      throw new Error('Email sending failed');
    }
  }
}
