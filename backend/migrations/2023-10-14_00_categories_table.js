export async function up (queryInterface, { DataTypes }) {
  await queryInterface.createTable(
    'categories',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      title: { type: DataTypes.STRING(255), allowNull: false, unique: true },
      slug: { type: DataTypes.STRING(255), allowNull: false, unique: true },
      image: { type: DataTypes.STRING(2048), defaultValue: null }
    },
    {
      charset: 'utf8mb4'
    }
  )
}
export async function down (queryInterface, { DataTypes }) {
  await queryInterface.dropTable('categories')
}
