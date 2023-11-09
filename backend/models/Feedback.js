import { DataTypes, Model } from "sequelize";
import database from "../database.js";

class Feedback extends Model {}

const model = Feedback.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    subject: { type: DataTypes.STRING(500), defaultValue: null },
    message: { type: DataTypes.STRING(2000), allowNull: false },
    name: { type: DataTypes.STRING(150), allowNull: false },
    phone: { type: DataTypes.STRING(20), allowNull: false },
    email: { type: DataTypes.STRING(150), allowNull: false },
    receivedDate: {
      field: "received_date",
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    charset: "utf8mb4",
    sequelize: database.sequelize,
    tableName: "feedbacks",
  }
);
export default model;
