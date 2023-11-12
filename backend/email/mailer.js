import nodemailer from 'nodemailer'
import config from '../config.js'

export default class Mailer {
  // transporter: nodemailer.Transporter;
  constructor () {
    this.transporter = nodemailer.createTransport({
      service: config.mailService,
      host: config.mailHost,
      port: +config.mailPort,
      secure: false,
      auth: {
        user: config.mailUser,
        pass: config.mailPassword
      },
      tls: {
        ciphers: 'SSLv3'
      }
    })
  }

  async sendMail ({ to, subject, text, html }) {
    const result = await this.transporter.sendMail({
      from: `"${config.mailSender}" <${config.mailUser}>`,
      to,
      subject,
      text,
      html
    })

    console.log(result)
    return result
  }
}
