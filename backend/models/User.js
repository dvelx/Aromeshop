import { DataTypes, Model } from 'sequelize'
import database from '../database.js'

class User extends Model {}

const model = User.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    accessKey: {
      field: 'access_key',
      type: DataTypes.STRING(36),
      allowNull: true,
      unique: true
    }
  },
  {
    charset: 'utf8mb4',
    sequelize: database.sequelize,
    tableName: 'users',
    hasTrigger: true
  }
)
export default model
