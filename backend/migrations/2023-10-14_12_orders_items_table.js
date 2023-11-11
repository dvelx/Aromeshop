export async function up(queryInterface, { DataTypes }) {
  await queryInterface.createTable(
    "order_items",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "orders",
          key: "id",
        },
        onDelete: "cascade",
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "products",
          key: "id",
        },
        onDelete: "no action",
      },
      product_title: {
        type: DataTypes.STRING(510),
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      }
    },
    {
      charset: "utf8mb4",
      underscored: true,
    }
  );
}
export async function down(queryInterface, { DataTypes }) {
  await queryInterface.dropTable("order_items");
}
