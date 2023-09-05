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

  /** Получает список категорий с БД
   * @returns
   */
  async getCategories() {
    const sql = `SELECT * FROM ${this.db_name}.categories;`;
    return await this.runQuery(sql);
  }

  /** Получает список производителей с БД
   * @returns
   */
  async getBrands() {
    const sql = `SELECT brands.*,
    COUNT(products.brand_id) AS productsCount
FROM shop_data.brands
LEFT JOIN products ON products.brand_id = brands.id
GROUP BY brands.id`;
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
          const user = (await this.getLastInsertedUser()).pop();
          response = { ...response, id: user.id, accessKey: user.access_key };
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
  async getUserByUID(uid) {
    const sql = `SELECT * FROM ${this.db_name}.users WHERE access_key = '${uid}';`;
    return (await this.runQuery(sql))[0];
  }
  async getProducts(
    hostname,
    { limit, page, sortBy, order, priceFrom, priceTo }
  ) {
    const sortValue = { id: "id", price: "price", name: "title" };
    const orderValue = { asc: "ASC", desc: "DESC" };

    let sorting = sortValue[sortBy] ? sortValue[sortBy] : sortValue.id;
    let ordering = orderValue[order] ? orderValue[order] : orderValue.asc;
    let sql = `SELECT *, CONCAT('${hostname}', image) as image_url FROM ${this.db_name}.products_view`;

    const where = ` WHERE ${priceFrom ? "price > " + priceFrom : ""} ${
      priceFrom && priceTo ? " AND" : ""
    } ${priceTo ? "price < " + priceTo : ""}`;

    if (priceFrom || priceTo) sql += where;
    sql += ` ORDER BY ${
      sortBy === "name" ? " brand_title " + ordering + ", " : ""
    }${sorting} ${ordering} `;

    if (page && limit && page > 0) {
      sql += ` LIMIT ${(page - 1) * limit}, ${limit}`;
    } else if (limit) sql += ` LIMIT ${limit}`;

    const products = await this.runQuery(sql);
    sql = `SELECT FOUND_ROWS() AS count`;
    const [{ count }] = await this.runQuery(sql);
    return { products, pagination: { page: +page, limit: +limit, count } };
  }

  async getProductById(id, hostname) {
    const sql = `SELECT *, CONCAT('${hostname}', image) as image_url
FROM ${this.db_name}.products_view WHERE id = '${id}' OR slug = '${id}'`;
    const [result] = await this.runQuery(sql);
    return result;
  }

  async getLastInsertedUser() {
    const sql = `SELECT * FROM ${this.db_name}.users WHERE id = LAST_INSERT_ID()`;
    return await this.runQuery(sql);
  }

  async getLastInsertedCart() {
    const sql = `SELECT * FROM ${this.db_name}.shoping_carts WHERE id = LAST_INSERT_ID()`;
    return await this.runQuery(sql);
  }

  async getCartByUserId(userId = null) {
    const sql = `SELECT * FROM shoping_carts WHERE user_id = '${userId}';`;
    return await this.runQuery(sql);
  }
  async getCartProducts(cartId, hostname) {
    const sql = `SELECT products_view.*, CONCAT('${hostname}', image) AS image_url, quantity
FROM cart_items JOIN products_view ON product_id = products_view.id WHERE cart_id = '${cartId}';`;
    return await this.runQuery(sql);
  }

  async getCart({ hostname, accessKey }) {
    let user;
    // accessKey не передан - создать нового пользователя
    if (!accessKey) {
      user = await this.addUser();
    }
    // Если передан
    else {
      // получаем пользователя по UID
      user = await this.getUserByUID(accessKey);

      // если пользователь не найден вернём ошибку
      if (!user) return null;
    }

    // получаем корзину по UID пользователя
    const carts = await this.getCartByUserId(user.id);

    if (carts.length === 0) {
      await this.addCart(user.id);
    }
    const [cart] = await this.getCartByUserId(user.id);
    const items = await this.getCartProducts(cart.id, hostname);
    let res = { id: cart.id, user, items };
    if (items.length > 0) {
      res = {
        ...res,
        total: items
          .reduce(
            (acc, item) => acc + parseFloat(item.price * item.quantity),
            0
          )
          .toFixed(2),
      };
    }
    return res;
  }

  async addCart(userId) {
    const sql = `INSERT INTO shoping_carts (user_id) VALUES ('${userId}')`;
    return await this.runQuery(sql);
  }
  async deleteCartById(cartId) {
    const sql = `DELETE FROM shoping_carts WHERE id = '${cartId}'`;
    return await this.runQuery(sql);
  }
  async addProductToCart({ cartId, productId, quantity }) {
    const sql = `INSERT INTO cart_items (cart_id, product_id, quantity) 
    VALUES ('${cartId}', '${productId}', '${quantity}') AS new
    ON DUPLICATE KEY UPDATE cart_items.quantity = cart_items.quantity + new.quantity;`;
    return await this.runQuery(sql);
  }

  async setProductQuantity({ cartId, productId, quantity }) {
    const sql = `UPDATE cart_items SET quantity = '${quantity}'
    WHERE cart_id = '${cartId}' AND product_id = '${productId}'`;
    return await this.runQuery(sql);
  }

  async deleteProductFromCart({ cartId, productId }) {
    const sql = `DELETE FROM cart_items
    WHERE cart_id = '${cartId}' AND product_id = '${productId}'`;
    return await this.runQuery(sql);
  }

  async addOrderItem({ orderId, productId, productTitle, quantity, price }) {
    const sql = `INSERT INTO order_items (order_id, product_id, product_title, quantity, price) 
    VALUES ('${orderId}', '${productId}', '${productTitle}', '${quantity}', '${price}')`;
    return await this.runQuery(sql);
  }
  async makeOrder({ name, address, phone, email, comment }) {
    const sql = `INSERT INTO orders (name, address, phone, email, comment) 
    VALUES ('${name}', '${address}', '${phone}', '${email}', '${comment}')`;
    return await this.runQuery(sql);
  }

  async getOrderById(orderId) {
    const sql = `SELECT * FROM ${this.db_name}.orders WHERE id = '${orderId}'`;
    return await this.runQuery(sql);
  }

  async getLastInsertedOrder() {
    const sql = `SELECT * FROM ${this.db_name}.orders WHERE id = LAST_INSERT_ID()`;
    return await this.runQuery(sql);
  }

  async getOrderItems(orderId) {
    const sql = `SELECT * FROM ${this.db_name}.order_items WHERE order_id = ${orderId}`;
    return await this.runQuery(sql);
  }
}
