import { DataTypes, Model } from "sequelize";
import database from "../database.js";

class OrderStatus extends Model {}

const model = OrderStatus.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    charset: "utf8mb4",
    sequelize: database.sequelize,
    tableName: "order_statuses",
  }
);
export default model;
