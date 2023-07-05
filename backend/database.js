import mysql from "mysql2";
import dotenv from "dotenv";

export default class Database {
  constructor() {
    dotenv.config();

    this.db_name = process.env.MYSQL_DATABASE;
    this.db_host = process.env.MYSQL_HOST;
    this.db_user = process.env.MYSQL_USER;
    this.db_password = process.env.MYSQL_PASS;

    // Настройка соединения
    this.db = mysql.createConnection({
      host: this.db_host,
      user: this.db_user,
      password: this.db_password,
      multipleStatements: true, // нужно для выполнения нескольких команд в одном запросе
    });
  }

  connect() {
    // Подключение
    this.db.connect((err) => {
      if (err) throw err;
      console.log("MySQL connected ...");
    });
  }

  dropDatabase() {
    const sql = `DROP DATABASE IF EXISTS \`${this.db_name}\`;`;
    this.db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
    });
  }

  createDatabase() {
    const sql = `CREATE DATABASE IF NOT EXISTS \`${this.db_name}\``;
    this.db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
    });
  }

  createCategoriesTable() {
    const sql = `USE ${this.db_name}; 
    CREATE TABLE IF NOT EXISTS \`categories\` (
        \`id\` INT AUTO_INCREMENT, 
        \`title\` VARCHAR(255) CHARSET utf8, 
        \`slug\` VARCHAR(255), 
        \`image\` VARCHAR(2048), 
        PRIMARY KEY (id));`;
    this.db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
    });
  }

  createProductsTable() {
    const sql = `USE ${this.db_name};
    CREATE TABLE IF NOT EXISTS \`products\`(
        \`id\` int AUTO_INCREMENT PRIMARY KEY,
        \`title\` VARCHAR(255) CHARSET utf8,
        \`slug\` VARCHAR(255),
        \`image\` VARCHAR(2048),
        \`description\` VARCHAR(2048) CHARSET utf8);`;
    this.db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
    });
  }
}
