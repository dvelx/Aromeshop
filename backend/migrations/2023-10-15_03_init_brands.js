export async function up(queryInterface, { DataTypes }) {
  await queryInterface.bulkInsert("brands", [
    { id: 1, title: "VINOVE" },
    { id: 2, title: "MR&MRS FRAGRANCE" },
  ]);
}
export async function down(queryInterface, { DataTypes }) {
  await queryInterface.bulkDelete("brands", { id: [1, 2] });
}
