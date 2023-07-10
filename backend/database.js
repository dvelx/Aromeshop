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
      database: this.db_name,
      multipleStatements: true, // нужно для выполнения нескольких команд в одном запросе
    });
  }

  async runQuery(sql) {
    const response = await new Promise((resolve, reject) => {
      this.db.query(sql, (err, results) => {
        if (err) {
          reject(new Error(err.message));
        }
        resolve(results);
      });
    });

    return response;
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
        \`title\` VARCHAR(255) CHARSET utf8 UNIQUE, 
        \`slug\` VARCHAR(255) UNIQUE, 
        \`image\` VARCHAR(2048), 
        PRIMARY KEY (id));`;
    this.db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
    });
  }

  createProductsTable() {
    const sql = `CREATE TABLE IF NOT EXISTS \`products\`(
        \`id\` int AUTO_INCREMENT PRIMARY KEY,
        \`title\` VARCHAR(255) CHARSET utf8 UNIQUE,
        \`slug\` VARCHAR(255) UNIQUE,
        \`image\` VARCHAR(2048),
        \`description\` VARCHAR(2048) CHARSET utf8,
        \`price\` DECIMAL(10,2));`;
    this.db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
    });
  }

  async getCategories() {
    const sql = `SELECT * FROM categories;`;
    return await this.runQuery(sql);
  }

  async addCategory(title, slug, image) {
    try {
      const sql = `INSERT INTO categories (title, slug, image) VALUES(?, ?, ?);`;

      let response = {
        data: null,
        error: null,
      };
      await new Promise((resolve, reject) => {
        this.db.query(sql, [title, slug, image], (err, results) => {
          if (err) {
            reject(`MySQL: ${new Error(err.message).message}`);
          } else resolve(results.insertId);
        });
      }).then(
        (insertId) => {
          response.data = {
            id: insertId,
            title,
            slug,
            image,
          };
        },
        (error) => {
          response.error = error;
        }
      );

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async addProduct(title, slug, image, description, price) {
    try {
      const sql = `INSERT INTO products (title, slug, image, description, price) VALUES(?, ?, ?, ?, ?);`;

      let response = {
        data: null,
        error: null,
      };
      await new Promise((resolve, reject) => {
        this.db.query(
          sql,
          [title, slug, image, description, price],
          (err, results) => {
            if (err) {
              reject(`MySQL: ${new Error(err.message).message}`);
            } else resolve(results.insertId);
          }
        );
      }).then(
        (insertId) => {
          response.data = {
            id: insertId,
            title,
            slug,
            image,
            description,
            price,
          };
        },
        (error) => {
          response.error = error;
        }
      );

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getProducts() {
    const sql = `SELECT * FROM products;`;
    return await this.runQuery(sql);
  }
}
