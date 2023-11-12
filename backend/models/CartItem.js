import { DataTypes, Model } from 'sequelize'
import database from '../database.js'

class CartItem extends Model {}

const model = CartItem.init(
  {
    cartId: {
      field: 'cart_id',
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'carts',
        key: 'id'
      },
      onDelete: 'cascade'
    },
    productId: {
      field: 'product_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'products',
        key: 'id'
      },
      onDelete: 'cascade'
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    charset: 'utf8mb4',
    sequelize: database.sequelize,
    tableName: 'cart_items'
  }
)

export default model
