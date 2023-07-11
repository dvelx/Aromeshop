function drawBtnGroup() {
  const group = document.createElement("div");
  group.className = "btn-group";

  const btnEdit = document.createElement("button");
  btnEdit.type = "button";
  btnEdit.classList.add("btn", "btn-outline-dark");
  btnEdit.innerHTML = '<i class="bi bi-pen"></i>';

  const btnDelete = document.createElement("button");
  btnDelete.type = "button";
  btnDelete.classList.add("btn", "btn-outline-dark");
  btnDelete.innerHTML = '<i class="bi bi-trash"></i>';

  group.append(btnEdit, btnDelete);
  return group;
}

function drawProductsTable(products) {
  const table = document.createElement("table");
  table.className = "table";

  // head
  const thead = document.createElement("thead");
  thead.className = "table-light";

  const row = document.createElement("tr");
  const colId = document.createElement("th");
  colId.innerText = "#";

  const title = document.createElement("th");
  title.innerText = "Название товара";

  const slug = document.createElement("th");
  slug.innerText = "URL";

  const descr = document.createElement("th");
  descr.innerText = "Описание товара";

  const img = document.createElement("th");
  img.innerText = "Изображение";

  const price = document.createElement("th");
  price.innerText = "Цена";

  const actions = document.createElement("th");
  actions.innerText = "Действия";

  row.append(colId, title, slug, descr, img, price, actions);
  thead.append(row);
  const tbody = document.createElement("tbody");

  // body
  products.forEach((product) => {
    const row = document.createElement("tr");
    const colId = document.createElement("td");
    colId.innerText = product.id;

    const title = document.createElement("td");
    title.innerText = product.title;

    const slug = document.createElement("td");
    slug.innerText = product.slug;

    const description = document.createElement("td");
    description.innerText = product.description ? product.description : "-";

    const img = document.createElement("td");
    img.innerText = product.image ? product.image : "-";

    const price = document.createElement("td");
    price.innerText = product.price;

    const actions = document.createElement("td");
    actions.append(drawBtnGroup());
    row.append(colId, title, slug, description, img, price, actions);

    tbody.append(row);
  });

  table.append(thead, tbody);
  return table;
}

document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("http://localhost:3000/api/products");
  const products = await response.json();
  console.log(products);
  const container = document.createElement("div");
  container.className = "container";

  const header = document.createElement("h1");
  header.innerText = "Администрирование";

  const title = document.createElement("h2");
  title.innerText = "Товары";
  container.append(header, title, drawProductsTable(products));
  document.body.append(container);
});
