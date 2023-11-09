export async function up(queryInterface, { DataTypes }) {
  await queryInterface.createTable(
    "products",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: { tableName: "categories" },
          key: "id",
        },
      },
      brand_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: { tableName: "brands" },
          key: "id",
        },
        onDelete: "restrict",
      },
      title: { type: DataTypes.STRING(255), allowNull: false, unique: true },
      slug: { type: DataTypes.STRING(290), allowNull: false, unique: true },
      image: { type: DataTypes.STRING(2048), defaultValue: null },
      description: { type: DataTypes.STRING(2048), defaultValue: null },
      price: { type: DataTypes.DECIMAL(10, 2), defaultValue: null },
    },
    {
      charset: "utf8mb4",
      underscored: true,
    }
  );
}
export async function down(queryInterface, { DataTypes }) {
  await queryInterface.dropTable("products");
}
