export async function up(queryInterface, { DataTypes }) {
  await queryInterface.createTable(
    "carts",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "cascade",
      },
    },
    {
      charset: "utf8mb4",
      underscored: true,
    }
  );
}
export async function down(queryInterface, { DataTypes }) {
  await queryInterface.dropTable("carts");
}
