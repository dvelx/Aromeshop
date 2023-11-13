import dotenv from 'dotenv'
import IP from 'ip'
dotenv.config()
const config = {
  port: process.env.APP_PORT | 3000,
  domain: process.env.APP_DOMAIN,
  hostname: process.env.APP_DOMAIN ? process.env.APP_DOMAIN : IP.address(),

  mysqlUser: process.env.MYSQL_USER,
  mysqlPassword: process.env.MYSQL_PASS,
  mysqlHost: process.env.MYSQL_HOST,
  mysqlDatabase: process.env.MYSQL_DATABASE,
  mysqlPort: process.env.MYSQL_PORT,

  mailService: process.env.MAIL_SERVICE,
  mailSender: process.env.MAIL_SENDER,
  mailUser: process.env.MAIL_USER,
  mailPassword: process.env.MAIL_PASSWORD,
  mailHost: process.env.MAIL_HOST,
  mailPort: process.env.MAIL_PORT
}
export default config
