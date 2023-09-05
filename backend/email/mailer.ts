import nodemailer from "nodemailer";
import dotenv from "dotenv";

export default class Mailer {
  transporter: nodemailer.Transporter;
  constructor() {
    dotenv.config();

    this.transporter = nodemailer.createTransport({
      service: process.env.MAIL_SERVICE,
      host: process.env.MAIL_HOST,
      port: +process.env.MAIL_PORT,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
      tls: {
        ciphers: "SSLv3",
      },
    });
  }

  async sendMail({ to, subject, text, html }) {
    let result = await this.transporter.sendMail({
      from: `"${process.env.MAIL_SENDER}" <${process.env.MAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log(result);
    return result;
  }
}
