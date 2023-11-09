import { DataTypes, Model } from "sequelize";
import database from "../database.js";

class Category extends Model {}

const model = Category.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    slug: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    image: { type: DataTypes.STRING(2048), defaultValue: null },
  },
  {
    charset: "utf8mb4",
    sequelize: database.sequelize,
    tableName: "categories",
  }
);
export default model;
