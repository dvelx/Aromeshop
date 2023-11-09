export async function up(queryInterface, { DataTypes }) {
  await queryInterface.createTable(
    "orders",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      comment: {
        type: DataTypes.STRING(1000),
        allowNull: true,
      },
      date_purchased: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      date_finished: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      status_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        references: {
          model: "order_statuses",
          key: "id",
        },
        onDelete: "restrict",
      },
    },
    {
      charset: "utf8mb4",
    }
  );
}
export async function down(queryInterface, { DataTypes }) {
  await queryInterface.dropTable("orders");
}
