export async function up (queryInterface, { DataTypes }) {
  await queryInterface.createTable(
    'cart_items',
    {
      cart_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'carts',
          key: 'id'
        },
        onDelete: 'cascade'
      },
      product_id: {
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
      charset: 'utf8mb4'
    }
  )
}
export async function down (queryInterface, { DataTypes }) {
  await queryInterface.dropTable('cart_items')
}
