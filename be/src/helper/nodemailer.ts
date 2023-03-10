/* eslint-disable @typescript-eslint/no-var-requires */
import { Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as nodemailer from 'nodemailer';
import * as path from 'path';

const mailHost = 'smtp.gmail.com';
const mailPort = 587;

const logger = new Logger('Nodemailer');

// interface IMailParams {
//   to: string;
// }

export default function sendMailNodemailer(to: string) {
  const password = process.env.NODEMAILER_PASSWORD;
  const email = process.env.NODEMAILER_EMAIL;
  // const fromName = process.env.NODEMAILER_FROM_NAME;

  const transporter = nodemailer.createTransport({
    host: mailHost,
    port: mailPort,
    secure: false,
    auth: {
      user: email,
      pass: password,
    },
  });  

  const filePath = path.join(process.cwd(), './src/helper/email/email_content.html');
  const emailContent = fs.readFileSync(filePath, 'utf-8');
  const subject = 'Your GIC Account Has Been Created!';

  const options = {
    from: email,
    to: to,
    subject: subject,
    html: emailContent,
  };

  return transporter
    .sendMail(options)
    .then((data) => {
      console.log(data);
      logger.log(`Send Mail to ${to} success!`);
    })
    .catch((error) => {
      logger.error(error?.response?.body || error);
    });
}
