import { APIRequestContext , request  } from "@playwright/test";
import { API_URL } from "../config/env";

export class ProductsApi {
    constructor(private request: APIRequestContext) {
       
    }   

    async getProducts() {
        return this.request.get(`${API_URL}/products`);
  }


}