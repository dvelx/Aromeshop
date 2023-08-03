import { api } from "@/http/http-common.ts";

class productDataService {
  getAll(): Promise<any> {
    return api.get("products");
  }

  getById(id: number): Promise<any> {
    return api.get(`/product/?id=${id}`);
  }
}

export default new productDataService();
