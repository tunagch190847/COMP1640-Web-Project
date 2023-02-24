/* eslint-disable @typescript-eslint/no-var-requires */
import { Logger } from '@nestjs/common';
const nodeMailer = require('nodemailer');

const mailHost = 'smtp.gmail.com';
const mailPort = 587;

const logger = new Logger('Nodemailer');

// interface IMailParams {
//   to: string;
// }

export default function sendMailNodemailer(to) {
  const password = process.env.NODEMAILER_PASSWORD;
  const email = process.env.NODEMAILER_EMAIL;
  // const fromName = process.env.NODEMAILER_FROM_NAME;

  const transporter = nodeMailer.createTransport({
    host: mailHost,
    port: mailPort,
    secure: false,
    auth: {
      user: email,
      pass: password,
    },
  });

  const options = {
    from: email,
    to: to,
    subject: 'Sending Email using Node.js',
    html: '<h1>Welcome</h1><p>That was easy!</p>',
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
