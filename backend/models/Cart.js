import { DataTypes, Model } from 'sequelize'
import database from '../database.js'

class Cart extends Model {}

const model = Cart.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      field: 'user_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'cascade'
    }
  },
  {
    charset: 'utf8mb4',
    sequelize: database.sequelize,
    tableName: 'carts'
  }
)

export default model
