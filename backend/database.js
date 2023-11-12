import mysql from "mysql2/promise";
import Sequelize from "sequelize";
import config from "./config.js";

class Database {
  constructor(sequelize) {
    this.sequelize = sequelize;
  }

  openConnection() {
    return this.sequelize.authenticate();
  }

  closeConnection() {
    return this.sequelize.close();
  }

  async createDatabase() {
    const connection = await mysql.createConnection({
      user: config.mysqlUser,
      password: config.mysqlPassword,
    });
    connection
      .query(`CREATE DATABASE IF NOT EXISTS ${config.mysqlDatabase};`)
      .then(() => {
        connection.end();
      });
  }
}

export default new Database(
  new Sequelize({
    dialect: "mysql",
    logging: false ? console.log : false,
    host: config.mysqlHost,
    username: config.mysqlUser,
    password: `${config.mysqlPassword}`,
    port: config.mysqlPort,
    database: config.mysqlDatabase,
    timezone: "+00:00",
    define: {
      timestamps: false,
    },
    dialectOptions: {
      multipleStatements: true,
    },
  })
);
