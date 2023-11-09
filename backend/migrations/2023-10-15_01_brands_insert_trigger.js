export async function up(queryInterface, { DataTypes }) {
  await queryInterface.sequelize.query(`
CREATE TRIGGER TG_BRANDS_INSERT BEFORE INSERT ON brands 
FOR EACH ROW
BEGIN 
SET NEW.slug = SLUGIFY (NEW.title);
END;`);
}

export async function down(queryInterface) {
  await queryInterface.sequelize.query(
    "DROP FUNCTION IF EXISTS TRIGGER TG_BRANDS_INSERT"
  );
}
