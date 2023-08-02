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

  async getCategories() {
    const sql = `SELECT * FROM ${this.db_name}.categories;`;
    return await this.runQuery(sql);
  }

  async addCategory({ title, slug, image }) {
    try {
      const sql = `INSERT INTO ${this.db_name}.categories (title, slug, image) VALUES(?, ?, ?);`;

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

  async addProduct({ title, slug, image, description, price }) {
    try {
      const sql = `INSERT INTO ${this.db_name}.products (title, slug, image, description, price) VALUES(?, ?, ?, ?, ?);`;

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
        (id) => {
          response.data = {
            id,
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

  async addUser() {
    try {
      const sql = `INSERT INTO ${this.db_name}.users () VALUES();`;

      let response = {};

      await new Promise((resolve, reject) => {
        this.db.query(sql, (err, results) => {
          if (err) {
            reject(`MySQL: ${new Error(err.message).message}`);
          } else resolve(results.insertId);
        });
      }).then(
        async () => {
          const lastUser = await this.getLastInsertedUser();
          response = { ...response, accessKey: lastUser.pop()?.access_key };
        },
        (error) => {
          response = { ...response, error };
        }
      );

      return response;
    } catch (error) {
      console.log(error);
    }
  }
  async getProducts(hostname) {
    const sql = `SELECT *, CONCAT('${hostname}', image) as image_url FROM ${this.db_name}.products_view;`;
    return await this.runQuery(sql);
  }

  async getProductById(id, hostname) {
    const sql = `SELECT JSON_OBJECT(
        'id',
        id,
        'category_id',
        category_id,
        'category_name',
        category_name,
        'brand_id',
        brand_id,
        'brand_title',
        brand_title,
        'title',
        title,
        'price',
        price,
        'description',
        description,
        'image_url',
        CONCAT('${hostname}', image)
    ) as product
FROM
${this.db_name}.products_view
WHERE
    id = '${id}'`; //`SELECT *, CONCAT('${hostname}', image) as image_url FROM ${this.db_name}.products_view WHERE id='${id}';`;
    return await this.runQuery(sql);
  }

  async getLastInsertedUser() {
    const sql = `SELECT * FROM ${this.db_name}.users WHERE id = LAST_INSERT_ID()`;
    return await this.runQuery(sql);
  }
}
