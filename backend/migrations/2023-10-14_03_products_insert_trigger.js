export async function up (queryInterface, { DataTypes }) {
  await queryInterface.sequelize.query(`
CREATE TRIGGER TG_PRODUCTS_INSERT BEFORE INSERT ON products 
FOR EACH ROW
BEGIN 
DECLARE product_id INT DEFAULT '0';
SELECT AUTO_INCREMENT INTO product_id
FROM information_schema.tables
WHERE table_name = 'products'
AND table_schema = DATABASE ();
SET NEW.slug = CONCAT (SLUGIFY (NEW.title), '-', product_id);
END;`)
}

export async function down (queryInterface) {
  await queryInterface.sequelize.query(
    'DROP FUNCTION IF EXISTS TRIGGER TG_PRODUCTS_INSERT'
  )
}
