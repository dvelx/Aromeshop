export default function countTextFormatter(itemsCount: number) {
  const count = itemsCount % 100;
  let s = "";
  if (count >= 10 && count <= 20) {
    s = "товаров";
  } else if (count % 10 === 1) {
    s = "товар";
  } else if (count % 10 > 1 && count % 10 < 5) {
    s = "товара";
  } else {
    s = "товаров";
  }
  return s;
}
