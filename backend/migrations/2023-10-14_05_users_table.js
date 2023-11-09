export async function up(queryInterface, { DataTypes }) {
  await queryInterface.createTable(
    "users",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      access_key: {
        type: DataTypes.STRING(36),
        allowNull: false,
        unique: true,
      },
    },
    {
      charset: "utf8mb4",
      underscored: true,
    }
  );
}
export async function down(queryInterface, { DataTypes }) {
  await queryInterface.dropTable("users");
}
