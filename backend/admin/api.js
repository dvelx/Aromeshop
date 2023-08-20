export default class ServerApi {
  constructor(host) {
    this.host = host;
  }
  async loadProducts() {
    const response = await fetch(`${this.host}/api/products`);
    return await response.json();
  }
  async loadBrands() {
    const response = await fetch(`${this.host}/api/brands`);
    return await response.json();
  }
}
