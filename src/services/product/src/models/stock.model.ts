import { Product } from "./product.model";

export interface Stock {
  product_id: Product["id"];
  count: number;
}
