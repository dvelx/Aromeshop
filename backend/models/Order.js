import { DataTypes, Model } from 'sequelize'
import database from '../database.js'

class Order extends Model {}

const model = Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    comment: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    datePurchased: {
      field: 'date_purchased',
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    dateFinished: {
      field: 'date_finished',
      type: DataTypes.DATE,
      defaultValue: null
    },
    statusId: {
      field: 'status_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      references: {
        model: 'order_statuses',
        key: 'id'
      },
      onDelete: 'restrict'
    }
  },
  {
    charset: 'utf8mb4',
    sequelize: database.sequelize,
    tableName: 'orders'
  }
)
export default model
