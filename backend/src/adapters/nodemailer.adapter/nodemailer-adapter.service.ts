import { UsersLoggerService } from '@/logger/logger.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

export interface IDataMessage {
  to: string;
  subject: string;
  text: string;
  html: string;
}

@Injectable()
export class NodemailerAdapterService {
  constructor(
    protected readonly configService: ConfigService,
    private readonly usersLogger: UsersLoggerService,
  ) {}

  async sendMessageByEmail(dataMessage: IDataMessage): Promise<string> {
    try {
      const transporter = nodemailer.createTransport(
        smtpTransport({
          service: 'gmail',
          host: 'smtp.gmail.com',
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: this.configService.get('SENDER_MESSAGE_EMAIL'),
            pass: this.configService.get('SENDER_MESSAGE_PASSWORD'),
          },
        }),
      );

      const { html, subject, text, to } = dataMessage;

      const message = {
        from: this.configService.get('SENDER_MESSAGE_EMAIL'),
        to,
        subject,
        text,
        html,
      };

      const info = await transporter.sendMail(message);

      return info.messageId;
    } catch (error) {
      this.usersLogger.error(error);
      throw new BadRequestException(error);
    }
  }
}
