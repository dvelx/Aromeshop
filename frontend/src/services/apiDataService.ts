import { api } from "@/http/api.ts";

class productDataService {
  getAll(
    limit: number,
    page: number,
    sortBy: string,
    order: string,
    priceFrom: number,
    priceTo: number,
  ): Promise<any> {
    return api.get("/products", {
      params: {
        limit: limit,
        page: page,
        sortBy: sortBy,
        order: order,
        priceFrom: priceFrom,
        priceTo: priceTo,
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
    productId: number,
    amount: number,
    accessKey: string | null,
  ): Promise<any> {
    return api.post(
      "/baskets",
      {
        productId: productId,
        quantity: amount,
      },
      {
        params: {
          accessKey,
        },
      },
    );
  }
  changeProductQuantity(
    productId: number,
    quantity: number,
    accessKey: string | null,
  ): Promise<any> {
    return api.put(
      "/baskets",
      {
        productId: productId,
        quantity: quantity,
      },
      {
        params: {
          accessKey,
        },
      },
    );
  }
  deleteProduct(productId: number, accessKey: string | null): Promise<any> {
    return api.delete("/baskets", {
      data: {
        productId: productId,
      },
      params: {
        accessKey,
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
    return api.get("/order/" + orderId);
  }
}

export default new productDataService();
