import { products } from "@mocks/product.mock";
import { getProducts } from "./handler";
import { formatJSONResponse } from "@libs/api-gateway";

describe("getProducts", () => {
  it("should return all products available", async () => {
    const allProductsRes = await getProducts({} as any, null, null);

    expect(allProductsRes).toEqual(
      formatJSONResponse({
        products,
        event: {},
      })
    );
  });
});
