export async function up(queryInterface, { DataTypes }) {
  await queryInterface.bulkInsert("categories", [
    { id: 1, title: "Для дома" },
    { id: 2, title: "Для авто" },
    { id: 3, title: "Услуги косметологии" },
    { id: 4, title: "Ароматические свечи" },
  ]);
}
export async function down(queryInterface, { DataTypes }) {
  await queryInterface.bulkDelete("categories", { id: [1, 2, 3, 4] });
}
