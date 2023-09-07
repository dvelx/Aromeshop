export default class ServerApi {
  constructor(host) {
    this.host = host;
  }
  async getProducts() {
    const response = await fetch(`${this.host}/api/products`);
    return await response.json();
  }
  async getProductById(id) {
    const response = await fetch(`${this.host}/api/product/${id}`);
    return await response.json();
  }
  async getBrands() {
    const response = await fetch(`${this.host}/api/brands`);
    return await response.json();
  }
  async getCategories() {
    const response = await fetch(`${this.host}/api/categories`);
    return await response.json();
  }
  async addCategory({ title, image }) {
    const response = await fetch(`${this.host}/api/category`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, image }),
    });
    return await response.json();
  }
  async addProduct({ title, image, description, price }) {
    const response = await fetch(`${this.host}/api/product`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, image }),
    });
    return await response.json({ title, image, description, price });
  }

  async getOrderById(id) {
    const response = await fetch(`${this.host}/api/order/${id}`);
    return await response.json();
  }
}
