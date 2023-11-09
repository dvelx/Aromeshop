export async function up(queryInterface, { DataTypes }) {
  await queryInterface.bulkInsert("order_statuses", [
    { id: 1, title: 'Оформлен', code: 'pending'},
    { id: 2, title: 'Ожидает оплаты', code: 'awaiting payment'},
    { id: 3, title: 'Принято в работу', code: 'awaiting fulfillment'},
    { id: 4, title: 'Ожидает отправки', code: 'awaiting shipment'},
    { id: 5, title: 'Готов к выдаче', code: 'awaiting pickup'},
    { id: 6, title: 'Частично доставлен', code: 'partially shipped'},
    { id: 7, title: 'Получен', code: 'completed'},
    { id: 8, title: 'Отменён', code: 'cancelled'},
    { id: 9, title: 'Возвращён', code: 'refunded'},
    { id: 10, title: 'Частично возвращён', code: 'partially refunded'},

  ]);
}
export async function down(queryInterface, { DataTypes }) {
  await queryInterface.bulkDelete("order_statuses", { id: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] });
}
