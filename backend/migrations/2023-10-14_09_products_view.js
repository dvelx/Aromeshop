const viewName = 'productsView'
const query = `SELECT
  products.id AS \`id\`,
  category_id,
  categories.title AS \`categoryName\`,
  brand_id,
  brands.title AS \`brandTitle\`,
  products.title AS \`title\`,
  products.slug AS \`slug\`,
  products.description AS \`description\`,
  products.image AS \`image\`,
  products.price AS \`price\`
FROM products
  JOIN categories ON products.category_id = categories.id
  JOIN brands ON products.brand_id = brands.id;`
export async function up (queryInterface, { DataTypes }) {
  await queryInterface.sequelize.query(
    `CREATE OR REPLACE VIEW ${viewName} AS ${query}`
  )
}
export async function down (queryInterface, { DataTypes }) {
  await queryInterface.sequelize(`${query}`)
}
