export async function up (queryInterface, { DataTypes }) {
  await queryInterface.sequelize.query(`
CREATE TRIGGER TG_USERS_INSERT BEFORE INSERT ON users 
FOR EACH ROW SET new.access_key = REPLACE (uuid (), '-', '');`)
}

export async function down (queryInterface) {
  await queryInterface.sequelize.query(
    'DROP FUNCTION IF EXISTS TRIGGER TG_USERS_INSERT'
  )
}
