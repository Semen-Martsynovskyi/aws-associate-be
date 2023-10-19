import { mockProducts } from "./product.mock";

export const mockStocks = mockProducts.map(({ id }, index) => ({
  product_id: id,
  count: index > 1 ? index : 0,
}));
