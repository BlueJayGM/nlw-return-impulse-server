import { MailAdapter, SendMailData } from "../mail_adapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "7bc5eb44c2a925",
    pass: "fc549d4ee4a89c"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({subject, body}: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: "Mikhael D'Amato <damato578@gmail.com>",
      subject,
      html: body,
    });
  
  }
}