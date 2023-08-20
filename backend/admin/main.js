import ServerApi from "./api.js";

const api = new ServerApi("http://localhost:3000");

document.addEventListener("DOMContentLoaded", async () => {
  const products = await api.loadProducts();
  console.log("products: ", products);

  const brands = await api.loadBrands();
  console.log("brands: ", brands);
});
