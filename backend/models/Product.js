import { DataTypes, Model } from "sequelize";
import database from "../database.js";
import config from "../config.js";

class Product extends Model {}

const model = Product.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    category_id: {
      field: "category_id",
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "categories",
        key: "id",
      },
    },
    brand_id: {
      field: "brand_id",
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "brands",
        key: "id",
      },
      onDelete: "restrict",
    },
    title: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    slug: { type: DataTypes.STRING(290), allowNull: false, unique: true },
    image: {
      type: DataTypes.STRING(2048),
      defaultValue: null,
      get() {
        return `http://${config.hostname}:${config.port}/${this.getDataValue(
          "image"
        )}`;
      },
    },
    description: { type: DataTypes.STRING(2048), defaultValue: null },
    price: { type: DataTypes.DECIMAL(10, 2), defaultValue: null },
  },
  {
    charset: "utf8mb4",
    sequelize: database.sequelize,
    tableName: "products",
  }
);

export default model;
