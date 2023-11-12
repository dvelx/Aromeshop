export async function up (queryInterface, { DataTypes }) {
  await queryInterface.sequelize.query(`
CREATE TRIGGER TG_CATEGORIES_INSERT BEFORE INSERT ON categories 
FOR EACH ROW
BEGIN 
SET NEW.slug = SLUGIFY (NEW.title);
END;`)
}

export async function down (queryInterface) {
  await queryInterface.sequelize.query(
    'DROP FUNCTION IF EXISTS TRIGGER TG_CATEGORIES_INSERT'
  )
}
