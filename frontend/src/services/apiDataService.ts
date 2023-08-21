import { api } from "@/http/api.ts";

class productDataService {
  getAll(): Promise<any> {
    return api.get("/products");
  }

  getById(id: number): Promise<any> {
    return api.get(`/product/${id}`);
  }

  getUserAccessKey(): Promise<any> {
    return api.get("/users/accessKey");
  }

  getCategories(): Promise<any> {
    return api.get("/categories");
  }

  getBrands(): Promise<any> {
    return api.get("/brands");
  }

  getBasket(accessKey: string | null = null): Promise<any> {
    return accessKey 
    ? api.get("/baskets", {
        params: {
          accessKey: accessKey,
        }
      })
    : api.get('/baskets')  
  }
  addProductToBasket(
    cartId: number,
    productId: number,
    amount: number,
  ): Promise<any> {
    return api.post("/baskets", {
      cartId: cartId,
      productId: productId,
      quantity: amount,
    });
  }
  changeProductQuantity(
    cartId: number,
    productId: number,
    quantity: number,
  ): Promise<any> {
    return api.put("/baskets", {
      cartId: cartId,
      productId: productId,
      quantity: quantity,
    });
  }
  deleteProduct(cartId: number, productId: number): Promise<any> {
    return api.delete("/baskets", {
      data: {
        cartId: cartId,
        productId: productId,
      },
    });
  }
}

export default new productDataService();
