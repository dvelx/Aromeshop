import { api } from "@/http/api.ts";

class productDataService {
  getAll(): Promise<any> {
    return api.get("products");
  }

  getById(id: number): Promise<any> {
    return api.get(`/product/?id=${id}`);
  }
  
  getUserAccessKey(): Promise<any> {
    return  api.get('/users/accessKey')
  }
  
  getCategories(): Promise<any> {
    return api.get('/categories')
  }
  
  getBrands(): Promise<any> {
    return api.get('/brands')
  }
}

export default new productDataService();
