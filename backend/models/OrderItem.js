import { DataTypes, Model } from "sequelize";
import database from "../database.js";

class OrderItems extends Model {}

const model = OrderItems.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    orderId: {
      field: "order_id",
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "orders",
        key: "id",
      },
      onDelete: "cascade",
    },
    productId: {
      field: "product_id",
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "products",
        key: "id",
      },
      onDelete: "no action",
    },
    productTitle: {
      field: "product_title",
      type: DataTypes.STRING(510),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    datePurchased: {
      field: "date_purchased",
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    dateFinished: {
      field: "date_finished",
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    statusId: {
      field: "status_id",
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      references: {
        model: "orderStatuses",
        key: "id",
      },
      onDelete: "restrict",
    },
  },
  {
    charset: "utf8mb4",
    sequelize: database.sequelize,
    tableName: "order_items",
  }
);
export default model;
