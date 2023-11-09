import { DataTypes, Model } from "sequelize";
import database from "../database.js";

class Brand extends Model {}

const model = Brand.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false, unique: true },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    image: { type: DataTypes.STRING(2048), defaultValue: null },
  },
  {
    charset: "utf8mb4",
    sequelize: database.sequelize,
    tableName: "brands",
  }
);
export default model;
