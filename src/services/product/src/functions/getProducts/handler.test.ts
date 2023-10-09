import { products } from "@mocks/product.mock";
import { getProducts } from "./handler";

test("should return product with passed id", () => {
  expect(getProducts({} as any, null, null)).toBe(products);
});
