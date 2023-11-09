import { DataTypes, Model } from "sequelize";
import database from "../database.js";

class Migration extends Model {}

const model = Migration.init(
  {
    filename: { type: DataTypes.STRING(255), primaryKey: true },
    appliedAt: { type: DataTypes.DATE, allowNull: false },
  },
  {
    sequelize: database.sequelize,
    tableName: "_migrations",
  }
);
export default model;
