export async function up (queryInterface, { DataTypes }) {
  await queryInterface.createTable(
    'feedbacks',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      subject: { type: DataTypes.STRING(500), defaultValue: null },
      message: { type: DataTypes.STRING(2000), allowNull: false },
      name: { type: DataTypes.STRING(150), allowNull: false },
      phone: { type: DataTypes.STRING(20), allowNull: false },
      email: { type: DataTypes.STRING(150), allowNull: false },
      received_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    },
    {
      charset: 'utf8mb4',
      underscored: true
    }
  )
}
export async function down (queryInterface, { DataTypes }) {
  await queryInterface.dropTable('feedbacks')
}
