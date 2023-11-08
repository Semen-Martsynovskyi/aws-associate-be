import { mockAvailableProducts } from "@mocks";
import { getProducts } from "./handler";
import { formatJSONResponse } from "@core/utils";
import { productService } from "@services";

describe("getProducts", () => {
  it("should return all products available", async () => {
    jest
      .spyOn(productService, "getAvailableProducts")
      .mockResolvedValue(mockAvailableProducts);
    const allProductsRes = await getProducts({} as any, null, null);

    expect(allProductsRes).toEqual(
      formatJSONResponse({
        products: mockAvailableProducts,
      })
    );
  });
});
