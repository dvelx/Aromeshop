import { api } from "@/http/api.ts";

class productDataService {
  getAll(limit: number, page: number): Promise<any> {
    return api.get("/products", {
      params: {
        limit: limit,
        page: page,
      },
    });
  }

  getById(slug: string): Promise<any> {
    return api.get(`/product/${slug}`);
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
          },
        })
      : api.get("/baskets");
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

  makeOrder(
    name: string,
    address: string,
    phone: string,
    email: string,
    comment: string,
    accessKey: string | null = null,
  ): Promise<any> {
    return api.post(
      "/orders",
      {
        name: name,
        address: address,
        phone: phone,
        email: email,
        comment: comment,
      },
      {
        params: {
          accessKey: accessKey,
        },
      },
    );
  }
  getOrderById(orderId: number): Promise<any> {
    return api.get("/order/" + orderId)
      
  }
}

export default new productDataService();
